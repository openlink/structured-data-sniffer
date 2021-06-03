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

var Browser = {
    isChromeWebExt: false,
    isFirefoxWebExt: false,
    isEdgeWebExt: true,

    api: null,

    openTab : function(uri, tab_index) {
      var win_url = document.location.href;
      var isActionPanel = String(win_url).endsWith("panel.html");

      if (Browser.isEdgeWebExt) {
        if (uri.length<=2083) {
          //2083 chars is limit for url for Browser.api.tabs.create
          if (tab_index!==undefined) 
            Browser.api.tabs.create({url:uri, index:tab_index+1 });
          else
            Browser.api.tabs.getCurrent(
              function(tab) {
                var id;
                if (tab!==undefined)
                  id = Browser.api.tabs.create({url:uri, index:tab.index+1 });
                else
                  id = Browser.api.tabs.create({url:uri});
              }
            )
        } 
        else if (isActionPanel) {
          // if it was call from ActionPanel, send command to sniffer for open window
          Browser.api.tabs.query({active:true, currentWindow:true}, function(tabs) {
            if (tabs.length > 0) {
              Browser.api.tabs.sendMessage(tabs[0].id, {
                  property: 'open_tab',
                  url: uri
                }, 
                function(response) {
                });
            }
          });
        } 
        else {
          // if it is MIME handle view, so simple open new window
          window.open(uri);
        }
      }
      else {
        window.open(uri);
      }
    },

    throbber : 'R0lGODlhEAAQAPMAADMzM0xMTOXl5WZmZszMzH9/f7KyspmZmUxMTH9/f5mZmbKysszMzOXl5f///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCgAOACwAAAAAEAAQAAAErdA555xzADjnnIPOOeeccwAA4Bx0zjnnXAgOAACgE8I551wIITgAgRNCCOecCyEE6JxzQgjhnHMuwOCcc84J4ZxzAw7nnHPOOecIcXCMMZxzzjnnCIGEjDGGc8455xwkhBA3hnPOOeegc44Q55wrxTkHnXPGOOecK6UU6JxzxhjjnHOlwFLcOc4YY5xzDrpS3DnnOGOcc9A555w75xznnIPOOeecc+4c5xx0zrkIACH5BAkKAA4ALAAAAAAQABAAAASt0DnnnHMhOOecg84555xzIYTgHHTOOefcGC6EEKADwDnn3BhjuACDAwAA55wbYwzonHMAAOCcc27A4ZxzzgHgnHMFFuecc84554RwsJRSnHPOOeeEgEKUUopzzjnnHBRCCFeKc84556BzTgjnnDvHOQedc4Q455w75xzonHOEEOKcc+fAc5wxjhBCnHMOunOcMcY4Qpxz0DnnnDPGGOecg84555xzzhjnHHTOuQgAIfkECQoADgAsAAAAABAAEAAABK3QOeecc2M455yDzjnnnHNjjOEcdM4551wpbowxoAPAOedcKaW4AYcDAADnnCulFOiccwAA4JxzrsDinHPOAeCccwce55xzzjnnAHDwnHOcc8455wCAAJxzjnPOOeccBAAAd45zzjnnoHMOAOecM8Y5B51zQjjnnDPGGOicc0II4ZxzxkBjHCFOCCGccw46YxwhhDghnHPQOeecI4QQ55yDzjnnnHOOEOccdM65CAAh+QQJCgAOACwAAAAAEAAQAAAErdA555xzpTjnnIPOOeecc6WU4hx0zjnn3DmulFKgG8M559w557gCixtjDOecO+cc6JxzY4zhnHPuwOOcc86N4ZxzBhrnnHPOOedCcNAYY5xzzjnnQoAhGGOMc8455xwMIQRnjHPOOeegcy4E55wjxDkHnXMAOOecI4QQ6JxzAADgnHOEQEKcEA4AAJxzDjpCnBBCOACcc9A555wTQgjnnIPOOeecc04I5xx0zrkIACH5BAkKAA4ALAAAAAAQABAAAASt0DnnnHPnOOecg84555xz55zjHHTOOeecMe6cc6ArxTnnnDHGuAOPK6UU55wzxhjonHOllOKcc85A45xzzpXinHMEEuecc84558ZwkBBCnHPOOefGgGMQQohzzjnnHBxjDEeIc84556BzbgznnBPCOQedcyE455wTQgjonHMhhOCcc0JAIRwALoQQnHMOOiEcAAC4EJxz0DnnnAMAAOecg84555xzDgDnHHTOuQgAIfkECQoADgAsAAAAABAAEAAABK3QOeecc8Y455yDzjnnnHPGGOMcdM455xwhzhhjoDvHOeccIYQ4A4075xznnCOEEOicc+ec45xzjkDinHPOneOccwIK55xzzjnnSnFQCCGcc84550qBpQghhHPOOeccLKUUJ4RzzjnnoHOuFOecA8A5B51zYzjnnAMAAOicc2OM4ZxzAEAAXAhujDGccw46AFwIIbgxnHPQOeecCyEE55yDzjnnnHMuBOccdM65CAAh+QQJCgAOACwAAAAAEAAQAAAErdA555xzhDjnnIPOOeecc4QQ4hx0zjnnnBCOEEKgM8Y555wQQjgCiTPGGOecE0II6JxzxhjjnHNOQOGcc84Z45xzAALnnHPOOefOcRAAAJxzzjnnzoHnAACAc8455xw85xwHgHPOOeegc+4c55wLwTkHnXOlOOecCyEE6JxzpZTinHMhwBDcGK6UUpxzDroQ3BhjuFKcc9A555wbYwznnIPOOeecc24M5xx0zrkIACH5BAkKAA4ALAAAAAAQABAAAASt0DnnnHNCOOecg84555xzQgjhHHTOOeccAE4IIaAjxDnnHAAAOAGFI4QQ55wDAADonHOEEOKccw5A4JxzzhHinHMBBuecc84554xxMIQQnHPOOeeMgcaEEIJzzjnnHDTGGBeCc84556BzzhjnnBvDOQedc+c455wbYwzonHPnnOOcc2PAMVwp7pxznHMOujFcKaW4c5xz0DnnnCulFOecg84555xzrhTnHHTOuQgAOw=='

}

try {
  Browser.api = (Browser.isChromeWebExt) ? chrome : browser;
} catch(e) {}
