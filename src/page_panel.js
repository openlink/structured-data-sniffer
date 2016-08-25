/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2016 OpenLink Software
 *
 *  This project is free software; you can redistribute it and/or modify it
 *  under the terms of the GNU General Public License as published by the
 *  Free Software Foundation; only version 2 of the License, dated June 1991.
 *
 *  This program is distributed in the hope that it will be useful, but
 *  WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 *  General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License along
 *  with this program; if not, write to the Free Software Foundation, Inc.,
 *  51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
 *
 */

// React when the browser action's icon is clicked.
var items;
var $ = jQuery;
var gData_showed = false;
var doc_URL = null;
var prevSelectedTab = null;
var selectedTab = null;

var gData = {
        text: null, 
        type: null,
        url: null
      };

var yasqe = {
        obj : null,
        val : null,
        init: false,
      };


$(document).ready(function() 
{
  $("#save-confirm").hide();
  $("#alert-dlg").hide();

  $('#import_btn').click(Import_doc);

  $('#rww_btn').click(Rww_exec);

  $('#sparql_btn').click(Sparql_exec);

  $('#rest_btn').click(show_rest);

  $('#download_btn').click(Download_exec);

  if (Browser.isFirefoxSDK) {
    $('#prefs_btn').click(Prefs_exec);
  }

  $('#tabs a[href=#cons]').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });
  $('#tabs a[href=#micro]').click(function(){
      selectTab('#micro');
      return false;
  });
  $('#tabs a[href=#jsonld]').click(function(){
      selectTab('#jsonld');
      return false;
  });
  $('#tabs a[href=#turtle]').click(function(){
      selectTab('#turtle');
      return false;
  });
  $('#tabs a[href=#rdfa]').click(function(){
      selectTab('#rdfa');
      return false;
  });
  $('#tabs a[href=#posh]').click(function(){
      selectTab('#posh');
      return false;
  });


  try{
    yasqe.obj = YASQE.fromTextArea(document.getElementById('query_place'), {
        lineNumbers: true,
	sparql: { showQueryButton: false },
	createShortLink : null,
	createShareLink : null,
	persistent: null,
     
    });
    yasqe.obj.setSize("100%", 150);
  } catch(e) {
  }
  $("#query_place").hide();


  $('#rest_exec').click(rest_exec);
  $('#rest_exit').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });
  $('#rest_add').button({
    icons: { primary: 'ui-icon-plusthick' },
    text: false 
  });
  $('#rest_add').click(addRestEmpty);


  selectTab('#micro');

  if (Browser.isFirefoxSDK) 
  {
    jQuery('#ext_ver').text('ver: '+ self.options.ver);
    self.port.emit("load_data", {url: self.options.url});
  }
  else 
  {
    jQuery('#ext_ver').text('ver: '+ chrome.runtime.getManifest().version);
    load_data_from_url(document.location);
  }


});


if (Browser.isFirefoxSDK) 
{
  self.port.on("url_data", function(msg) {
    start_parse_data(msg, self.options.type, self.options.url);
  });

  self.port.on("url_error", function(msg) {
    start_parse_data(null, self.options.type, self.options.url);
  });
}


$(document).on('click', 'a', function(e) {
  var url = new Uri(document.baseURI).setAnchor("");
  var href = e.currentTarget.href;
  if (href.lastIndexOf(url+"#sc", 0) === 0) {
    return true;
  } else {
    window.open(href);
    return false;
  }
});


function load_data_from_url(loc, uri, ctype)
{
    function parseUrlQuery(loc) 
    {
      var data = {};
      if(loc.search) {
        var pair = (loc.search.substr(1)).split('&');
        for(var i = 0; i < pair.length; i ++) {
            var param = pair[i].split('=');
            data[param[0]] = param[1];
        }
      }
      return data;
    }

    var data_url;
    var type;

    if (loc) {
      var params = parseUrlQuery(loc);
      if (!params["url"])
        return;

      data_url = decodeURIComponent(params.url);
      type = params.type;
    } 
    else {
      data_url = uri;
      type = ctype;
    }

    $.get(data_url, function(data, status){
       start_parse_data(data, type, data_url);
    }, "text").fail(function(msg) {
       start_parse_data(null, type, data_url);
    });;
}



function start_parse_data(data_text, data_type, data_url)
{
  gData.text = data_text;
  gData.type = data_type;
  gData.url = data_url;
  doc_URL = data_url;

  load_restData(doc_URL);
  if (data_text==null)
    {
      show_Data("Could not load data from:"+data_url, null);
    }
  else if (data_type==="turtle") 
    {
      var handler = new Handle_Turtle();
      var ns = new Namespace();
      handler.ns_pref = ns.get_ns_desc();
      handler.ns_pref_size = Object.keys(ns.ns_list).length;
      handler.skip_error = false;
      handler.parse([data_text], data_url, 
        function(error, html_data) {
          show_Data(error, html_data);
      });
    }
  else if (data_type==="jsonld") 
    {
      var handler = new Handle_JSONLD();
      handler.skip_error = false;
      handler.parse([data_text], data_url, 
        function(error, html_data) {
          show_Data(error, html_data);
      });
    }
}


