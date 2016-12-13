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



if (Browser.isChromeAPI) 
{
  var setting = new Settings();
  var _r = {};
  var ext_url = Browser.api.extension.getURL("page_panel.html");

  function s_startWith(str, val) 
  {
     return str.lastIndexOf(val, 0) === 0;
  }


  Browser.api.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          var chk = setting.getValue('ext.osds.pref.user.chk');
          if (chk && chk==="1") {
            var pref_user = setting.getValue('ext.osds.pref.user');
            if (pref_user && pref_user.length> 0)
              details.requestHeaders.push({name:"On-Behalf-Of", value:pref_user})
          }
          return {"requestHeaders": details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);


  Browser.api.webRequest.onHeadersReceived.addListener(
  	onHeadersReceived, {types: ["main_frame"], urls: ["<all_urls>"]}, ["responseHeaders", "blocking"]);


  function onHeadersReceived(d) 
  {
    //console.log(d);
    
    for (var i in d.responseHeaders) {
        var header = d.responseHeaders[i];
        var handle = false;
        var type = null;

        if (header.name && header.name.match(/content-type/i)) {
          if (header.value.match(/\/(turtle)/)) {
            handle = true;
            type = "turtle"
          }
          else if (header.value.match(/\/(n3)/)) {
            handle = true;
            type = "turtle"
          }
          else if (header.value.match(/\/(json\+ld)/)) {
            handle = true;
            type = "jsonld"
          }
          else if (header.value.match(/\/(ld\+json)/)) {
            handle = true;
            type = "jsonld"
          }
//application/rdf+xml
          else if (header.value.match(/\/(rdf\+xml)/)) {
            handle = true;
            type = "rdf"
          }
        }

        if (handle)
          {
            var _url = Browser.api.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+type);
            if (Browser.isEdgeWebExt) {
              return { redirectUrl: _url };
            }
            else if (Browser.isFirefoxWebExt) {
              Browser.api.tabs.update(d.tabId, { url: _url });
//don't show save dialog      return { cancel: true };
              return { cancel: false };
            } 
            else {
              Browser.openTab(_url);
              return { cancel: false };
            }
          }
    }
  }




}