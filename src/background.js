/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2018 OpenLink Software
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


if (Browser.isFirefoxWebExt || Browser.isChromeWebExt) {
  try {
    Browser.api.browserAction.disable();
  } catch(e) {}
}


async function getCurWin()
{
  if (Browser.isChromeWebExt) {
    return new Promise(function (resolve, reject) {
      Browser.api.windows.getCurrent({}, (w) => {
        resolve(w)
      });
    })
  } else {
    return Browser.api.windows.getCurrent({});
  }
}

async function getCurTab()
{
  if (Browser.isChromeWebExt) {
    return new Promise(function (resolve, reject) {
      Browser.api.tabs.query({active:true, currentWindow:true}, (t) => {
        resolve(t)
      });
    })
  } else {
    return Browser.api.tabs.query({active:true, currentWindow:true});
  }
}


//Chrome API
//wait data from extension
Browser.api.runtime.onMessage.addListener(async function(request, sender, sendResponse)
{
  try {
    if (request.property == "status")
    {
      var doc_URL = request.doc_URL;
      var show_action = request.data_exists;
      var sparql_pattern = /\/sparql\/?$/gmi;
      var url = new URL(doc_URL);
      var setting = new Settings();
      var action_for_params =  setting.getValue("ext.osds.pref.show_action");

      if (doc_URL && url.search.length>0
          && (sparql_pattern.test(doc_URL) || action_for_params) )
      {
        show_action = true;
      }                                            

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
    else if (request.cmd === "close_oidc_web")
    {
      var curWin = await getCurWin();
      var curTab = await getCurTab();
      if (request.url && curTab.length > 0 && curTab[0].windowId === curWin.id
          && curTab[0].url === request.url) {
        Browser.api.tabs.remove(curTab[0].id);
      }
    }
    else
    {
      sendResponse({}); /* stop */
    }
  } catch(e) {
    console.log("OSDS: onMsg="+e);
  }

});

