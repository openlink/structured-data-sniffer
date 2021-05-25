/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2021 OpenLink Software
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
var gOidc = new OidcWeb();

var gData = {
        text: null,
        type: null,
        url: null,
        ext: null,
        ttl_data: null,
      };

var src_view = null;
var g_RestCons = new Rest_Cons();
var gMutationObserver = new MutationObserver((mlist, observer) => g_RestCons.update())


$(document).ready(function()
{
  document.getElementById("c_year").innerText = new Date().getFullYear();

  async function click_login() {
     if (gOidc.webid) {
       await gOidc.logout();
       Download_exec_update_state();
     } else {
       gOidc.login();
     }
  } 

  var oidc_login_btn = document.getElementById('oidc-login-btn');
  oidc_login_btn.addEventListener('click', click_login);

  var oidc_login_btn1 = document.getElementById('oidc-login-btn1');
  oidc_login_btn1.addEventListener('click', click_login);

  
  $("#save-confirm").hide();
  $("#alert-dlg").hide();
  $("#login-dlg").hide();

  $('#import_btn').click(Import_doc);

  $('#rww_btn').click(Rww_exec);

  $('#sparql_btn').click(Sparql_exec);

  $('#rest_btn').click(function() {
    selectTab('#cons');
    g_RestCons.show();
    var node = DOM.iSel("rest_query");
    gMutationObserver.observe(node, {attributes:true, childList:true, subtree:true});
  });

  $('#download_btn').click(Download_exec);

  $('#tabs a[href="#src"]').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });
  $('#tabs a[href="#cons"]').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });
  $('#tabs a[href="#micro"]').click(function(){
      selectTab('#micro');
      return false;
  });
  $('#tabs a[href="#jsonld"]').click(function(){
      selectTab('#jsonld');
      return false;
  });
  $('#tabs a[href="#turtle"]').click(function(){
      selectTab('#turtle');
      return false;
  });
  $('#tabs a[href="#rdfa"]').click(function(){
      selectTab('#rdfa');
      return false;
  });
  $('#tabs a[href="#rdf"]').click(function(){
      selectTab('#rdf');
      return false;
  });
  $('#tabs a[href="#posh"]').click(function(){
      selectTab('#posh');
      return false;
  });
  $('#tabs a[href="#json"]').click(function(){
      selectTab('#json');
      return false;
  });
  $('#tabs a[href="#csv"]').click(function(){
      selectTab('#csv');
      return false;
  });

  try {
    src_view = CodeMirror.fromTextArea(document.getElementById('src_place'), {
        lineNumbers: true
      });
    src_view.setSize("100%", "100%");
  } catch(e) { }

  try{
    g_RestCons.yasqe.obj = YASQE.fromTextArea(document.getElementById('query_place'), {
        lineNumbers: true,
        lineWrapping: false,
	      sparql: { showQueryButton: false },
	     createShortLink : null,
	     createShareLink : null,
	      persistent: null,
    });
    g_RestCons.yasqe.obj.setSize("100%", 150);
  } catch(e) {
  }
  $("#query_place").hide();

  $('#login_btn').click(Login_exec);

  $('#rest_exec').click(function() {
    g_RestCons.exec();
  });
  $('#rest_exit').click(function(){
      gMutationObserver.disconnect();
      selectTab(prevSelectedTab);
      return false;
  });

  $('#src_exit').click(function(){
      selectTab(prevSelectedTab);
      return false;
  });

  selectTab('#micro');

  load_data_from_url(document.location);

  jQuery('#ext_ver').text('\u00a0ver:\u00a0'+ Browser.api.runtime.getManifest().version);

});


// Trap any link clicks and open them in the current tab.
$(document).on('click', 'a', function(e) {
  function check_URI(uri) {
    if (baseURL[baseURL.length-1]==="#")
      return uri.startsWith(baseURL);
    else
      return uri.startsWith(baseURL+'#');
  }

  var tab_data = DOM.qSel(`${selectedTab}_items`);

  var hashName = null;
  var href = e.currentTarget.href;
  var hashPos = href.lastIndexOf('#');

  if (hashPos!=-1 && hashPos!=href.length-1)
    hashName = href.substring(hashPos+1);

  var url = new URL(document.baseURI);
  url.hash = '';
  url = url.toString();

  if (href.lastIndexOf(url+"#sc", 0) === 0) {
    return true;
  }
  else if (check_URI(href) && hashName) {
    var el = tab_data.querySelectorAll('a[name = "'+hashName+'"]');
    if (el.length > 0)
      el[0].scrollIntoView();
    return false;
  }
  else if (href === doc_URL) {
    return false;
  }
  else {
    var el = tab_data.querySelectorAll('a[href = "'+href+'"][ent]');
    if (el.length > 0)
      el[0].scrollIntoView();
    else
      Browser.openTab(href, gData.tab_index);
    return false;
  }
});