function selectTab(tab)
{
  prevSelectedTab = selectedTab;
  selectedTab = tab;

  function updateTab(tab, selTab) 
  {
    var tab_data = $(tab+'_items');
    var tab_id = $('#tabs a[href='+tab+']');

    if (selTab===tab) {
      tab_data.show()
      tab_id.addClass('selected');
    } else {
      tab_data.hide()
      tab_id.removeClass('selected');
    }
  }

  updateTab('#cons', selectedTab);
  updateTab('#micro', selectedTab);
  updateTab('#jsonld', selectedTab);
  updateTab('#turtle', selectedTab);
  updateTab('#rdfa', selectedTab);
  updateTab('#posh', selectedTab);
  $('#tabs a[href=#cons]').hide();
}



function show_Data(data_error, html_data)
{
  var cons = false;
  var micro = false;
  var jsonld = false;
  var turtle = false;
  var rdfa = false;
  var posh = false;
  var error = [];
  var html = "";

  wait_data = $('table.wait').hide();

  function create_err_msg(fmt_name, errors) 
  {
    var err_html = "";
    if (errors) {

      if ($.isArray(errors)) {
        for(var i=0; i<errors.length; i++)
          err_html += "<tr><td>"+errors[i]+"</tr></td>";
      } 
      else if (errors.length > 0) {
          err_html += "<tr><td>"+errors+"</tr></td>";
      }

      if (err_html.length > 0)
        err_html = "<table class='docdata table'><tr><td>"+fmt_name
                  +" discovered, but fails syntax checking by parser:</td></tr>"
                  +err_html+"</table>";
    } 
    return err_html;
  }

  $('#tabs a[href=#micro]').hide();
  $('#tabs a[href=#jsonld]').hide();
  $('#tabs a[href=#turtle]').hide();
  $('#tabs a[href=#rdfa]').hide();
  $('#tabs a[href=#posh]').hide();


  if (gData.type === "turtle") 
    {
      $('#turtle_items #docdata_view').remove();
      $('#turtle_items').append("<div id='docdata_view' class='alignleft'/>");
      html = "";
      if (data_error) {
        html += create_err_msg("Turtle", data_error);
      } else {
        html += html_data;
      }

      if (html.length > 0) {
          $('#turtle_items #docdata_view').append(html);
          turtle = true;
      }

      $('#tabs a[href=#turtle]').show();
      selectTab('#turtle');
    }
  else if (gData.type === "jsonld") 
    {
      $('#jsonld_items #docdata_view').remove();
      $('#jsonld_items').append("<div id='docdata_view' class='alignleft'/>");
      html = "";
      if (data_error) {
        html += create_err_msg("JSON-LD", data_error);
      } else {
        html += html_data;
      }

      if (html.length > 0) {
          $('#jsonld_items #docdata_view').append(html);
          turtle = true;
      }

      $('#tabs a[href=#jsonld]').show();
      selectTab('#jsonld');
    }

  gData_showed = true;
}







//////////////////////////////////////////////////////////////////////////////

function Import_doc() 
{
  if (doc_URL!==null) {
     var url = createImportUrl(doc_URL);
     window.open(url);
  }

  return false;
}


function Rww_exec() 
{
  if (doc_URL!==null) {
     var url = createRwwUrl(doc_URL);
     window.open(url);
  }

  return false;
}


function Sparql_exec() 
{
  if (doc_URL!==null) {
     var url = createSparqlUrl(doc_URL);
     window.open(url);
  }

  return false;
}


function Prefs_exec() 
{
  //snow preferenses
  if (Browser.isFirefoxSDK) 
     self.port.emit("prefs", "");

  return false;
}


