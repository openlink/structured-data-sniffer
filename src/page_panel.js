/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2017 OpenLink Software
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
var baseURL = null;
var prevSelectedTab = null;
var selectedTab = null;

var gData = {
        text: null,
        type: null,
        url: null,
        ext: null
      };

var yasqe = {
        obj : null,
        val : null,
        init: false,
      };

var src_view = null;


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

  $('#tabs a[href=#src]').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });
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
  $('#tabs a[href=#rdf]').click(function(){
      selectTab('#rdf');
      return false;
  });
  $('#tabs a[href=#posh]').click(function(){
      selectTab('#posh');
      return false;
  });

  try {
    src_view = CodeMirror.fromTextArea(document.getElementById('src_place'), {
        lineNumbers: true
      });
    src_view.setSize("100%", "100%");
  } catch(e) { }

  try{
    yasqe.obj = YASQE.fromTextArea(document.getElementById('query_place'), {
        lineNumbers: true,
        lineWrapping: false,
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

  $('#src_exit').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });

  selectTab('#micro');

  if (Browser.isFirefoxSDK)
  {
//--    jQuery('#ext_ver').text('ver: '+ self.options.ver);
    load_data_from_url(null, self.options.url, self.options.type);
  }
  else
  {
//--    jQuery('#ext_ver').text('ver: '+ Browser.api.runtime.getManifest().version);
    load_data_from_url(document.location);
  }


});


// Trap any link clicks and open them in the current tab.
/**
$('a').live('click', function(e) {
  var url = new Uri(document.baseURI).setAnchor("");
  var href = e.currentTarget.href;
  if (href.lastIndexOf(url+"#sc", 0) === 0) {
    return true;
  } else {
    window.open(href);
    return false;
  }
});
**/
$(document).on('click', 'a', function(e) {
  function check_URI(uri) {
    if (doc_URL[doc_URL.length-1]==="#")
      return uri.lastIndexOf(doc_URL,0) === 0;
    else
      return uri.lastIndexOf(doc_URL+'#',0) === 0;
  }


  var hashName = null;
  var href = e.currentTarget.href;
  var hashPos = href.lastIndexOf('#');

  if (hashPos!=-1 && hashPos!=href.length-1)
    hashName = href.substring(hashPos+1);

  var url = new Uri(document.baseURI).setAnchor("");
  if (href.lastIndexOf(url+"#sc", 0) === 0) {
    return true;
  }
  else if (check_URI(href) && hashName) {
    var el = $('a[name = "'+hashName+'"]');
    if (el.length > 0)
      el[0].scrollIntoView();
    return false;
  }
  else if (href === doc_URL) {
    return false;
  }
  else {
    Browser.openTab(href);
    return false;
  }
});


function load_data_from_url(loc, uri, contType)
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

    var url;
    var type;
    var ext;

    if (loc) {
      var params = parseUrlQuery(loc);
      if (!params["url"])
        return;

      url = decodeURIComponent(params.url);
      type = params.type;
      ext = params.ext;
    }
    else {
      url = uri;
      type = contType;
    }

    var hdr_accept = "";

    if (type==="turtle")
      hdr_accept = 'text/n3,text/turtle;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="jsonld")
      hdr_accept = 'application/ld+json;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="rdf")
      hdr_accept = 'application/rdf+xml;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';

    jQuery.ajaxSetup({
       dataType: "text",
       headers:{'Accept': hdr_accept,
                'Cache-control': 'no-cache'},
       timeout: 30000
    });

    jQuery.get(url, function(data, status){
        start_parse_data(data, type, url, ext);
    }, "text").fail(function(msg) {
        alert("Could not load data from: "+url+"\nError: "+msg.statusText);
    });

}



