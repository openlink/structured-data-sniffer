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

(function () {

var pages = {};
var setting = new Settings();
var ext_url = Browser.api.extension.getURL("page_panel.html");


  Browser.api.webRequest.onBeforeRequest.addListener(
      onBeforeRequestLocal, 
        {types: ["main_frame"], urls: ["file:///*"]}, 
        ["blocking"]);

  function onBeforeRequestLocal(d)
  {
    var chk_all = setting.getValue("ext.osds.handle_all");

    var chk_csv = setting.getValue("ext.osds.handle_csv");
    var handle_csv = (chk_csv && chk_csv==="1");
    var chk_json = setting.getValue("ext.osds.handle_json");
    var handle_json = (chk_json && chk_json==="1");

    var handle = false;
    var could_handle = false;
    var ext = "";

    if (d.url.match(/(.rdf)$/i)) {
      handle = true;
      type = "rdf";
      ext = "rdf";
      could_handle = true;
    }
    else if (d.url.match(/(.owl)$/i)) {
      handle = true;
      type = "rdf";
      ext = "owl";
      could_handle = true;
    }
    else if (d.url.match(/(.ntriples)$/i)) {
      handle = true;
      type = "turtle";
      ext = "ntriples";
      could_handle = true;
    }
    else if (d.url.match(/(.ttl)$/i)) {
      handle = true;
      type = "turtle";
      ext = "ttl";
      could_handle = true;
    }
    else if (d.url.match(/(.n3)$/i)) {
      handle = true;
      type = "turtle";
      ext = "n3";
      could_handle = true;
    }
    else if (d.url.match(/(.jsonld)$/i) ) {
      handle = true;
      type = "jsonld";
      ext = "jsonld";
      could_handle = true;
    }
    else if (d.url.match(/(.json)$/i) ) {
      handle = handle_json;
      type = "json";
      ext = "json";
      could_handle = true;
    }
    else if (handle_csv && d.url.match(/(.csv)$/i) ) {
      handle = handle_csv;
      type = "csv";
      ext = "csv";
      could_handle = true;
    }

    if (chk_all && chk_all!=="1") 
    {
      if (could_handle) {
        pages[d.tabId] = {content:headerContent.value, 
                          url:d.url,
                          type,
                          ext
                         };
      } else {
        delete pages[d.tabId];
      }
    } 
    else  if (handle)  {
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
            if (pref_user && pref_user.length> 0) {
              details.requestHeaders.push({name:"On-Behalf-Of", value:pref_user})
/***
              var header_acah = null;
              for (var h of details.requestHeaders) {
                if (h.name && h.name.toLowerCase() === "access-control-allow-headers") {
                  header_acah = h;
                  break;
                }
              }

              if (header_acah && header_acah.value.trim().length > 0) {
                header_acah.value += ', On-Behalf-Of';
              }
              else {
                details.requestHeaders.push({name:"Access-Control-Allow-Headers", value:"On-Behalf-Of"});
              }
***/
            }
          }
          
          return {"requestHeaders": details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);


  Browser.api.webRequest.onHeadersReceived.addListener(
  	onHeadersReceived, 
  	  {types: ["main_frame"], urls: ["<all_urls>"]}, 
  	  ["responseHeaders", "blocking"]);


  function onHeadersReceived(d)
  {
    //console.log(d);
    if (d.method && d.method!=="GET")
      return;

    var headerContent = null;
    for (var header of d.responseHeaders) {
      if (header.name && header.name.match(/^content-type/i)) {
        headerContent = header;
        contentType = header.value;
        break;
      }
    }

    var chk_all = setting.getValue("ext.osds.handle_all");

    var chk_xml = setting.getValue("ext.osds.handle_xml");
    var chk_csv = setting.getValue("ext.osds.handle_csv");
    var chk_json = setting.getValue("ext.osds.handle_csv");
    var handle_xml = (chk_xml && chk_xml==="1");
    var handle_csv = (chk_csv && chk_csv==="1");
    var handle_json = (chk_json && chk_json==="1");

    var handle = false;
    var v_cancel = false;
    var type = null;
    var ext = "";
    var content_type = null;
    var could_handle = false;

    if (headerContent) {

      if (headerContent.value.match(/\/(turtle)/)) {
        handle = true;
        type = "turtle";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(n3)/)) {
        handle = true;
        type = "turtle";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(n-triples)/)) {
        handle = true;
        type = "turtle";
        v_cancel = true;
        header.value = "text/plain";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(json\+ld)/)) {
        handle = true;
        type = "jsonld";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(ld\+json)/)) {
        handle = true;
        type = "jsonld";
        could_handle = true;
      }
      //application/rdf+xml
      else if (headerContent.value.match(/\/(rdf\+xml)/)) {
        handle = true;
        v_cancel = true;
        type = "rdf";
        headerContent.value = "text/plain";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(csv)/)) {
        handle = handle_csv;
        type = "csv";
        could_handle = true;
      }
      else if (headerContent.value.match(/\/(sparql\-results\+json)/) || headerContent.value.match(/(application\/json)/) ) {
        handle = handle_json;
        type = "json";
        could_handle = true;
      }
      else {
        content_type = headerContent.value;
      }
    }

    if (!could_handle && (content_type===null || content_type.match(/(application\/xml)/) 
                                          || content_type.match(/(text\/xml)/) 
                                          || content_type.match(/(text\/plain)/)
                                          || content_type.match(/(application\/octet-stream)/)
                     )) {
        var url_path = (new URL(d.url)).pathname;
        if (url_path.endsWith(".owl")) {
          handle = true;
          type = "rdf";
          ext = "owl";
          could_handle = true;
        }
        else if (url_path.endsWith(".rdf")) {
          handle = true;
          type = "rdf";
          ext = "rdf";
          could_handle = true;
        }
        else if (url_path.endsWith(".ntriples")) {
          handle = true;
          type = "turtle";
          ext = "ntriples";
          could_handle = true;
        }
        else if (url_path.endsWith(".ttl")) {
          handle = true;
          type = "turtle";
          ext = "ttl";
          could_handle = true;
        }
        else if (url_path.endsWith(".csv")) {
          handle = handle_csv;
          type = "csv";
          ext = "csv";
          could_handle = true;
        }
        else if (url_path.endsWith(".json")) {
          handle = handle_json;
          type = "json";
          ext = "json";
          could_handle = true;
        }
        else if (url_path.endsWith(".jsonld")) {
          handle = true;
          type = "jsonld";
          ext = "jsonld";
          could_handle = true;
        }
    }

    if (!could_handle && content_type!==null 
        && (content_type.match(/(application\/xml)/) || content_type.match(/(text\/xml)/) )) 
    {
        handle = handle_xml;
        type = "xml";
        v_cancel = true;
        could_handle = true;
    }


    var url = new URL(d.url);
    if (url.hash === "#osds")
    {
      could_handle = false;
      handle = false;
    }


    if (chk_all && chk_all!=="1") 
    {
      if (could_handle) {
        pages[d.tabId] = {content:headerContent.value, 
                          url:d.url,
                          type,
                          ext
                         };
      } else {
        delete pages[d.tabId];
      }
    } 
    else  if (handle)  {
        var _url = Browser.api.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+type+"&ext="+ext);
        if (Browser.isEdgeWebExt) {
          return { redirectUrl: _url };
        }
        else if (Browser.isFirefoxWebExt) {
          Browser.api.tabs.update(d.tabId, { url: _url });
//don't show save dialog      
          return { cancel: true };
        }
        else {
          Browser.api.tabs.update(d.tabId, { url: _url });
          return { cancel: true };
        }
    }
  }


