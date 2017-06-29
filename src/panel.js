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
var prevSelectedTab = null;
var selectedTab = null;
var gData = {
        micro:{ json_text:null },
        jsonld:{ json_text:null },
        rdfa:{ ttl_text:null },
        turtle:{ ttl_text:null },
        rdf:{ text:null },
        ttl_nano :{ ttl_text:null},
        json_nano :{ json_text:null },
        rdf_nano :{ rdf_text:null },
        posh:{ ttl_text:null },
        tab_index: null,
        tabs:[],
        baseURL: null
      };
var yasqe = {
        obj : null,
        val : null,
        init: false,
      };
var src_view = null;
var g_fix_restURI = null;


$(document).ready(function()
{
  $("#save-confirm").hide();
  $("#alert-dlg").hide();

  $('#slink_btn').click(SuperLinks_exec);

  $('#import_btn').click(Import_doc);

  $('#rww_btn').click(Rww_exec);

  $('#sparql_btn').click(Sparql_exec);

  $('#rest_btn').click(show_rest);

  $('#download_btn').click(Download_exec);

  $('#prefs_btn').click(Prefs_exec);

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

  gData_showed = false;

  if (Browser.isFirefoxSDK)
  {
    jQuery('#ext_ver').text('ver: '+ self.options.ver);

    //req data from extension
    self.port.emit("doc_data", "");
  }
  else
  {
    jQuery('#ext_ver').text('ver: '+ Browser.api.runtime.getManifest().version);

    Browser.api.tabs.query({active:true, currentWindow:true}, function(tabs) {
      if (tabs.length > 0) {
        //?? Request the microdata items in JSON format from the client (foreground) tab.
        Browser.api.tabs.sendMessage(tabs[0].id, {
            property: 'doc_data'
          },
          function(response) {
          });
      }
    });
  }

});


// Trap any link clicks and open them in the current tab.
/***
$(document).on('click', 'a', function(e) {
  var href = e.currentTarget.href;

  var url = new Uri(document.baseURI).setAnchor("");
  if (href.lastIndexOf(url+"#sc", 0) === 0) {
    return true;
  } else {
    Browser.openTab(href, gData.tab_index);
    return false;
  }
});
***/
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
    Browser.openTab(href, gData.tab_index);
    return false;
  }
});




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



