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
var selectedTab = null;
var gData = {
        micro:{ json_text:null }, 
        jsonld:{ json_text:null },
        rdfa:{ text:null },
        turtle:{ ttl_text:null },
        nano :{ ttl_text:null }
      };


$(document).ready(function() 
{
  $("#save-confirm").hide();
  $("#alert-dlg").hide();

  $('#import_btn').click(Import_doc);

  $('#rww_btn').click(Rww_exec);

  $('#sparql_btn').click(Sparql_exec);

  $('#download_btn').click(Download_exec);

  if (Browser.isFirefoxSDK) {
    $('#prefs_btn').click(Prefs_exec);
  }

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

  selectTab('#micro');


  if (Browser.isFirefoxSDK) 
  {
    jQuery('#ext_ver').text('ver: '+ self.options.ver);

    //req data from extension
    self.port.emit("doc_data", "");
  }
  else 
  {
    jQuery('#ext_ver').text('ver: '+ chrome.runtime.getManifest().version);

    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
      if (tabs.length > 0) {
        //?? Request the microdata items in JSON format from the client (foreground) tab.
        chrome.tabs.sendMessage(tabs[0].id, {
            property: 'doc_data'
          }, 
          function(response) {
          });
      }
    });
  }

});


// Trap any link clicks and open them in the current tab.
$('a').live('click', function(e) {
  var href = e.currentTarget.href;
  window.open(href);
  return false;
});


function selectTab(tab)
{
  selectedTab = tab;
  var tab_data = $('#micro_items');
  var tab_id = $('#tabs a[href=#micro]');

  if (tab==='#micro') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#jsonld_items');
  tab_id = $('#tabs a[href=#jsonld]');

  if (tab==='#jsonld') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#turtle_items');
  tab_id = $('#tabs a[href=#turtle]');

  if (tab==='#turtle') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#rdfa_items');
  tab_id = $('#tabs a[href=#rdfa]');

  if (tab==='#rdfa') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

}