function start_parse_data(data_text, data_type, data_url, ext)
{
  var test_xml = /^\s*<\?xml/gi;
  var test_rdf = /^\s*<rdf:RDF/gi;
    if (data_type === "rdf") {
    if (test_xml.exec(data_text)===null && test_rdf.exec(data_text)===null)
      data_type = "turtle";
  }

  gData.text = data_text;
  gData.type = data_type;
  gData.url = data_url;
  gData.ext = ext;

  doc_URL = data_url;

  var url = new Uri(data_url);
  url.setAnchor("");
  url.setQuery("");
  baseURL = url.toString();

  load_restData(doc_URL);

  if (data_type==="turtle")
    {
      var handler = new Handle_Turtle();
      var ns = new Namespace();
      handler.ns_pref = ns.get_ns_desc();
      handler.ns_pref_size = Object.keys(ns.ns_list).length;
      handler.skip_error = false;
      handler.parse([data_text], baseURL,
        function(error, html_data) {
          show_Data(error, html_data);
      });
    }
  else if (data_type==="jsonld")
    {
      var handler = new Handle_JSONLD();
      handler.skip_error = false;
      handler.parse([data_text], baseURL,
        function(error, html_data) {
          show_Data(error, html_data);
      });
    }
  else if (data_type==="rdf")
    {
      var handler = new Handle_RDF_XML();
      handler.parse([data_text], baseURL,
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

  updateTab('#src', selectedTab);
  updateTab('#cons', selectedTab);
  updateTab('#micro', selectedTab);
  updateTab('#jsonld', selectedTab);
  updateTab('#turtle', selectedTab);
  updateTab('#rdfa', selectedTab);
  updateTab('#rdf', selectedTab);
  updateTab('#posh', selectedTab);
  $('#tabs a[href=#src]').hide();
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
  $('#tabs a[href=#rdf]').hide();
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

      if (html.length > 0)
          $('#turtle_items #docdata_view').append(html);

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

      if (html.length > 0)
          $('#jsonld_items #docdata_view').append(html);

      $('#tabs a[href=#jsonld]').show();
      selectTab('#jsonld');
    }
  else if (gData.type === "rdf")
    {
      $('#rdf_items #docdata_view').remove();
      $('#rdf_items').append("<div id='docdata_view' class='alignleft'/>");
      html = "";
      if (data_error) {
        html += create_err_msg("RDF/XML", data_error);
      } else {
        html += html_data;
      }

      if (html.length > 0)
          $('#rdf_items #docdata_view').append(html);

      $('#tabs a[href=#rdf]').show();
      selectTab('#rdf');
    }

  gData_showed = true;
}







//////////////////////////////////////////////////////////////////////////////

function Import_doc()
{
  if (doc_URL!==null) {
     var _url = new Settings().createImportUrl(doc_URL);
     Browser.api.tabs.create({url:_url});
  }

  return false;
}


function Rww_exec()
{
  function openRww(data)
  {
     var _url = new Settings().createRwwUrl(doc_URL, data);
     Browser.openTab(_url, gData.tab_index);
  }

  if (doc_URL!==null) {
     var edit_url = new Settings().getValue('ext.osds.rww.edit.url');

     if (edit_url.indexOf("{data}")!=-1) {
        save_data("export-rww", "data.txt", "ttl", openRww);
     } else {
        openRww(null);
     }
  }

  return false;
}


function Sparql_exec()
{
  if (doc_URL!==null) {
     var _url = new Settings().createSparqlUrl(doc_URL);
     Browser.api.tabs.create({url:_url});
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
  $('#save-action').change(function() {
    var cmd = $('#save-action option:selected').attr('id');
    if (cmd==='filesave')
      $('#save-file').show();
    else
      $('#save-file').hide();
  });

  var cmd = $('#save-action option:selected').attr('id');
  if (cmd==="filesave")
      $('#save-file').show();
    else
      $('#save-file').hide();


  var isFileSaverSupported = false;
  try {
    isFileSaverSupported = !!new Blob;
  } catch (e) {}

  if (!isFileSaverSupported) {
    $('#save-action').prop('disabled', true);
  }

  if (Browser.isEdgeWebExt)
    $('#save-action').prop('disabled', true);

  var filename = null;
  var fmt = "json";

  if (gData.type == "jsonld" && gData.text) {
    filename = "jsonld_data.txt";
    fmt = "json";
  }
  else if (gData.type == "turtle" && gData.text) {
    filename = "turtle_data.txt";
    fmt = "ttl";
  }
  else if (gData.type == "rdf" && gData.text) {
    filename = "rdf_data.rdf";
    fmt = "rdf";
  }


  if (filename!==null) {
    $('#save-filename').val(filename);

    var cur_fmt = $('#save-fmt option:selected').attr('id');
    $('#'+cur_fmt,'#save-fmt').removeProp('selected');
    $('#'+fmt,'#save-fmt').prop('selected',true);

    if (fmt!=="rdf")
      $('#rdf','#save-fmt').prop('disabled', true);
    else
      $('#rdf','#save-fmt').prop('disabled', false);

    $( "#save-confirm" ).dialog({
      resizable: true,
      height:300,
      modal: true,
      buttons: {
        "OK": function() {
          var action = $('#save-action option:selected').attr('id');
          var fmt = $('#save-fmt option:selected').attr('id');
          var fname = $('#save-filename').val().trim();
          save_data(action, fname, fmt);
          $(this).dialog( "destroy" );
        },
        Cancel: function() {
          $(this).dialog( "destroy" );
        }
      }
    });
  } else {
//    showInfo("No data for saving");
    return false;
  }

  return false;
}


function save_data(action, fname, fmt, callback)
{

  function out_from(data, error, skipped_error)
  {
    var retdata = {txt:"", error:""};
    var outdata = [];
    var errors = [];

    if (data) {
      if ($.isArray(data))
        outdata = outdata.concat(data);
      else
        outdata.push(data);
    }

    if (error)
      errors.push("\n"+error);

    if (skipped_error && skipped_error.length>0) {
      errors.push("\n");
      errors = errors.concat(skipped_error);
    }

    for(var i=0; i < outdata.length; i++)
      retdata.txt += outdata[i]+"\n\n";

    for(var i=0; i < errors.length; i++)
      retdata.error += errors[i]+"\n\n";

    return retdata;
  }

  function exec_action(action, retdata)
  {
    if (action==="export-rww") {
      if (retdata.error.length > 0) {
        showInfo(retdata.error);
      } else {
        if (callback)
          callback(retdata.txt);
      }
    }
    else if (action==="filesave") {
      blob = new Blob([retdata.txt + retdata.error], {type: "text/plain;charset=utf-8"});
      saveAs(blob, fname);
    }
    else {
      selectTab("#src");
      src_view.setValue(retdata.txt + retdata.error+"\n");
    }
  }


  try{
    var data = [];
    var src_fmt = null;

    if (gData.type==="jsonld" && gData.text!==null) {
      src_fmt = "json";
      data = data.concat(gData.text);
    }
    else if (gData.type==="turtle" && gData.text!==null) {
      src_fmt = "ttl";
      data = data.concat(gData.text);
    }
    else if (gData.type==="rdf" && gData.text!==null) {
      src_fmt = "rdf";
      data = data.concat(gData.text);
    }
    else
      return;

    if (src_fmt!==fmt)
    {
      if (src_fmt==="ttl") {
        if (fmt==="json") {
          var handler = new Convert_Turtle();
          handler.to_json(data, null, baseURL,
            function(error, text_data) {
              exec_action(action, out_from(text_data, error, handler.skipped_error));
            });
        } else {
          showInfo("Conversion to RDF/XML isn't supported");
        }
      }
      else if (src_fmt==="json") {
        if (fmt==="ttl") {
          var handler = new Convert_JSONLD();
          handler.to_ttl(data, baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, handler.skipped_error));
            });
        } else {
          showInfo("Conversion to RDF/XML isn't supported");
        }
      }
      else if (src_fmt==="rdf") {
        if (fmt==="ttl") {
          var conv = new Convert_RDF_XML();
          conv.to_ttl(data, baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        } else if (fmt==="json") {
          var conv = new Convert_RDF_XML();
          conv.to_json(data, baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        }
      }
      else {
        showInfo("Format "+src_fmt+" isn't supported else.");
      }
    } else {
      exec_action(action, out_from(data));
    }

  } catch(ex) {
    showInfo(ex);
  }

}


function showInfo(msg)
{
  $("#alert-msg").prop("textContent",msg);
  $("#alert-dlg" ).dialog({
    resizable: true,
    height:180,
    modal: true,
    buttons: {
      Cancel: function() {
        $(this).dialog( "destroy" );
      }
    }
  });
}


function show_rest()
{
  selectTab('#cons');
//--  $('#tabs a[href=#cons]').show();
  if (yasqe.obj && yasqe.val && !yasqe.init) {
    yasqe.obj.setValue(yasqe.val+"\n");
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
       url.addQueryParam("query", val);
  }

  var rows = $('#restData>tr');
  for(var i=0; i < rows.length; i++) {
    var r = $(rows[i]);
    var h = r.find('#h').val();
    var v = r.find('#v').val();
    if (h.length>0)
       url.addQueryParam(h, v);
  }

  var win_url = url.toString();

  Browser.api.tabs.create({url:win_url});
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
          $(this).dialog( "destroy" );
      },
      "No": function() {
          $(this).dialog( "destroy" );
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
    yasqe.obj.setValue(yasqe.val+"\n");
  }
  else {
    yasqe.obj.setValue("\n");
    $(".yasqe").hide();
  }
}
// ==== restData  END ====