function Download_exec() 
{
  var isFileSaverSupported = false;

  try {
    isFileSaverSupported = !!new Blob;
  } catch (e) {}

  if (!isFileSaverSupported) {
    showInfo("FileSaver isn't supported");
    return false;
  }

  var filename = null;
  var fmt = "json";

  if (gData.type == "jsonld" && gData.text) {
    filename = "jsonld_data.jsonld";
    fmt = "json";
  }
  else if (gData.type == "turtle" && gData.text) {
    filename = "turtle_data.ttl";
    fmt = "ttl";
  }


  if (filename!==null) {
    $('#save-file').val(filename); 
    $('#'+fmt,'#save-fmt').attr('selected','selected');
    $('#save-fmt').prop('disabled', true);

    $( "#save-confirm" ).dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        "OK": function() {
          var fname = $('#save-file').val().trim();
          save_data(fname, fmt);
          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
  } else {
    showInfo("No data for saving");
    return false;
  }

  return false;
}


function save_data(fname, fmt) 
{
  try{
    var blob = null;

    if (fmt === "ttl")
      blob = new Blob([gData.text], {type: "text/turtle;charset=utf-8"});
    else
      blob = new Blob([gData.text], {type: "application/ld+json;charset=utf-8"});

    saveAs(blob, fname);    

  } catch(ex) {
    showInfo(ex);
  }

}


function showInfo(msg)
{
  $('#alert-msg').prop('textContent',msg); 
  $( "#alert-dlg" ).dialog({
    resizable: false,
    height:180,
    modal: true,
    buttons: {
      Cancel: function() {
        $(this).dialog( "close" );
      }
    }
  });
}


function createImportUrl(curUrl) 
{
  var setting = new Settings();
  var handle_url = setting.getValue('ext.osds.import.url');
  var srv = setting.getValue('ext.osds.import.srv');
  var docURL = encodeURIComponent(curUrl);

  switch(srv) {
    case 'about':
    case 'about-ssl':
      var result = curUrl.match(/^((\w+):\/)?\/?(.*)$/);
      if (!result) {
        throw 'Invalid url:\n' + curUrl;
        return null;
      }
//      var protocol = result[2]=="https"?"http":result[2];
      var protocol = result[2];
      docURL = protocol + '/' + result[3];
      break;

    case 'ode':
    case 'ode-ssl':
    case 'describe':
    case 'describe-ssl':
    default:
      break;
  }

  if (handle_url.indexOf("{url}")!=-1)
     return handle_url.replace("{url}",docURL);
  else
     return handle_url + docURL;
}


function createRwwUrl(curUrl) 
{
  var setting = new Settings();
  var edit_url = setting.getValue('ext.osds.rww.edit.url');
  var store_url = setting.getValue('ext.osds.rww.store.url');
  var docURL = encodeURIComponent(curUrl);

  if (store_url!==null && store_url.length>0) {
    if (edit_url.indexOf("?")!=-1)
      edit_url += "&uri="+encodeURIComponent(store_url);
    else
      edit_url += "?uri="+encodeURIComponent(store_url);
  }

  if (edit_url.indexOf("{url}")!=-1)
     return edit_url.replace("{url}",docURL);
  else
     return edit_url;
}


function createSparqlUrl(curUrl) 
{
  var setting = new Settings();
  var sparql_url = setting.getValue('ext.osds.sparql.url');
  var query = setting.getValue('ext.osds.sparql.query');

  var query = encodeURIComponent(query.replace(/{url}/g, curUrl));
  return sparql_url.replace(/{query}/g, query);
}


function show_rest()
{
  selectTab('#cons');
//--  $('#tabs a[href=#cons]').show();
  if (yasqe.obj && yasqe.val && !yasqe.init) {
    yasqe.obj.setValue(yasqe.val);
    yasqe.init = true;
  }
}




// ==== restData ====
function rest_exec() {
  if (!doc_URL) {
    return;
  }

  var url = new Uri(doc_URL);
  url.setQuery("");

  if (yasqe.obj) {
    var val = yasqe.obj.getValue();
    if (val && val.length > 0) 
       url.addQueryParam("query", encodeURIComponent(val));
  }

  var rows = $('#restData>tr');
  for(var i=0; i < rows.length; i++) {
    var r = $(rows[i]);
    var h = r.find('#h').val();
    var v = r.find('#v').val();
    if (h.length>0)
       url.addQueryParam(h, encodeURIComponent(v));
  }

  var win_url = url.toString();

  window.open(win_url);
}


function rest_del(e) {
  //get the row we clicked on
  var row = $(this).parents('tr:first');

  $('#alert-msg').prop('textContent',"Delete row ?"); 
  $( "#alert-dlg" ).dialog({
    resizable: false,
    height:180,
    modal: true,
    buttons: {
      "Yes": function() {
          $(row).remove();
          $(this).dialog( "close" );
      },
      "No": function() {
          $(this).dialog( "close" );
      }
    }
  });
  return true;
}



function createRestRow(h,v)
{
  var del = '<button id="rest_del" class="rest_del">Del</button>';
  return '<tr><td width="12px">'+del+'</td>'
            +'<td><input id="h" style="WIDTH: 100%" value="'+h+'"></td>'
            +'<td><input id="v" style="WIDTH: 100%" value="'+v+'"></td></tr>';
}


function addRestEmpty()
{
  addRestParam("","");
}

function addRestParam(h,v)
{
  $('#restData').append(createRestRow(h, v));
  $('.rest_del').button({
    icons: { primary: 'ui-icon-minusthick' },
    text: false          	
  });
  $('.rest_del').click(rest_del);
}

function delRest()
{
  var data = $('#users_data>tr');
  var data = $('#restData>tr');
  for(var i=0; i < data.length; i++) {
    $(data[i]).remove();
  }
}


function load_restData(doc_url)
{
  yasqe.val = null;

  delRest();

  if (!doc_url) {
    addRestEmpty();
    return;
  }

  var url = new Uri(doc_url);
  var params = url.queryPairs;
  for(var i=0; i<params.length; i++) {
    var val = params[i][1];
    var key = params[i][0];
    if (key === "query")
      yasqe.val = val;
    else
      addRestParam(params[i][0], val);
  }

  if (params.length == 0)
    addRestEmpty();

  if (yasqe.obj && yasqe.val) {
    yasqe.obj.setValue(yasqe.val);    
  } 
  else {
    $(".yasqe").hide();
  }
}
// ==== restData  END ====

