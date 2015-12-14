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

        $('#OK_btn').click(savePref);
        $('#Cancel_btn').click(function() { window.close(); });

        $('#import-set-def').click(setImportDefaults);

        $('#osds-site').click(function() { window.open('http://osds.openlinksw.com'); });

        enableCtrls();
      
        $('#ext_ver').text('Version: '+ chrome.runtime.getManifest().version);
});



function setImportDefaults() 
{
    $('#describe','#import-srv').attr('selected','selected');
    var url = new Uri($('#import-url').val().trim());
    var h_url = url.setProtocol('http').setHost('linkeddata.uriburner.com').toString(); 
    if (h_url)
      $('#import-url').val(h_url);
    enableCtrls();
};



function loadPref() 
{
    var import_url = getItem("ext.osds.import.url");
    var import_srv = getItem("ext.osds.import.srv"); 

    if (import_srv)
        $('#'+import_srv,'#import-srv').attr('selected','selected');

    if (import_url)
        $('#import-url').val(import_url);

    var uiterm_mode = getItem("ext.osds.uiterm.mode"); 

    if (uiterm_mode)
        $('#'+uiterm_mode,'#uiterm-mode').attr('selected','selected');
}  



function savePref() 
{
   var import_srv = $('#import-srv option:selected').attr('id');
   setItem ("ext.osds.import.srv", import_srv);

   var h_url = createImportURL(import_srv, $('#import-url').val().trim());

   setItem ("ext.osds.import.url", h_url);

   var uiterm_mode = $('#uiterm-mode option:selected').attr('id');
   setItem ("ext.osds.uiterm.mode", uiterm_mode);

//   chrome.runtime.sendMessage({osds_settings: "changed"});

   close();
}



function getItem(key) 
{
    return localStorage.getItem(key);
}

function setItem(key, value) 
{
    localStorage.removeItem(key);
    localStorage.setItem(key, value);
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
        break;
    }
    return h_url;
};


