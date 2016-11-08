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

var gPref = null;

$(function(){
	// Tabs

	gPref = new Settings();

        $("#revert-confirm").hide();
        $("#users-edit").hide();
        $('#users_add').click(addUsersEmpty);
        $('#users_add').button({
          icons: { primary: 'ui-icon-plusthick' },
          text: false 
        });


	$('#tabs').tabs();

        loadPref();

        $('#uiterm-mode').change(function() {
          var cmd = $('#sparql-cmd option:selected').attr('id');
          $('#sparql-query').val(createSparqlQuery(cmd));
        });

        $('#import-srv').change(function() {
            setTimeout(enableCtrls,200);
        });

        $('#sparql-cmd').change(function() {
          var cmd = $('#sparql-cmd option:selected').attr('id');
          $('#sparql-query').val(createSparqlQuery(cmd));
        });

        $('#OK_btn').click(savePref);
        $('#Cancel_btn').click(closeOptions);

        $('#import-set-def').click(setImportDefaults);
        $('#rww-set-def').click(setRWWDefaults);
        $('#sparql-set-def').click(setSparqlDefaults);

        $('#call_edit_users').click(call_edit_users);


        enableCtrls();

	if (Browser.isFirefoxSDK)
          jQuery('#ext_ver').text('Version: '+ self.options.ver);
        else
          $('#ext_ver').text('Version: '+ Browser.api.runtime.getManifest().version);

});


function closeOptions() 
{
    if (Browser.isChromeAPI && Browser.isFirefoxWebExt) {
      Browser.api.tabs.getCurrent(function(tab) {
        Browser.api.tabs.remove(tab.id);
      });
    } else {
      if (Browser.isFirefoxSDK)
        self.port.emit("close", "");
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

          $('#'+gPref.def_import_srv,'#import-srv').attr('selected','selected');
          var h_url = createImportURL(gPref.def_import_srv, gPref.def_import_url.trim());
          $('#import-url').val(h_url);
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

          $('#rww-store-url').val("");
          $('#rww-edit-url').val(gPref.def_rww_edit_url);

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

          $('#'+gPref.def_sparql_cmd,'#sparql-cmd').attr('selected','selected');
          $('#sparql-url').val(gPref.def_sparql_url);
          $('#sparql-query').val(createSparqlQuery(gPref.def_sparql_cmd));

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
    $('#'+uiterm_mode,'#uiterm-mode').attr('selected','selected');

    var chk_user = gPref.getValue("ext.osds.pref.user.chk");
    if (chk_user && chk_user==="1")
      $("#chk_pref_user").attr('checked','checked');

    load_pref_user();

    var import_url = gPref.getValue("ext.osds.import.url");
    var import_srv = gPref.getValue("ext.osds.import.srv"); 

    $('#'+import_srv,'#import-srv').attr('selected','selected');
    $('#import-url').val(import_url);


    var rww_edit_url = gPref.getValue("ext.osds.rww.edit.url");
    if (rww_edit_url)
        $('#rww-edit-url').val(rww_edit_url);

    var rww_store_url = gPref.getValue("ext.osds.rww.store.url");
    if (rww_store_url)
        $('#rww-store-url').val(rww_store_url);


    var sparql_url = gPref.getValue("ext.osds.sparql.url");
    $('#sparql-url').val(sparql_url);

    var sparql_cmd = gPref.getValue("ext.osds.sparql.cmd"); 
    $('#'+sparql_cmd,'#sparql-cmd').attr('selected','selected');

    var sparql_query = gPref.getValue("ext.osds.sparql.query");
    $('#sparql-query').val(sparql_query);
}  



function savePref() 
{
   var uiterm_mode = $('#uiterm-mode option:selected').attr('id');
   gPref.setValue("ext.osds.uiterm.mode", uiterm_mode);

   gPref.setValue("ext.osds.pref.user.chk", $('#chk_pref_user').is(':checked')?"1":"0");

//   gPref.setValue("ext.osds.pref.user", $('#pref_user').val().trim());

   var pref_user = $('#pref_user option:selected').text();
   gPref.setValue("ext.osds.pref.user", pref_user);


   var import_srv = $('#import-srv option:selected').attr('id');
   gPref.setValue("ext.osds.import.srv", import_srv);
   gPref.setValue("ext.osds.import.url", $('#import-url').val().trim());


   gPref.setValue("ext.osds.rww.edit.url", $('#rww-edit-url').val().trim());
   gPref.setValue("ext.osds.rww.store.url", $('#rww-store-url').val().trim());


   var sparql_cmd = $('#sparql-cmd option:selected').attr('id');
   gPref.setValue("ext.osds.sparql.cmd", sparql_cmd);
   gPref.setValue("ext.osds.sparql.url", $('#sparql-url').val().trim());
   gPref.setValue("ext.osds.sparql.query", $('#sparql-query').val().trim());

   if (Browser.isFirefoxSDK)
     self.port.emit("close", {osds_pref_user:pref_user});

   closeOptions();
}



function enableCtrls() 
{
    var srv = $('#import-srv option:selected').attr('id');
    var h_url = createImportURL(srv, $('#import-url').val().trim());

    $('#import-url-bcast').show();
    $('#import-url').val(h_url);
};


function createImportURL(srv, _url) 
{
    var url = new Uri(_url);
    var h_url = "";

    switch (srv) {
      case 'describe':
        h_url = url.setProtocol("http").setPath('/describe/').setQuery('?url={url}&sponger:get=add').setAnchor('').toString(); 
        break;
      case 'describe-ssl':
        h_url = url.setProtocol("https").setPath('/describe/').setQuery('?url={url}&sponger:get=add').setAnchor('').toString(); 
        break;
      case 'about':
	h_url = url.setProtocol("http").setPath('/about/html/').setQuery('').setAnchor('').toString();
        break;
      case 'about-ssl':
	h_url = url.setProtocol("https").setPath('/about/html/').setQuery('').setAnchor('').toString();
        break;
      case 'ode':
	h_url = url.setProtocol("http").setPath('/ode/').setQuery('?uri=').setAnchor('').toString();
        break;
      case 'ode-ssl':
	h_url = url.setProtocol("https").setPath('/ode/').setQuery('?uri=').setAnchor('').toString();
        break;
      case 'custom':
        h_url = _url;
        break;
    }
    return h_url;
};


function createSparqlQuery(cmd) 
{
    var query = "";
    var uiterm_mode = $('#uiterm-mode option:selected').attr('id');

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