function load_data_from_url(loc)
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

    var params = parseUrlQuery(loc);
    if (!params["url"])
      return;

    var url = decodeURIComponent(params.url);
    var type = params.type;
    var ext = params.ext;

    var hdr_accept = "";

    if (type==="turtle")
      hdr_accept = 'text/n3,text/turtle;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="jsonld")
      hdr_accept = 'application/ld+json;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="rdf")
      hdr_accept = 'application/rdf+xml;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="xml")
      hdr_accept = 'application/xml;text/xml;q=0.9,text/html;application/xhtml+xml;q=0.5,*/*;q=0.1';
    else if (type==="json")
      hdr_accept = 'application/sparql-results+json;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
    else if (type==="csv")
      hdr_accept = 'text/csv,application/csv;q=1.0,text/plain;q=0.5,text/html;q=0.5,*/*;q=0.1';
      
/***
    var options = {
        method: 'GET',
        headers: {
          'Accept': hdr_accept,
          'Cache-control': 'no-cache'
        }
      }
***/

    jQuery.ajaxSetup({
       dataType: "text",
       headers:{'Accept': hdr_accept,
                'Cache-control': 'no-cache'},
       timeout: 30000
    });

    jQuery.get(url, function(data, status){
        start_parse_data(data, type, url, ext);
    }, "text").fail(function(msg) {
        var msg = "Could not load data from: "+url+"\nError: "+msg.statusText;
        alert(msg);
        show_Data(msg, '');
    });
}



async function start_parse_data(data_text, data_type, data_url, ext)
{
  var test_xml = /^\s*<\?xml/gi;
  var test_rdf = /^\s*<rdf:RDF/gi;
  var test_rdf1 = /^\s*<\?xml[\s\S]*>\s*<rdf:RDF/gi;

  if (data_type === "rdf") {
    if (test_xml.exec(data_text)===null && test_rdf.exec(data_text)===null)
      data_type = "turtle";
  } 
  else if (data_type === "xml") {
    if (test_rdf.exec(data_text)!==null || test_rdf1.exec(data_text)!==null)
      data_type = "rdf";
  }


  gData.text = data_text;
  gData.type = data_type;
  gData.url = data_url;
  gData.ext = ext;

  doc_URL = data_url;

  var url = new URL(doc_URL);
  url.hash ='';
  url.search = '';
  baseURL = url.toString();

  g_RestCons.load(doc_URL);

  if (data_type==="turtle")
    {
      var handler = new Handle_Turtle();
      var ns = new Namespace();
      handler.ns_pref = ns.get_ns_desc();
      handler.ns_pref_size = ns.get_ns_size();
      var ret = await handler.parse([data_text], baseURL);
      show_Data(ret.errors, ret.data);
    }
  else if (data_type==="jsonld")
    {
      var handler = new Handle_JSONLD();
      var ret = await handler.parse([data_text], baseURL);
      show_Data(ret.errors, ret.data);
    }
  else if (data_type==="rdf")
    {
      var handler = new Handle_RDF_XML();
      var ret = await handler.parse([data_text], baseURL);
      show_Data(ret.errors, ret.data);
    }
  else if (data_type==="json")
    {
      var handler = new Handle_JSON();
      var ret = await handler.parse([data_text], baseURL);
      gData.text = ret.text;
      show_Data(ret.errors, ret.data);
    }
  else if (data_type==="csv")
    {
      var handler = new Handle_CSV();
      var ret = await handler.parse([data_text], baseURL);
      gData.ttl_data = ret.ttl_data;
      show_Data(ret.errors, ret.data);
    }
  else
    {
//      var source = sanitize_str(data_text);
//      document.body.innerHTML = "<pre>"+source+"</pre>";
      location.href = data_url+"#osds";
    }

}


