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

var gPref = null;
var yasqe_slinks = null;
var yasqe_srv = null;

$(function(){
  // Tabs
  document.getElementById("c_year").innerText = new Date().getFullYear();

  gPref = new Settings();

  $("#revert-confirm").hide();
  $("#users-edit").hide();
  $('#users_add').click(addUsersEmpty);
  $('#users_add').button({
	icons: { primary: 'ui-icon-plusthick' },
	text: false
  });


  $('#tabs').tabs({
    activate: function( event, ui ) {
	if (ui.newPanel[0].id == "tabs-2") {
	   var s = yasqe_srv.getValue();
	   yasqe_srv.setValue(s);
	}
	else if (ui.newPanel[0].id == "tabs-3") {
           var s = yasqe_slinks.getValue();
           yasqe_slinks.setValue(s);
	}
    }
  });

  try{
    yasqe_slinks = YASQE.fromTextArea(document.getElementById('super-links-query'), {
       lineNumbers: true,
      lineWrapping: false,
            sparql: { showQueryButton: false },
       createShortLink : null,
       createShareLink : null,
	     persistent: null,
    });
    yasqe_slinks.setSize("100%", 480);

    yasqe_srv = YASQE.fromTextArea(document.getElementById('sparql-query'), {
			lineNumbers: true,
			lineWrapping: false,
			sparql: { showQueryButton: false },
			createShortLink : null,
			createShareLink : null,
			persistent: null,
    });

    yasqe_srv.setSize("100%", 420);
  } catch(e) {
    console.log(e);
  }

  try {
    loadPref();
  } catch(e) {
    console.log(e);
  }

  $('#uiterm-mode').change(function() {
      var cmd = $('#sparql-cmd option:selected').attr('id');
      yasqe_srv.setValue(createSparqlQuery(cmd));
  });

  $('#import-srv').change(function() {
	setTimeout(enableCtrls,200);
  });

  $('#sparql-cmd').change(function() {
	var cmd = $('#sparql-cmd option:selected').attr('id');
	 yasqe_srv.setValue(createSparqlQuery(cmd));
  });

  $('#chk_try_handle_all').change(changeHandleAll);
  $('#OK_btn').click(savePref);
  $('#Cancel_btn').click(closeOptions);

  $('#import-set-def').click(setImportDefaults);
  $('#rww-set-def').click(setRWWDefaults);
  $('#sparql-set-def').click(setSparqlDefaults);
  $('#super-links-set-def').click(setSuperLinksDefaults);

  $('#call_edit_users').click(call_edit_users);

  enableCtrls();

  $('#ext_ver').text('Version: '+ Browser.api.runtime.getManifest().version);

});

function changeHandleAll()
{
   var v = DOM.iSel('chk_try_handle_all').checked ? false : true;
     $('#chk_try_handle_xml').prop('disabled', v);
     $('#chk_try_handle_csv').prop('disabled', v);
     $('#chk_try_handle_json').prop('disabled', v);
}

function closeOptions()
{
    if (Browser.isFirefoxWebExt) {
      Browser.api.tabs.getCurrent()
        .then((tab) => {
          Browser.api.tabs.remove(tab.id);
        });
    } else {
      window.close();
    }
}

