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

const prefix = "oidc-webid:";

window.addEventListener("message", recvMessage, false);

async function recvMessage(event)
{
  var ev_data;
  var session = null;
  var idp = null;

  if (!String(event.data).startsWith("oidc-webid:"))
    return;

  var s_session = localStorage.getItem('oidc.session');
  try {
    session = JSON.parse(s_session);
  } catch(e) {
  }

  if (session)
    idp = session.issuer;

  if (session && idp) {
    var s_client = localStorage.getItem('oidc.clients.'+idp);

    if (s_client)
      await save_data('oidc.clients.'+idp, s_client);

    if (session) {
      await save_data('oidc.session', s_session);
      Browser.api.runtime.sendMessage({cmd:'store_updated', key:'oidc.session'});
    }
  }    


  setTimeout(function (){
     Browser.api.runtime.sendMessage({cmd:'close_oidc_web', url: document.location.href});
  }, 1500);
}


async function save_data(key, val) 
{
    var rec = {};
    rec[key]=val;
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.storage.local.set(rec, () => {
          resolve()
        });
      })
    } else {
      return Browser.api.storage.local.set(rec);
    }
}


})();