function selectTab(tab)
{
  prevSelectedTab = selectedTab;
  selectedTab = tab;

  function updateTab(tab, selTab)
  {
    var tab_data = $(tab+'_items');
    var tab_id = $('#tabs a[href="'+tab+'"]');

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
  updateTab('#json', selectedTab);
  updateTab('#csv', selectedTab);
  $('#tabs a[href="#src"]').hide();
  $('#tabs a[href="#cons"]').hide();
}



function show_Data(data_error, html_data)
{
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

  function show_item(tabname, title)
  {
      $(`#${tabname}_items #docdata_view`).remove();
      $(`#${tabname}_items`).append("<div id='docdata_view' class='alignleft'/>");
      html = "";
      if (data_error.length > 0) {
        html += create_err_msg(title, data_error);
      } else {
        html += html_data;
      }

      if (html.length > 0)
          $(`#${tabname}_items #docdata_view`).append(html);

      $(`#tabs a[href="#${tabname}"]`).show();
      selectTab(`#${tabname}`);
  }

  $('#tabs a[href="#micro"]').hide();
  $('#tabs a[href="#jsonld"]').hide();
  $('#tabs a[href="#turtle"]').hide();
  $('#tabs a[href="#rdfa"]').hide();
  $('#tabs a[href="#rdf"]').hide();
  $('#tabs a[href="#posh"]').hide();
  $('#tabs a[href="#json"]').hide();
  $('#tabs a[href="#csv"]').hide();


  if (gData.type === "turtle")
    show_item('turtle', 'Turtle');
  else if (gData.type === "jsonld")
    show_item('jsonld', 'JSON-LD');
  else if (gData.type === "rdf")
    show_item('rdf', 'RDF/XML');
  else if (gData.type === "json")
    show_item('json', 'JSON');
  else if (gData.type === "csv")
    show_item('csv', 'CSV');

  gData_showed = true;
}







//////////////////////////////////////////////////////////////////////////////

function Import_doc()
{
  if (doc_URL!==null) {
     var _url = (new Settings()).createImportUrl(doc_URL);
     Browser.api.tabs.create({url:_url});
  }

  return false;
}


function Rww_exec()
{
  function openRww(data)
  {
     var _url = (new Settings()).createRwwUrl(doc_URL, data);
     Browser.openTab(_url, gData.tab_index);
  }

  if (doc_URL!==null) {
     var edit_url = (new Settings()).getValue('ext.osds.rww.edit.url');

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
      var u = new URL(doc_URL);
      u.hash = '';
      u.search = '';
     var _url = (new Settings()).createSparqlUrl(u.toString());
     Browser.api.tabs.create({url:_url});
  }

  return false;
}


async function Login_exec()
{
  Download_exec_update_state();

  var dlg = $( "#login-dlg" ).dialog({
    resizable: true,
    width:500,
    height:200,
    modal: true,
    buttons: {
      "OK": function() {
        $(this).dialog( "destroy" );
      }
    }
  });

  return false;
}


function Download_exec_update_state() 
{

  try {
    gOidc.checkSession().then(() => {
      var webid_href = document.getElementById('oidc-webid');
      var webid1_href = document.getElementById('oidc-webid1');

      webid1_href.href = webid_href.href = gOidc.webid ? gOidc.webid :'';
      webid1_href.title = webid_href.title = gOidc.webid ? gOidc.webid :'';
      webid1_href.style.display = webid_href.style.display = gOidc.webid ? 'initial' :'none';

      var oidc_login_btn = document.getElementById('oidc-login-btn');
      var oidc_login_btn1 = document.getElementById('oidc-login-btn1');
      oidc_login_btn1.innerText = oidc_login_btn.innerText = gOidc.webid ? 'Logout' : 'Login';

      var login_tab = document.getElementById('login_btn');
      if (gOidc.webid) {
        login_tab.title = "Logged as "+gOidc.webid;
        login_tab.src = "images/uid.png";
      } else {
        login_tab.title = "Solid Login";
        login_tab.src = "images/slogin24.png";
      }

    });

  } catch (e) {
    console.log(e);
  }
  var cmd = $('#save-action option:selected').attr('id');
  if (cmd==='filesave')
    $('#save-file').show();
  else
    $('#save-file').hide();

  if (cmd==='fileupload') {
    $('#oidc-login').show();
  } else {
    $('#oidc-login').hide();
  }

  var filename;
  var fmt = $('#save-fmt option:selected').attr('id');

  if (fmt == "jsonld")
    filename = cmd==="fileupload" ? "jsonld_data.jsonld" : "jsonld_data.txt";
  else if (fmt == "json")
    filename = "json_data.txt";
  else if (fmt == "ttl") 
    filename = cmd==="fileupload" ? "turtle_data.ttl" : "turtle_data.txt";
  else
    filename = "rdf_data.rdf";

  if (cmd ==="sparqlupload") {
    $('#save-filename').hide();    
    $('#save-fmt-item').hide();    
    $('#save-sparql-item').show();    
  } else {
    $('#save-filename').show();    
    $('#save-fmt-item').show();    
    $('#save-sparql-item').hide();    
  }

  var oidc_url = document.getElementById('oidc-url');
  oidc_url.value = (gOidc.storage || '') + (filename || '');

  var save_filename = document.getElementById('save-filename');
  save_filename.value = filename || '';
}


async function Download_exec()
{
  var _url = new URL(doc_URL);
  _url.hash = "osds";
  $('#save-sparql-graph').val(_url.toString());

  $('#save-action').change(function() {
    Download_exec_update_state();
  });

  $('#save-fmt').change(function() {
    Download_exec_update_state();
  });

  Download_exec_update_state();

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
  var fmt = "jsonld";


  $('#save-fmt #json').prop('disabled', true);

  if (gData.type == "jsonld" && gData.text) {
    filename = "jsonld_data.txt";
    fmt = "jsonld";
  }
  else if (gData.type == "turtle" && gData.text) {
    filename = "turtle_data.txt";
    fmt = "ttl";
  }
  else if (gData.type == "rdf" && gData.text) {
    filename = "rdf_data.rdf";
    fmt = "rdf";
  }
  else if (gData.type == "json" && gData.text) {
    filename = "json_data.txt";
    fmt = "json";
    $('#save-fmt #json').prop('disabled', false);
  }
  else if (gData.type == "csv" && gData.ttl_data) {
    filename = "turtle_data.txt";
    fmt = "ttl";
  }

  var oidc_url = document.getElementById('oidc-url');
  oidc_url.value = gOidc.storage + (filename || '');


  if (filename!==null) {
    $('#save-filename').val(filename);

    var cur_fmt = $('#save-fmt option:selected').attr('id');
    $('#'+cur_fmt,'#save-fmt').removeProp('selected');
    $('#'+fmt,'#save-fmt').prop('selected',true);

    $( "#save-confirm" ).dialog({
      resizable: true,
      width:520,
      height:300,
      modal: true,
      buttons: {
        "OK": function() {
          var action = $('#save-action option:selected').attr('id');
          var fmt = $('#save-fmt option:selected').attr('id');
          var fname = action ==='fileupload' ? $('#oidc-url').val().trim(): $('#save-filename').val().trim();
          save_data(action, fname, fmt)
           .then(() => {$('#save-confirm').dialog( "destroy" )});
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



async function save_data(action, fname, fmt, callback)
{
  var sparqlendpoint = $('#save-sparql-endpoint').val().trim();
  var sparql_graph = $('#save-sparql-graph').val().trim();


  function out_from(for_query, data, error, skipped_error)
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

    if (error) {
      errors.push("\n"+error);
    }

    if (skipped_error && skipped_error.length>0) {
      errors = errors.concat(skipped_error);
    }

    if (for_query) {
      retdata.txt = outdata;
    } else {
      for(var i=0; i < outdata.length; i++)
        retdata.txt += outdata[i]+"\n\n";
    }

    for(var i=0; i < errors.length; i++)
      retdata.error += errors[i]+"\n\n";

    return retdata;
  }


  async function exec_action(action, rc)
  {
    if (action==="sparqlupload") {
     retdata = out_from(true, rc.data, rc.error, rc.skipped_error);
     var rc = await upload_to_sparql(retdata, sparqlendpoint, sparql_graph);
     if (rc && document.querySelector('#save-sparql-check-res').checked) {
        var _url = (new Settings()).createSparqlUrl(sparql_graph, sparqlendpoint);
        Browser.openTab(_url, gData.tab_index);
     }
    } else {

      retdata = out_from(false, rc.data, rc.error, rc.skipped_error);

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
      else if (action==="fileupload") {
       var contentType = "text/plain;charset=utf-8";

       if (fmt==="jsonld")
         contentType = "application/ld+json;charset=utf-8";
       else if (fmt==="json")
         contentType = "application/json;charset=utf-8";
       else if (fmt==="rdf")
         contentType = "application/rdf+xml;charset=utf-8";
       else
         contentType = "text/turtle;charset=utf-8";

        putResource(gOidc, fname, retdata.txt, contentType, null)
          .then(response => {
            showInfo('Saved');
          })
          .catch(error => {
            console.error('Error saving document', error)

            let message

            switch (error.status) {
              case 0:
              case 405:
                message = 'this location is not writable'
                break
              case 401:
              case 403:
                message = 'you do not have permission to write here'
                break
              case 406:
                message = 'enter a name for your resource'
                break
              default:
                message = error.message
                break
            }
            showInfo('Unable to save:' +message);
          })
      }
      else {
        selectTab("#src");
        src_view.setValue(retdata.txt + retdata.error+"\n");
      }
    }
  }


  try{
    var data = [];
    var src_fmt = null;

    if (action === "sparqlupload") {
      fmt = "ttl";

      if (!sparqlendpoint || sparqlendpoint.length < 1) {
        showInfo('SPARQL endpoint is empty');
        return;
      }
    }
    
    
    if (gData.type==="jsonld" && gData.text!==null) {
      src_fmt = "jsonld";
      data = data.concat(gData.text);
    }
    else if (gData.type==="json" && gData.text!==null) {
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
    else if (gData.type==="csv" && gData.ttl_data!==null) {
      src_fmt = "ttl";
      data = data.concat(gData.ttl_data);
    }
    else
      return;

    if (src_fmt!==fmt)
    {
      if (src_fmt==="ttl") {
        var handler = new Convert_Turtle();
        if (fmt==="jsonld") {
          var text_data = await handler.to_jsonld(data, null, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:handler.skipped_error});
        } else {
          var text_data = await handler.to_rdf(data, null, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:handler.skipped_error});
        }
      }
      else if (src_fmt==="jsonld") {
        var handler = new Convert_JSONLD();
        if (fmt==="ttl") {
          var text_data = await handler.to_ttl(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:handler.skipped_error});
        } else {
          var text_data = await handler.to_rdf(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:handler.skipped_error});
        }
      }
      else if (src_fmt==="json"){
        var conv = new Convert_JSON();
        if (fmt==="ttl"){
          var text_data = await conv.to_ttl(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:conv.skipped_error});
        } else if (fmt==="rdf"){
          var text_data = await conv.to_rdf(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:conv.skipped_error});
        } else if (fmt==="jsonld"){
          var text_data = await conv.to_jsonld(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:conv.skipped_error});
        }
      }
      else if (src_fmt==="rdf") {
        if (fmt==="ttl") {
          var conv = new Convert_RDF_XML();
          var text_data = await conv.to_ttl(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:conv.skipped_error});
        } else if (fmt==="jsonld") {
          var conv = new Convert_RDF_XML();
          var text_data = await conv.to_jsonld(data, baseURL);
          exec_action(action, {data:text_data, error:null, skipped_error:conv.skipped_error});
        }
      }
      else {
        showInfo("Format "+src_fmt+" isn't supported else.");
      }
    } else {
      exec_action(action, {data, error:null, skipped_error:null});
    }

  } catch(ex) {
    showInfo(ex);
  }

}


async function upload_to_sparql(data, sparqlendpoint, sparql_graph)
{
  if (data.error.length > 0) {
     showInfo(data.error);
     return false;
  }

  var saver = new Save2Sparql(sparqlendpoint, sparql_graph, baseURL, gOidc);
  var ret = await saver.upload_to_sparql(data);
  if (!ret.rc) {
    showInfo('Unable to save:' +ret.error);
    return false;
  }

  showInfo('Saved');
  return true;
}



function showInfo(msg)
{
  $('#alert-msg').prop('textContent',msg);
  $('#alert-dlg').dialog({
    resizable: true,
    height:180,
    modal: true,
    buttons: {
      "OK": function() {
        $(this).dialog('destroy');
      }
    }
  });
}


Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  try {
    if (request.cmd === "store_updated" && request.key === "oidc.session")
    {
      Download_exec_update_state(); 
    }
 
    sendResponse({}); /* stop */

  } catch(e) {
    console.log("OSDS: onMsg="+e);
  }

});