function show_Data(dData)
{
  var cons = false;
  var micro = false;
  var jsonld = false;
  var turtle = false;
  var rdfa = false;
  var rdf = false;
  var posh = false;
  var html = "";
  var err_tabs = [];

  gData.tabs = [];
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
    return (err_html.length>0)?err_html:null;
  }



  $('#micro_items #docdata_view').remove();
  $('#micro_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.micro.expanded!==null && dData.micro.expanded.length > 0) {
      html += dData.micro.expanded;
      gData.tabs.push("#micro");
  }
  if (dData.micro.error) {
      var err_msg = create_err_msg("Microdata", dData.micro.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#micro");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#micro_items #docdata_view').append(html);
      micro = true;
  }


  $('#jsonld_items #docdata_view').remove();
  $('#jsonld_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.jsonld.expanded!==null && dData.jsonld.expanded.length > 0) {
      html += dData.jsonld.expanded;
      gData.tabs.push("#jsonld");
  }
  if (dData.jsonld.error.length > 0) {
      var err_msg = create_err_msg("JSON-LD", dData.jsonld.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#jsonld");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#jsonld_items #docdata_view').append(html);
      jsonld = true;
  }



  $('#turtle_items #docdata_view').remove();
  $('#turtle_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.turtle.expanded!==null && dData.turtle.expanded.length > 0) {
      html += dData.turtle.expanded;
      gData.tabs.push("#turtle");
  }
  if (dData.turtle.error.length > 0) {
      var err_msg = create_err_msg("Turtle", dData.turtle.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#turtle");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#turtle_items #docdata_view').append(html);
      turtle = true;
  }


  $('#rdfa_items #docdata_view').remove();
  $('#rdfa_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.rdfa.expanded!==null && dData.rdfa.expanded.length > 0) {
      html += dData.rdfa.expanded;
      gData.tabs.push("#rdfa");
  }
  if (dData.rdfa.error) {
      var err_msg = create_err_msg("RDFa", dData.rdfa.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#rdfa");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#rdfa_items #docdata_view').append(html);
      rdfa = true;
  }



  $('#rdf_items #docdata_view').remove();
  $('#rdf_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.rdf.expanded!==null && dData.rdf.expanded.length > 0) {
      html += dData.rdf.expanded;
      gData.tabs.push("#rdf");
  }
  if (dData.rdf.error) {
      var err_msg = create_err_msg("RDF/XML", dData.rdf.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#rdf");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#rdf_items #docdata_view').append(html);
      rdf = true;
  }


  $('#posh_items #docdata_view').remove();
  $('#posh_items').append("<div id='docdata_view' class='alignleft'/>");
  html = "";
  if (dData.posh.expanded!==null && dData.posh.expanded.length > 0) {
      html += dData.posh.expanded;
      gData.tabs.push("#posh");
  }
  if (dData.posh.error) {
      var err_msg = create_err_msg("POSH", dData.posh.error);
      if (err_msg) {
        html += err_msg;
        err_tabs.push("#posh");
      }
  }
  if (html.length > 0 && html.replace(/\s/g, "").length > 0) {
      $('#posh_items #docdata_view').append(html);
      posh = true;
  }


  if (gData.tabs.length > 0)
    selectTab(gData.tabs[0]);
  else if (err_tabs.length > 0)
    selectTab(err_tabs[0]);


  if (!micro)
    $('#tabs a[href=#micro]').hide();
  if (!jsonld)
    $('#tabs a[href=#jsonld]').hide();
  if (!turtle)
    $('#tabs a[href=#turtle]').hide();
  if (!rdfa)
    $('#tabs a[href=#rdfa]').hide();
  if (!rdf)
    $('#tabs a[href=#rdf]').hide();
  if (!posh)
    $('#tabs a[href=#posh]').hide();

  gData_showed = true;
}



function check_Microdata(dData)
{
  if (dData.micro.data)
  {
    var handler = new Handle_Microdata();
    gData.micro.json_text = [JSON.stringify(dData.micro.data, undefined, 2)];
    handler.parse(dData.micro.data, gData.baseURL,
      function(error, html_data)
      {
        if (error)
          dData.micro.error = error.toString();
        else
          dData.micro.expanded = html_data;

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
    handler.parse(dData.jsonld.text, gData.baseURL,
      function(error, html_data) {
        gData.jsonld.json_text = dData.jsonld.text;
        if (error)
          dData.jsonld.error.push(error);

        if (html_data)
          dData.jsonld.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.jsonld.error = dData.jsonld.error.concat(handler.skipped_error);

        check_Json_Nano(dData, handler.start_id);
    });
  }
  else
  {
    check_Json_Nano(dData, 0);
  }
}


function check_Json_Nano(dData, start_id)
{
  if (dData.json_nano.text!==null && dData.json_nano.text.length > 0)
  {
    var handler = new Handle_JSONLD();
    handler.start_id = start_id;
    handler.parse(dData.json_nano.text, gData.baseURL,
      function(error, html_data) {
        gData.json_nano.json_text = dData.json_nano.text;
        if (error)
          dData.jsonld.error.push(error);

        if (html_data)
          dData.jsonld.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.jsonld.error = dData.jsonld.error.concat(handler.skipped_error);

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
    handler.parse(dData.turtle.text, gData.baseURL,
      function(error, html_data) {
        gData.turtle.ttl_text = dData.turtle.text;
        if (error)
          dData.turtle.error.push(error);

        if (html_data)
          dData.turtle.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.turtle.error = dData.turtle.error.concat(handler.skipped_error);

        check_Turtle_Nano(dData, handler.start_id);
    });
  }
  else
  {
    check_Turtle_Nano(dData, 0);
  }
}


function check_Turtle_Nano(dData, start_id)
{
  if (dData.ttl_nano.text!==null && dData.ttl_nano.text.length > 0)
  {
    new Fix_Nano().parse(dData.ttl_nano.text,
      function(output){
        dData.ttl_nano.text = output;

        if (dData.ttl_nano.text!==null && dData.ttl_nano.text.length > 0) {
          var handler = new Handle_Turtle(start_id);
          handler.parse_nano(dData.ttl_nano.text, gData.baseURL,
            function(error, html_data) {
              gData.ttl_nano.ttl_text = dData.ttl_nano.text;
              if (error)
                dData.turtle.error.push(error);

              if (html_data)
                dData.turtle.expanded = html_data;

              if (handler.skipped_error.length>0)
                dData.turtle.error = dData.turtle.error.concat(handler.skipped_error);

              check_POSH(dData);
          });
        }
        else {
          check_POSH(dData);
        }
    });
  }
  else
  {
    check_POSH(dData);
  }
}



function check_POSH(dData)
{
  if (dData.posh.text!==null && dData.posh.text.length > 0)
  {
    var handler = new Handle_Turtle();
    handler.parse([dData.posh.text], gData.baseURL,
      function(error, html_data) {
        gData.posh.ttl_text = dData.posh.text;
        if (error)
          dData.posh.error.push(error);

        if (html_data)
          dData.posh.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.posh.error = dData.posh.error.concat(handler.skipped_error);

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
    handler.parse(dData.rdfa.data, gData.baseURL,
      function(error, html_data) {
        if (error)
          dData.rdfa.error = error;
        else {
          dData.rdfa.expanded = html_data;
          gData.rdfa.ttl_text = [dData.rdfa.ttl];
        }

        check_RDF_XML(dData);
    });
  }
  else
  {
    check_RDF_XML(dData);
  }
}



function check_RDF_XML(dData)
{
  if (dData.rdf.text && dData.rdf.text.length > 0)
  {
    var handler = new Handle_RDF_XML();
    handler.parse(dData.rdf.text, gData.baseURL,
      function(error, html_data) {
        gData.rdf.text = dData.rdf.text;
        if (error)
          dData.rdf.error.push(error);

        if (html_data)
          dData.rdf.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.rdf.error = dData.rdf.error.concat(handler.skipped_error);

        check_RDF_XML_Nano(dData);
    });
  }
  else
  {
    check_RDF_XML_Nano(dData);
  }
}


function check_RDF_XML_Nano(dData)
{
  if (dData.rdf_nano.text!==null && dData.rdf_nano.text.length > 0)
  {
    var handler = new Handle_RDF_XML();
    handler.parse(dData.rdf_nano.text, gData.baseURL,
      function(error, html_data) {
        gData.rdf_nano.rdf_text = dData.rdf_nano.text;
        if (error)
          dData.rdf.error.push(error);

        if (html_data)
          dData.rdf.expanded = html_data;

        if (handler.skipped_error.length>0)
          dData.rdf.error = dData.rdf.error.concat(handler.skipped_error);

        show_Data(dData);
    });
  }
  else
  {
    show_Data(dData);
  }
}


function parse_Data(dData)
{
  dData.micro.expanded = null;
  dData.micro.error = null;
  dData.jsonld.expanded = null;
  dData.jsonld.error = [];
  dData.turtle.expanded = null;
  dData.turtle.error = [];
  dData.rdfa.expanded = null;
  dData.rdfa.error = null;
  dData.ttl_nano.expanded = null;
  dData.ttl_nano.error = null;
  dData.json_nano.expanded = null;
  dData.json_nano.error = null;
  dData.posh.expanded = null;
  dData.posh.error = [];
  dData.rdf.expanded = null;
  dData.rdf.error = null;
  dData.rdf_nano.expanded = null;
  dData.rdf_nano.error = null;
  doc_URL = dData.docURL;

  var url = new Uri(doc_URL);
  url.setAnchor("");
  url.setQuery("");
  gData.baseURL = url.toString();

  load_restData(doc_URL);

  check_Microdata(dData);
}



if (Browser.isFirefoxWebExt || Browser.isChromeWebExt) {
  try {
    Browser.api.browserAction.disable();
  } catch(e) {}
}


if (Browser.isFirefoxSDK)
{
  //Firefox SDK
  //wait data from extension
  self.port.on("doc_data", function(msg) {

      var dData = JSON.parse(msg.data);
      if (!gData_showed)
        parse_Data(dData);
  });
}
else
{
  //Chrome API
  //wait data from extension
  Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse)
  {
    try {
      if (request.property == "status")
      {
        var show_action = request.data_exists;
        if (Browser.isFirefoxWebExt || Browser.isChromeWebExt) {
          if (show_action)
            Browser.api.browserAction.enable(sender.tab.id);
          else
            Browser.api.browserAction.disable(sender.tab.id);
        }
        else {
          if (show_action)
            Browser.api.pageAction.show(sender.tab.id);
          else
            Browser.api.pageAction.hide(sender.tab.id);
        }
      }
      else if (request.property == "doc_data")
      {
        var dData = JSON.parse(request.data);
        try {
          gData.tab_index = sender.tab.index;
        } catch(e){}
        parse_Data(dData);
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


////////////////////////////////////////////////////
function SuperLinks_exec()
{
  if (doc_URL!==null) {
    Browser.api.tabs.query({active:true, currentWindow:true}, function(tabs) {
      if (tabs.length > 0) {
        Browser.api.tabs.sendMessage(tabs[0].id, {
            property: 'super_links',
          },
          function(response) {
          });
        window.close();
      }
    });
  }

  return false;
}



function Import_doc()
{
  if (doc_URL!==null) {
     var _url = new Settings().createImportUrl(doc_URL);
     Browser.openTab(_url, gData.tab_index);
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
     Browser.openTab(_url, gData.tab_index);
  }

  return false;
}


function Prefs_exec()
{
  //snow preferenses
  if (Browser.isFirefoxSDK)
     self.port.emit("prefs", "");
  else
     Browser.openTab("options.html")

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

  if (selectedTab==="#jsonld" && (gData.jsonld.json_text!==null || gData.json_nano.json_text!==null)) {
    filename = "jsonld_data.txt";
    fmt = "json";
  }
  else if (selectedTab==="#turtle" && (gData.turtle.ttl_text!==null || gData.ttl_nano.ttl_text!==null)) {
    filename = "turtle_data.txt";
    fmt = "ttl";
  }
  else if (selectedTab==="#micro" && gData.micro.json_text!==null) {
    filename = "microdata_data.txt";
    fmt = "json";
  }
  else if (selectedTab==="#rdfa" && gData.rdfa.ttl_text!==null) {
    filename = "rdfa_data.txt";
    fmt = "ttl";
  }
  else if (selectedTab==="#rdf" && (gData.rdf.text!==null || gData.rdf_nano.rdf_text!==null)) {
    filename = "rdf_xml_data.txt";
    fmt = "rdf";
  }
  else if (selectedTab==="#posh" && gData.posh.ttl_text!==null) {
    filename = "posh_data.txt";
    fmt = "ttl";
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

    var dlg = $( "#save-confirm" ).dialog({
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
    var quad_data = [];
    var blob = null;
    var src_fmt = null;

    if (selectedTab==="#jsonld" && (gData.jsonld.json_text!==null || gData.json_nano.json_text!==null)) {
      src_fmt = "json";

      if (gData.jsonld.json_text!==null)
        data = data.concat(gData.jsonld.json_text);

      if (gData.json_nano.json_text!==null)
        data = data.concat(gData.json_nano.json_text);
    }
    else if (selectedTab==="#turtle" && (gData.turtle.ttl_text!==null || gData.ttl_nano.ttl_text!==null)) {
      src_fmt = "ttl";
      if (gData.turtle.ttl_text!==null)
        data = data.concat(gData.turtle.ttl_text);

      if (gData.ttl_nano.ttl_text!==null)
        quad_data = quad_data.concat(gData.ttl_nano.ttl_text);
    }
    else if (selectedTab==="#micro" && gData.micro.json_text!==null) {
      src_fmt = "json";
      data = data.concat(gData.micro.json_text);
    }
    else if (selectedTab==="#rdfa" && gData.rdfa.ttl_text!==null) {
      src_fmt = "ttl";
      data = data.concat(gData.rdfa.ttl_text);
    }
    else if (selectedTab==="#rdf" && (gData.rdf.text!==null || gData.rdf_nano.rdf_text!==null)) {
      src_fmt = "rdf";
      if (gData.rdf.text!==null)
        data = data.concat(gData.rdf.text);

      if (gData.rdf_nano.rdf_text!==null)
        data = data.concat(gData.rdf_nano.rdf_text);
    }
    else if (selectedTab==="#posh" && gData.posh.ttl_text!==null) {
      src_fmt = "ttl";
      data = data.concat(gData.posh.ttl_text);
    }
    else
      return;

    if (data.length==0 && quad_data.length==0)
      return;

    if (selectedTab==="#micro" && data.length > 0)
    {
      var handler = new Handle_Microdata(true);
      handler.parse(JSON.parse(data[0]), gData.baseURL,
        function(error, ttl_data)
        {
          if (error) {
            exec_action(action, out_from(error));
            return;
          }
          if (ttl==null)
              return;

          if (fmt==="ttl") {
            exec_action(action, out_from(ttl_data));
          }
          else if (fmt==="json") { // json
            var conv = new Convert_Turtle();
            conv.to_json([ttl_data], null, gData.baseURL,
              function(error, text_data) {
                exec_action(action, out_from(text_data, error, conv.skipped_error));
              });
          }
          else {
            showInfo("Conversion to RDF/XML isn't supported");
          }
        });
    }
    else if (selectedTab==="#rdfa" && data.length > 0)
    {
      var handler = new Handle_Turtle(0, true);
      handler.parse(data, gData.baseURL,
        function(error, ttl_data)
        {
          if (error || handler.skipped_error.length > 0) {
            exec_action(action, out_from(null, error, handler.skipped_error));
            return;
          }
          if (ttl==null)
              return;

          if (fmt==="ttl") {
            exec_action(action, out_from(ttl_data));
          }
          else if (fmt==="json") { // json
            var conv = new Convert_Turtle();
            conv.to_json(ttl_data, null, gData.baseURL,
              function(error, text_data) {
                exec_action(action, out_from(text_data, error, conv.skipped_error));
              });
          }
          else {
            showInfo("Conversion to RDF/XML isn't supported");
          }
        });
    }
    else if (src_fmt!==fmt)
    {
      if (src_fmt==="ttl") {
        var conv = new Convert_Turtle();
        if (fmt==="json") {
          conv.to_json(data, quad_data, gData.baseURL,
            function(error, text_data) {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        } else if (fmt==="rdf") {
          showInfo("Conversion to RDF/XML isn't supported");
/***
          conv.to_rdf(data, quad_data, gData.baseURL,
            function(error, text_data) {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
***/
        }
      }
      else if (src_fmt==="json"){
        var conv = new Convert_JSONLD();
        if (fmt==="ttl"){
          conv.to_ttl(data, gData.baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        } else if (fmt==="rdf"){
          showInfo("Conversion to RDF/XML isn't supported");
/***
          conv.to_rdf(data, gData.baseURL,
            function(error, text_data) {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
***/
        }
      }
      else if (src_fmt==="rdf"){
        var conv = new Convert_RDF_XML();
        if (fmt==="ttl") {
          conv.to_ttl(data, gData.baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        } else if (fmt==="json"){
          conv.to_json(data, gData.baseURL,
            function(error, text_data)
            {
              exec_action(action, out_from(text_data, error, conv.skipped_error));
            });
        }
      }
    } else {
      data = data.concat(quad_data);
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

  var _url = (g_fix_restURI)? g_fix_restURI : new Uri(doc_URL);
  _url.setQuery("");

  if (yasqe.obj) {
    var val = yasqe.obj.getValue();
    if (val && val.length > 0)
       _url.addQueryParam("query", val);
  }

  var rows = $('#restData>tr');
  for(var i=0; i < rows.length; i++) {
    var r = $(rows[i]);
    var h = r.find('#h').val();
    var v = r.find('#v').val();
    if (h.length>0)
       _url.addQueryParam(h, v);
  }

  Browser.openTab(_url.toString(), gData.tab_index);
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
  g_fix_restURI = null;

  delRest();

  if (!doc_url) {
    addRestEmpty();
    return;
  }

  var url = new Uri(doc_url);
  var anchor = url.anchor();
  // check for RDF Editor URL
  if (anchor.lastIndexOf("/editor?", 0) === 0) {
    var tmp_url = doc_url.replace(/#\/editor\?/g, "%23/editor?");
    g_fix_restURI = url = new Uri(tmp_url);
    var tmp_path = url.path().replace(/%23\/editor/g, "#/editor");
    url.setPath(tmp_path);
  }

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