/**** End WebRequest ****/




var tabsBrowserAction = {};

function handleCloseTab(tabId, info) {
  delete tabsBrowserAction[tabId];
}

function handleOpenTab(tabId) {
  tabsBrowserAction[tabId] = false;
}

function storeBrowserAction(tabId, show) {
  tabsBrowserAction[tabId] = show;
}

function getBrowserActionState(tabId) {
  return tabsBrowserAction[tabId];
}


Browser.api.tabs.onRemoved.addListener(handleCloseTab);
Browser.api.tabs.onUpdated.addListener(handleOpenTab);


function setPageAction(tabId, show)
{
  storeBrowserAction(tabId, show);

  if (Browser.isFirefoxWebExt || Browser.isChromeWebExt) {
    if (show)
      Browser.api.browserAction.enable(tabId);
    else
      Browser.api.browserAction.disable(tabId);
  }
  else {
    if (show)
      Browser.api.pageAction.show(tabId);
    else
      Browser.api.pageAction.hide(tabId);
  }
}


Browser.api.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
  try {
    if (request.property === "status")
    {
      var doc_URL = request.doc_URL;
      var tabId = sender.tab.id;
      var show_action = request.data_exists;
      var sparql_pattern = /\/sparql\/?$/gmi;
      var url = new URL(doc_URL);
      var setting = new Settings();
      var action_for_params =  setting.getValue("ext.osds.pref.show_action");
      var settings = new Settings();
      var chk_all = setting.getValue("ext.osds.handle_all");

      if (doc_URL && url.search.length>0
          && (sparql_pattern.test(doc_URL) || action_for_params) )
      {
        show_action = true;
      }

      setPageAction(tabId, show_action);
      
      if (!show_action && chk_all && chk_all!=="1") {
          var tab = pages[tabId];
          if (tab && tab.url === request.doc_URL)
            setPageAction(tabId, true);
      }
    }
    else if (request.cmd === "getPref")
    {
      var val = '';
      var settings = new Settings();
      if (request.key)
        val = settings.getValue(request.key)
      sendResponse({'cmd': request.cmd, 'key':request.key, 'val':val});
    }
    else if (request.cmd === "openIfHandled")
    {
      var tabId = request.tabId;
      var tab = pages[request.tabId];
      if (tab) {
        var url = Browser.api.extension.getURL("page_panel.html?url="+encodeURIComponent(tab.url)+"&type="+tab.type+"&ext="+tab.ext);
        Browser.openTab(url);
        sendResponse({'cmd': request.cmd, 'opened':true});
      } 
      else {
        sendResponse({'cmd': request.cmd, 'opened':false});
      }
    }
    else if (request.cmd === "actionSuperLinks")
    {
      var curTab = await getCurTab();
      if (curTab.length > 0)
        actionSuperLinks(null, curTab[0]);
    }
/**
    else
    {
      sendResponse({}); // stop
    }
**/
  } catch(e) {
    console.log("OSDS: onMsg="+e);
  }

});