function setImportDefaults()
{
    $( "#revert-confirm" ).dialog({
      resizable: false,
      height:160,
      modal: true,
      buttons: {
        "OK": function() {

          DOM.qSel('#import-srv #'+gPref.def_import_srv).selected=true;
          var h_url = gPref.createDefaultImportCmdFor(gPref.def_import_srv, gPref.def_import_url.trim());
          DOM.iSel('import-url').value = h_url;
          enableCtrls();

          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
};

function setRWWDefaults()
{
    $( "#revert-confirm" ).dialog({
      resizable: false,
      height:160,
      modal: true,
      buttons: {
        "OK": function() {

          DOM.iSel('rww-store-url').value = "";
          DOM.iSel('rww-edit-url').value = gPref.def_rww_edit_url;

          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
};

function setSparqlDefaults()
{
    $( "#revert-confirm" ).dialog({
      resizable: false,
      height:160,
      modal: true,
      buttons: {
        "OK": function() {

          DOM.qSel('#sparql-cmd #'+gPref.def_sparql_cmd).selected=true;
          DOM.iSel('sparql-url').value = gPref.def_sparql_url;
	  yasqe_srv.setValue(createSparqlQuery(gPref.def_sparql_cmd));

          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
};


function setSuperLinksDefaults()
{
    $( "#revert-confirm" ).dialog({
      resizable: false,
      height:160,
      modal: true,
      buttons: {
        "OK": function() {
          DOM.iSel('super-links-timeout').value = gPref.def_super_links_timeout;
          yasqe_slinks.setValue(gPref.def_super_links_query);
          DOM.qSel('#super-links-sponge #describe-ssl').selected = true;
          DOM.qSel('#super-links-sponge-mode #xxx').selected = true;
          DOM.qSel('#super-links-viewer #html-fb').selected = true;
          DOM.qSel('#super-links-highlight #all').selected = true;

          DOM.iSel('super-links-retries').value = gPref.def_super_links_retries;
          DOM.iSel('super-links-retries-timeout').value = gPref.def_super_links_retries_timeout;

          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
};

function load_pref_user()
{
    var pref_user = gPref.getValue("ext.osds.pref.user");
//    if (pref_user)
//        $('#pref_user').val(pref_user);

    var list = [];
    try {
      var v = gPref.getValue('ext.osds.pref.user.list');
      if (v)
        list = JSON.parse(v);
    } catch(e){}

    $('#pref_user')[0].options.length = 0;
    $.each(list, function (i, item) {
        if (pref_user === item)
          $('#pref_user').append($('<option>', {
            value: 'uid'+i,
            text : item,
            selected: 1
          }));
        else
          $('#pref_user').append($('<option>', {
            value: 'uid'+i,
            text : item
          }));
    });

   pref_user = $('#pref_user option:selected').text();
   gPref.setValue("ext.osds.pref.user", pref_user);
}


function loadPref()
{
    var uiterm_mode = gPref.getValue("ext.osds.uiterm.mode");
    DOM.qSel('#uiterm-mode #'+uiterm_mode).selected=true;

    var chk_user = gPref.getValue("ext.osds.pref.user.chk");
    DOM.iSel("chk_pref_user").checked = (chk_user==="1");

    load_pref_user();

    var chk_action = gPref.getValue("ext.osds.pref.show_action");
    DOM.iSel("chk_show_action_for_url_with_params").checked = (chk_action==="1");

    var chk_xml = gPref.getValue("ext.osds.handle_xml");
    DOM.iSel("chk_try_handle_xml").checked = (chk_xml==="1");

    var chk_csv = gPref.getValue("ext.osds.handle_csv");
    DOM.iSel("chk_try_handle_csv").checked = (chk_csv==="1");

    var chk_json = gPref.getValue("ext.osds.handle_json");
    DOM.iSel("chk_try_handle_json").checked = (chk_json==="1");

    var chk_all = gPref.getValue("ext.osds.handle_all");
    DOM.iSel("chk_try_handle_all").checked = (chk_all==="1");

    changeHandleAll();

    var import_url = gPref.getValue("ext.osds.import.url");
    var import_srv = gPref.getValue("ext.osds.import.srv");

    DOM.qSel('#import-srv #'+import_srv).selected=true;
    DOM.iSel('import-url').value = import_url;


    var rww_edit_url = gPref.getValue("ext.osds.rww.edit.url");
    if (rww_edit_url)
        DOM.iSel('rww-edit-url').value = rww_edit_url;

    var rww_store_url = gPref.getValue("ext.osds.rww.store.url");
    if (rww_store_url)
        DOM.iSel('rww-store-url').value = rww_store_url;


    var sparql_url = gPref.getValue("ext.osds.sparql.url");
    DOM.iSel('sparql-url').value = sparql_url;

    var sparql_cmd = gPref.getValue("ext.osds.sparql.cmd");
    DOM.qSel('#sparql-cmd #'+sparql_cmd).selected=true;


    yasqe_srv.setValue(gPref.getValue("ext.osds.sparql.query")+"\n");
    yasqe_slinks.setValue(gPref.getValue("ext.osds.super_links.query")+"\n");

    DOM.iSel('super-links-timeout').value = gPref.getValue("ext.osds.super_links.timeout");

    var sponge = gPref.getValue("ext.osds.super-links-sponge");
    if (sponge)
      DOM.qSel('#super-links-sponge #'+sponge).selected = true;

    var sponge_mode = gPref.getValue("ext.osds.super-links-sponge-mode");
    if (sponge_mode)
      DOM.qSel('#super-links-sponge-mode #'+sponge_mode).selected = true;

    var viewer = gPref.getValue("ext.osds.super-links-viewer");
    if (viewer)
      DOM.qSel('#super-links-viewer #'+viewer).selected = true;

    var mode = gPref.getValue("ext.osds.super-links-highlight");
    if (mode)
      DOM.qSel('#super-links-highlight #'+mode).selected = true;

    DOM.iSel('super-links-retries').value = gPref.getValue("ext.osds.super_links.retries");
    DOM.iSel('super-links-retries-timeout').value = gPref.getValue("ext.osds.super_links.retries_timeout");
}



function savePref()
{
   var uiterm_mode = DOM.qSel('#uiterm-mode option:checked').id;
   gPref.setValue("ext.osds.uiterm.mode", uiterm_mode);

   gPref.setValue("ext.osds.pref.user.chk", DOM.iSel('chk_pref_user').checked?"1":"0");

   gPref.setValue("ext.osds.pref.show_action", DOM.iSel('chk_show_action_for_url_with_params').checked?"1":"0");

   gPref.setValue("ext.osds.handle_xml", DOM.iSel('chk_try_handle_xml').checked?"1":"0");
   gPref.setValue("ext.osds.handle_csv", DOM.iSel('chk_try_handle_csv').checked?"1":"0");
   gPref.setValue("ext.osds.handle_json",DOM.iSel('chk_try_handle_json').checked?"1":"0");
   gPref.setValue("ext.osds.handle_all", DOM.iSel('chk_try_handle_all').checked?"1":"0");

   var pref_user = $('#pref_user option:selected').text();
   gPref.setValue("ext.osds.pref.user", pref_user);


   var import_srv = DOM.qSel('#import-srv option:checked').id;
   gPref.setValue("ext.osds.import.srv", import_srv);
   gPref.setValue("ext.osds.import.url", DOM.iSel('import-url').value.trim());


   gPref.setValue("ext.osds.rww.edit.url", DOM.iSel('rww-edit-url').value.trim());
   gPref.setValue("ext.osds.rww.store.url", DOM.iSel('rww-store-url').value.trim());


   var sparql_cmd = DOM.qSel('#sparql-cmd option:checked').id;
   gPref.setValue("ext.osds.sparql.cmd", sparql_cmd);
   gPref.setValue("ext.osds.sparql.url", DOM.iSel('sparql-url').value.trim());

   gPref.setValue("ext.osds.sparql.query", yasqe_srv.getValue());

   gPref.setValue("ext.osds.super_links.query", yasqe_slinks.getValue());

   var timeout = DOM.iSel('super-links-timeout').value.trim();
   gPref.setValue("ext.osds.super_links.timeout", parseInt(timeout, 10));

   var v; 
   v = DOM.qSel('#super-links-sponge option:checked').id;
   gPref.setValue("ext.osds.super-links-sponge", v);

   v = DOM.qSel('#super-links-sponge-mode option:checked').id;
   gPref.setValue("ext.osds.super-links-sponge-mode", v);

   v = DOM.qSel('#super-links-viewer option:checked').id;
   gPref.setValue("ext.osds.super-links-viewer", v);

   v = DOM.qSel('#super-links-highlight option:checked').id;
   gPref.setValue("ext.osds.super-links-highlight", v);

   v = DOM.iSel('super-links-retries').value.trim();
   gPref.setValue("ext.osds.super_links.retries", parseInt(v, 10));

   v = DOM.iSel('super-links-retries-timeout').value.trim();
   gPref.setValue("ext.osds.super_links.retries_timeout", parseInt(v, 10));

   closeOptions();
}



function enableCtrls()
{
    var srv = DOM.qSel('#import-srv option:checked').id;
    var h_url = (new Settings).createDefaultImportCmdFor(srv, DOM.iSel('import-url').value.trim());

    $('#import-url-bcast').show();
    DOM.iSel('import-url').value = h_url;
};



function createSparqlQuery(cmd)
{
    var query = "";
    var uiterm_mode = DOM.qSel('#uiterm-mode option:checked').id;

    switch (cmd) {
      case 'select':
        query = gPref.getSparqlQueryDefault(uiterm_mode);;
        break;
      case 'describe':
        query = "DESCRIBE <{url}> LIMIT 100";

        break;
      case 'construct':
        query = "CONSTRUCT  {<{url}> ?p ?o.   ?s ?p <{url}> .} \n"+
                "WHERE {  {<{url}> ?p ?o} union {?s ?p <{url}> } } LIMIT 100";
        break;
    }
    return query;
};


// ========== Users List ===========
function call_edit_users()
{
    var list = [];
    try {
      var v = gPref.getValue('ext.osds.pref.user.list');
      if (v)
        list = JSON.parse(v);
    } catch(e){}

    $( "#users-edit" )
    load_users_data(list);
    $( "#users-edit" ).dialog({
      resizable: false,
      height:300,
      width:450,
      modal: true,
      buttons: {
        "OK": function() {
          save_users_data();
          load_pref_user();
          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog( "close" );
        }
      }
    });
}


function createUsersRow(v)
{
  if (!v)
    v = "";
  var del = '<button id="users_del" class="users_del">Del</button>';
  return '<tr><td width="16px">'+del+'</td>'
            +'<td><input id="v" style="WIDTH: 98%" value="'+v+'"></td></tr>';
}


function addUsersEmpty()
{
  addUsersItem("");
}

function addUsersItem(v)
{
  $('#users_data').append(createUsersRow(v));
  $('.users_del').button({
    icons: { primary: 'ui-icon-minusthick' },
    text: false
  });
  $('.users_del').click(users_del);
}

function emptyUsers()
{
  var data = $('#users_data>tr');
  for(var i=0; i < data.length; i++) {
    $(data[i]).remove();
  }
}


function users_del(e) {
  //get the row we clicked on
  var row = $(this).parents('tr:first');
  $(row).remove();

  return true;
}

function load_users_data(params)
{
  emptyUsers();

  for(var i=0; i<params.length; i++) {
    addUsersItem(params[i]);
  }

  if (params.length == 0)
    addUsersItem("");
}

function save_users_data()
{
  var list = [];
  var rows = $('#users_data>tr');
  for(var i=0; i < rows.length; i++) {
    var r = $(rows[i]);
    var v = r.find('#v').val();
    if (v.length>0)
       list.push(v);
  }

  gPref.setValue('ext.osds.pref.user.list', JSON.stringify(list, undefined, 2));
}

