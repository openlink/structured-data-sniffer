/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015 OpenLink Software
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


$(function(){
	// Tabs
	$('#tabs').tabs();

        loadPref();

        $('#import-srv').change(function() {
            setTimeout(enableCtrls,200);
        });

        $('#sparql-cmd').change(function() {
          var cmd = $('#sparql-cmd option:selected').attr('id');
          $('#sparql-query').val(createSparqlQuery(cmd));
        });

        $('#OK_btn').click(savePref);
        $('#Cancel_btn').click(function() { window.close(); });

        $('#import-set-def').click(setImportDefaults);
        $('#rww-set-def').click(setRWWDefaults);
        $('#sparql-set-def').click(setSparqlDefaults);


        $('#osds-site').click(function() { window.open('http://osds.openlinksw.com'); });

        enableCtrls();
      
        $('#ext_ver').text('Version: '+ chrome.runtime.getManifest().version);
});



function setImportDefaults() 
{
    setting = new Settings();
    $('#'+setting.def_import_srv,'#import-srv').attr('selected','selected');
    var h_url = createImportURL(setting.def_import_srv, setting.def_import_url.trim());
    $('#import-url').val(h_url);
    enableCtrls();
};

function setRWWDefaults() 
{
    setting = new Settings();
    $('#rww-url').val(setting.def_rww_url);
};

function setSparqlDefaults() 
{
    setting = new Settings();
    $('#'+setting.def_sparql_cmd,'#sparql-cmd').attr('selected','selected');
    $('#sparql-url').val(setting.def_sparql_url);
    $('#sparql-query').val(createSparqlQuery(setting.def_sparql_cmd));
};



function loadPref() 
{
    setting = new Settings();
    var uiterm_mode = setting.getValue("ext.osds.uiterm.mode"); 
    $('#'+uiterm_mode,'#uiterm-mode').attr('selected','selected');


    var import_url = setting.getValue("ext.osds.import.url");
    var import_srv = setting.getValue("ext.osds.import.srv"); 

    $('#'+import_srv,'#import-srv').attr('selected','selected');
    $('#import-url').val(import_url);


    var rww_url = setting.getValue("ext.osds.rww.url");
    if (rww_url)
        $('#rww-url').val(rww_url);


    var sparql_url = setting.getValue("ext.osds.sparql.url");
    $('#sparql-url').val(sparql_url);

    var sparql_cmd = setting.getValue("ext.osds.sparql.cmd"); 
    $('#'+sparql_cmd,'#sparql-cmd').attr('selected','selected');

    var sparql_query = setting.getValue("ext.osds.sparql.query");
    $('#sparql-query').val(sparql_query);
}  



function savePref() 
{
   setting = new Settings();
   var uiterm_mode = $('#uiterm-mode option:selected').attr('id');
   setting.setValue("ext.osds.uiterm.mode", uiterm_mode);


   var import_srv = $('#import-srv option:selected').attr('id');
   setting.setValue("ext.osds.import.srv", import_srv);
   setting.setValue("ext.osds.import.url", $('#import-url').val().trim());


   setting.setValue("ext.osds.rww.url", $('#rww-url').val().trim());


   var sparql_cmd = $('#sparql-cmd option:selected').attr('id');
   setting.setValue("ext.osds.sparql.cmd", sparql_cmd);
   setting.setValue("ext.osds.sparql.url", $('#sparql-url').val().trim());
   setting.setValue("ext.osds.sparql.query", $('#sparql-query').val().trim());

//   chrome.runtime.sendMessage({osds_settings: "changed"});

   close();
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
    setting = new Settings();
    var query = "";

    switch (cmd) {
      case 'select':
        query = setting.def_sparql_qry;
        break;
      case 'describe':
        query = "DESCRIBE <{url}> ";

        break;
      case 'construct':
        query = "CONSTRUCT  {<{url}> ?p ?o.   ?s ?p <{url}> .} \n"+
                "WHERE {  {<{url}> ?p ?o} union {?s ?p <{url}> } }";
        break;
    }
    return query;
};

