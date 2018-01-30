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



//Chrome API
//wait data from extension
Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
  try {
    if (request.property == "status")
    {
      var doc_URL = request.doc_URL;
      var show_action = request.data_exists;
      var sparql_pattern = /\/sparql\/?$/gmi;
      var url = new Uri(doc_URL);
      var setting = new Settings();
      var action_for_params =  setting.getValue("ext.osds.pref.show_action");

      if (doc_URL && url.queryPairs.length>0
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
    else
    {
      sendResponse({}); /* stop */
    }
  } catch(e) {
    console.log("OSDS: onMsg="+e);
  }

});




