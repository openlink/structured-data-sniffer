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



if (Browser.isChromeAPI)
{
  var setting = new Settings();
  var _r = {};
  var ext_url = Browser.api.extension.getURL("page_panel.html");

  function s_startWith(str, val)
  {
     return str.lastIndexOf(val, 0) === 0;
  }

  Browser.api.webRequest.onBeforeRequest.addListener(onBeforeRequestLocal, {types: ["main_frame"], urls: ["file:///*"]}, ["blocking"]);

  function onBeforeRequestLocal(d)
  {
    var handle = false;
    var ext = "";
    if (d.url.match(/(.rdf)$/i)) {
      handle = true;
      type = "rdf";
      ext = "rdf";
    }
    else if (d.url.match(/(.owl)$/i)) {
      handle = true;
      type = "rdf";
      ext = "owl";
    }
    else if (d.url.match(/(.ntriples)$/i)) {
      handle = true;
      type = "turtle";
      ext = "ntriples";
    }
    else if (d.url.match(/(.ttl)$/i)) {
      handle = true;
      type = "turtle";
      ext = "ttl";
    }
    else if (d.url.match(/(.n3)$/i)) {
      handle = true;
      type = "turtle";
      ext = "n3";
    }
    else if (d.url.match(/(.jsonld)$/i) ) {
      handle = true;
      type = "jsonld";
      ext = "jsonld";
    }

    if (handle) {
      var _url = Browser.api.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+type+"&ext="+ext);
      Browser.api.tabs.update(d.tabId, { url: _url });
      return { cancel: false };
    }
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
    if (d.method && d.method!=="GET")
      return;

    var handle = false;
    var v_cancel = false;
    var type = null;
    var ext = "";
    var content_type = null;

    for (var i in d.responseHeaders) {
        var header = d.responseHeaders[i];

        if (header.name && header.name.match(/content-type/i)) {
          if (header.value.match(/\/(turtle)/)) {
            handle = true;
            type = "turtle";
          }
          else if (header.value.match(/\/(n3)/)) {
            handle = true;
            type = "turtle";
          }
          else if (header.value.match(/\/(n-triples)/)) {
            handle = true;
            type = "turtle";
            v_cancel = true;
            header.value = "text/plain";
          }
          else if (header.value.match(/\/(json\+ld)/)) {
            handle = true;
            type = "jsonld";
          }
          else if (header.value.match(/\/(ld\+json)/)) {
            handle = true;
            type = "jsonld";
          }
          //application/rdf+xml
          else if (header.value.match(/\/(rdf\+xml)/)) {
            handle = true;
            v_cancel = true;
            type = "rdf";
            header.value = "text/plain";
          }
          else {
            content_type = header.value;
          }
        }

        if (handle)
          break;
      }

      if (!handle && (content_type===null || content_type.match(/(application\/xml)/) 
                                          || content_type.match(/(text\/xml)/) 
                                          || content_type.match(/(text\/plain)/)
                                          || content_type.match(/(application\/octet-stream)/)
                     )) {
        var url_path = new Uri(d.url).path();
        if (url_path.endsWith(".owl")) {
          handle = true;
          type = "rdf";
          ext = "owl";
        }
        else if (url_path.endsWith(".rdf")) {
          handle = true;
          type = "rdf";
          ext = "rdf";
        }
        else if (url_path.endsWith(".ntriples")) {
          handle = true;
          type = "turtle";
          ext = "ntriples";
        }
        else if (url_path.endsWith(".ttl")) {
          handle = true;
          type = "turtle";
          ext = "ttl";
        }
        else if (url_path.endsWith(".n3")) {
          handle = true;
          type = "turtle";
          ext = "n3";
        }
      }

      if (!handle && content_type!==null && (content_type.match(/(application\/xml)/) 
                      || content_type.match(/(text\/xml)/) )) 
      {
          handle = true;
          type = "xml";
          v_cancel = true;
      }

      if (handle)  {
          var _url = Browser.api.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+type+"&ext="+ext);
          if (Browser.isEdgeWebExt) {
            return { redirectUrl: _url };
          }
          else if (Browser.isFirefoxWebExt) {
            Browser.api.tabs.update(d.tabId, { url: _url });
//don't show save dialog      return { cancel: true };
            return { cancel: false };
          }
          else {
            if (v_cancel)
              Browser.api.tabs.update(d.tabId, { url: _url });
            else
              Browser.openTab(_url);
            return { "responseHeaders":d.responseHeaders };
//              return { cancel: false};
          }
      }
  }


}