function show_Data(dData)
{
  var micro = false;
  var jsonld = false;
  var turtle = false;
  var rdfa = false;
  var nano = false;
  var nano_error = "";

  wait_data = $('table.wait').hide();

  if (dData.nano.expanded && !dData.nano.error) {
    if (dData.turtle.expanded == null)
      dData.turtle.expanded = dData.nano.expanded;
    else
      dData.turtle.expanded += dData.nano.expanded;
  }

  if (dData.nano.error!==null)
    nano_error = "<tr><td>"+dData.nano.error+"</tr></td>"

  if (dData.nano.skipped_error!==undefined && dData.nano.skipped_error.length>0) {
    for(var i=0; i < dData.nano.skipped_error.length; i++) {
      nano_error += "<tr><td>"+dData.nano.skipped_error[i]+"</tr></td>";
    }
  }

  if (nano_error.length > 0) {
    nano_error = "<table class='docdata table'><tr><td>Nanotation discovered, but fails syntax checking by parser:</td></tr>"
                +nano_error+"</table>";
  }


  $('#micro_items #docdata_view').remove();
  $('#micro_items').append("<div id='docdata_view' class='alignleft'/>");
  if (dData.micro.expanded!==null && dData.micro.expanded.length > 0) {
      $('#micro_items #docdata_view').append(dData.micro.expanded);
      micro = true;
  }
  else if (dData.micro.error) {
      $('#micro_items #docdata_view').append("<div id='docdata'><i><p>Microdata discovered, but fails syntax checking by parser.<p><span id='micro_error'/></i></div>");
      $('#micro_items #micro_error').text(dData.micro.error);
      micro = true;
  }
  else
      $('#micro_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  $('#jsonld_items #docdata_view').remove();
  $('#jsonld_items').append("<div id='docdata_view' class='alignleft'/>");
  if (dData.jsonld.expanded!==null && dData.jsonld.expanded.length > 0) {
      $('#jsonld_items #docdata_view').append(dData.jsonld.expanded);
      jsonld = true;
  }
  else if (dData.jsonld.error) {
      $('#jsonld_items #docdata_view').append("<div id='docdata'><i><p>JSON-LD discovered, but fails syntax checking by parser:<p><span id='jsonld_error'/></i></div>");
      $('#jsonld_items #jsonld_error').text(dData.jsonld.error);
      jsonld = true;
  }
  else
      $('#jsonld_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  $('#turtle_items #docdata_view').remove();
  $('#turtle_items').append("<div id='docdata_view' class='alignleft'/>");
  if ((dData.turtle.expanded!==null && dData.turtle.expanded.length > 0) || nano_error.length>0) {
      var html = "";
      if (dData.turtle.expanded!==null)
        html += dData.turtle.expanded;
      html += (nano_error!==null)?nano_error:"";
      $('#turtle_items #docdata_view').append(html);
      turtle = true;
  }
  else if (dData.turtle.error) {
      $('#turtle_items #docdata_view').append("<div id='docdata'><i><p>Turtle discovered, but fails syntax checking by parser:<p><span id='turtle_error'/></i></div>");
      $('#turtle_items #turtle_error').text(dData.turtle.error);
      turtle = true;
  }
  else {
      var html = "<div id='docdata'><i>No data found.</i></div>";
      html += (nano_error!==null)?nano_error:"";
      $('#turtle_items #docdata_view').append(html);
  }


  $('#rdfa_items #docdata_view').remove();
  $('#rdfa_items').append("<div id='docdata_view' class='alignleft'/>");
  if (dData.rdfa.expanded!==null && dData.rdfa.expanded.length > 0) {
      $('#rdfa_items #docdata_view').append(dData.rdfa.expanded);
      rdfa = true;
  }
  else if (dData.rdfa.error) {
      $('#rdfa_items #docdata_view').append("<div id='docdata'><i><p>RDFa discovered, but fails syntax checking by parser:<p><span id='rdfa_error'/></i></div>");
      $('#rdfa_items #rdfa_error').text(dData.rdfa.error);
      rdfa = true;
  }
  else
      $('#rdfa_items #docdata_view').append("<div id='docdata'><i>No data found.</i></div>");


  if (micro && !dData.micro.error)
    selectTab('#micro');
  else if (jsonld && !dData.jsonld.error)
    selectTab('#jsonld');
  else if (turtle && !dData.turtle.error)
    selectTab('#turtle');
  else if (rdfa && !dData.rdfa.error)
    selectTab('#rdfa');



  if (!micro)
    $('#tabs a[href=#micro]').hide();
  if (!jsonld)
    $('#tabs a[href=#jsonld]').hide();
  if (!turtle)
    $('#tabs a[href=#turtle]').hide();
  if (!rdfa)
    $('#tabs a[href=#rdfa]').hide();

  gData_showed = true;
}



function check_Microdata(dData) 
{
  if (dData.micro.data)
  {
    var handler = new Handle_Microdata();
    handler.parse(dData.micro.data, dData.docURL,
      function(error, html_data) 
      {
        if (error)
          dData.micro.error = error.toString();
        else {
          dData.micro.expanded = html_data;
          gData.micro.json_text = [JSON.stringify(dData.micro.data, undefined, 2)];
        }

      check_JSON_LD(dData);
    });
  }
  else
  {
    check_JSON_LD(dData);
  }
}


function check_JSON_LD(dData) 
{
  if (dData.jsonld.text!==null && dData.jsonld.text.length > 0)
  {
    var handler = new Handle_JSONLD();
    handler.parse(dData.jsonld.text, dData.docURL,
      function(error, html_data) {
        if (error)
          dData.jsonld.error = error;
        else {
          dData.jsonld.expanded = html_data;
          gData.jsonld.json_text = dData.jsonld.text;
        }

        check_Turtle(dData);
    });
  }
  else
  {
    check_Turtle(dData);
  }
}




function check_Turtle(dData) 
{
  if (dData.turtle.text!==null && dData.turtle.text.length > 0)
  {
    var handler = new Handle_Turtle();
    handler.parse(dData.turtle.text, dData.docURL, 
      function(error, html_data) {
        if (error)
          dData.turtle.error = error;
        else {
          dData.turtle.expanded = html_data;
          gData.turtle.ttl_text = dData.turtle.text;
        }

        check_RDFa(dData);
    });
  }
  else
  {
    check_RDFa(dData);
  }
}



function check_RDFa(dData) 
{
  if (dData.rdfa.data)
  {
    var handler = new Handle_RDFa();
    handler.parse(dData.rdfa.data, 
      function(error, html_data) {
        if (error)
          dData.rdfa.error = error;
        else {
          dData.rdfa.expanded = html_data;
          gData.rdfa.ttl_text = [dData.rdfa.ttl];
        }

        check_Nano(dData);
    });
  }
  else
  {
    check_Nano(dData);
  }
}


function check_Nano(dData) 
{
  if (dData.nano.text!==null && dData.nano.text.length > 0)
  {
    var handler = new Handle_Turtle();
    var ns = new Namespace();
    handler.ns_pref = ns.get_ns_desc();
    handler.ns_pref_size = Object.keys(ns.ns_list).length;
    handler.parse(dData.nano.text, dData.docURL, 
      function(error, html_data) {
        if (error)
          dData.nano.error = error;
        else {
          dData.nano.expanded = html_data;
          if (handler.skipped_error.length>0)
            dData.nano.skipped_error = handler.skipped_error;
          gData.nano.ttl_text = dData.nano.text;
        }

        show_Data(dData);
    });
  }
  else
  {
    show_Data(dData);
  }
}




if (Browser.isFirefoxSDK) 
{
  //Firefox SDK
  //wait data from extension
  self.port.on("doc_data", function(msg) {

      var dData = $.parseJSON(msg.data);
      dData.micro.expanded = null;
      dData.micro.error = null;
      dData.jsonld.expanded = null;
      dData.jsonld.error = null;
      dData.rdfa.expanded = null;
      dData.turtle.expanded = null;
      dData.turtle.error = null;
      dData.rdfa.expanded = null;
      dData.rdfa.error = null;
      dData.nano.expanded = null;
      dData.nano.error = null;
      doc_URL = dData.docURL;

      check_Microdata(dData);
  });
}
else 
{
  //Chrome API
  //wait data from extension
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
  {
    try {
      if (request.property == "status")
      {
        var show_action = request.data_exists;
        if (show_action)
          chrome.pageAction.show(sender.tab.id);
        else
          chrome.pageAction.hide(sender.tab.id);

      } 
      else if (request.property == "doc_data")
      {
        var dData = $.parseJSON(request.data);
        dData.micro.expanded = null;
        dData.micro.error = null;
        dData.jsonld.expanded = null;
        dData.jsonld.error = null;
        dData.rdfa.expanded = null;
        dData.turtle.expanded = null;
        dData.turtle.error = null;
        dData.rdfa.expanded = null;
        dData.rdfa.error = null;
        dData.nano.expanded = null;
        dData.nano.error = null;
        doc_URL = dData.docURL;

        check_Microdata(dData);

      }
      else
      {
        sendResponse({}); /* stop */
      }
    } catch(e) {
      console.log("OSDS: onMsg="+e);
    }

  });
}




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

  if (selectedTab==="#jsonld" && gData.jsonld.json_text!==null) {
    filename = "jsonld_data.jsonld";
    fmt = "json";
  }
  else if (selectedTab==="#turtle" && (gData.turtle.ttl_text!==null || gData.nano.ttl_text!==null)) {
    filename = "turtle_data.ttl";
    fmt = "ttl";
  }
  else if (selectedTab==="#micro" && gData.micro.json_text!==null) {
    filename = "microdata_data.jsonld";
    fmt = "json";
  }
  else if (selectedTab==="#rdfa" && gData.rdfa.ttl_text!==null) {
    filename = "rdfa_data.ttl";
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

    if (selectedTab==="#jsonld" && gData.jsonld.json_text!==null) {
      fmt = "json";
      blob_data = gData.jsonld.json_text;
    }
    else if (selectedTab==="#turtle" && (gData.turtle.ttl_text!==null || gData.nano.ttl_text!==null)) {
      fmt = "ttl";
      blob_data = gData.turtle.ttl_text;
      if (gData.nano.ttl_text!==null) {
        blob_data = blob_data==null?[]:blob_data;
        blob_data.push(gData.nano.ttl_text);
      }
    }
    else if (selectedTab==="#micro" && gData.micro.json_text!==null) {
      fmt = "json";
      blob_data = gData.micro.json_text;
    }
    else if (selectedTab==="#rdfa" && gData.rdfa.ttl_text!==null) {
      fmt = "ttl";
      blob_data = gData.rdfa.ttl_text;
    }

    if (fmt === "ttl")
      blob = new Blob(blob_data, {type: "text/turtle;charset=utf-8"});
    else
      blob = new Blob(blob_data, {type: "application/ld+json;charset=utf-8"});

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