////////// Context Menu

if (Browser.isFirefoxWebExt || Browser.isChromeWebExt) {
  try {
    Browser.api.browserAction.disable();

    Browser.api.contextMenus.create(
        {"title": "Super Links", 
         "contexts":["page"],
         "onclick": actionSuperLinks});
  
  } catch(e) {}
}

var gSuperLinks = null;

async function actionSuperLinks(info, tab) {
  var msg = 
       { 
         throbber_show: function (txt) {
            Browser.api.tabs.sendMessage(tab.id, { property: 'super_links_msg_show', message: txt });
         },
         throbber_hide: function () {
            Browser.api.tabs.sendMessage(tab.id, { property: 'super_links_msg_hide' });
         }
       }

  var slinks = new SuperLinks(tab.url, tab.id, msg);
  gSuperLinks = slinks;

  var rc = await slinks.check_login();

  if (rc) {
    var data = await slinks.request_superlinks();
    if (data) {
      slinks.apply_super_links(data);
      gSuperLInks = null;
    }
  }
}



//Chrome API
//wait data from extension
Browser.api.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
  try {
    if (request.cmd === "close_oidc_web")
    {
      var curWin = await getCurWin();
      var curTab = await getCurTab();
      if (request.url && curTab.length > 0 && curTab[0].windowId === curWin.id
          && curTab[0].url === request.url) {
        Browser.api.tabs.remove(curTab[0].id);
      }

    }
    else if (request.cmd === "close_oidc_web_slogin")
    {
      var curWin = await getCurWin();
      var curTab = await getCurTab();
      if (request.url && curTab.length > 0 && curTab[0].windowId === curWin.id
          && curTab[0].url === request.url) {
        Browser.api.tabs.remove(curTab[0].id);
      }

      if (gSuperLinks) {
        var slinks = gSuperLinks;
        if (slinks.state) {
          slinks.reexec();
        } else {
          gSuperLInks = null;
        }
      }

    }
    
  } catch(e) {
    console.log("OSDS: onMsg="+e);
  }

});



})();
