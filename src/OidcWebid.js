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

 
const { OIDCWebClient } = OIDC;
const oidc_session = 'oidc.session';
const oidc_clients = 'oidc.clients.';

OidcWeb = function(data) {
  this.webid = null;
  this.storage = null;
  this.session = null;
  this.fetch = fetch;

  const options = { solid: true };
  this.authClient = new OIDCWebClient(options);
  this.login_url = 'https://openlinksoftware.github.io/oidc-web/login.html#relogin';
  this.login2_url = 'https://openlinksoftware.github.io/oidc-web/login.html';
}


OidcWeb.prototype = {
  logout : async function()
  {
    if (this.webid) {
      var idp = '';
      if (this.session) {
        idp = this.session.issuer;
        var key = oidc_clients+idp;
        var rec = await this.localStore_get(key);
        if (rec && rec[key])
          localStorage.setItem(oidc_clients+idp, rec[key]);

        await this.authClient.logout();
      }
      await this.localStore_remove(oidc_session);
      await this.localStore_remove(oidc_clients+idp);
      this.webid = null;
      this.storage = null;
      this.session = null;
      this.fetch = fetch;
    }
  },

  login: function() {
     const width = 650;
     const height = 400;
     const left = window.screenX + (window.innerWidth - width) / 2;
     const top = window.screenY + (window.innerHeight - height) / 2;
     const settings = `width=${width},height=${height},left=${left},top=${top}`;
     window.open(this.login_url, 'Login', settings);
  },

  login2: function() {
     const width = 650;
     const height = 400;
     const left = window.screenX + (window.innerWidth - width) / 2;
     const top = window.screenY + (window.innerHeight - height) / 2;
     const settings = `width=${width},height=${height},left=${left},top=${top}`;

     const url = this.login2_url+'?idp='+encodeURIComponent('https://linkeddata.uriburner.com')+'&slogin=1#relogin';

     if (Browser.isFirefoxWebExt) {
       Browser.api.windows.create({
         url,
         type: 'popup',
         height,
         width,
         top,
         left,
         allowScriptsToClose : true
       });

     } else {
       window.open(url, 'Login', settings);
     }
  },

  isSessionForIdp: function(idp)
  {
    return (this.session && this.session.issuer.startsWith(idp));
  },
  
  checkSession: async function() 
  {
    try {
      var rec = await this.localStore_get(oidc_session);

      if (rec && rec[oidc_session]) {
        var session = rec[oidc_session];
        localStorage.setItem(oidc_session, session);
      } else
        localStorage.removeItem(oidc_session);

      var prev_webid = this.webid;

      this.session = await this.authClient.currentSession()
      this.webid = (this.session.hasCredentials()) ? this.session.idClaims.sub : null;
      this.fetch = (this.webid) ? this.session.fetch : null;

      if (prev_webid !== this.webid && this.webid) {
        this.storage = (new URL(this.webid)).origin + '/';
        var prof = await getWebIdProfile(this.webid);

        if (prof.storage)
          this.storage = prof.storage;
        if (!this.storage.endsWith('/'))
          this.storage += '/';
      }

      if (!this.webid)
        this.storage = '';

    } catch(e) {
      console.log(e);
    }
  },

  localStore_save: async function(key, val) 
  {
    var rec = {};
    rec[key]=val;
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.storage.local.set(rec, () => resolve());
      })
    } else {
      return Browser.api.storage.local.set(rec);
    }
  },

  localStore_get: async function(key) 
  {
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.storage.local.get(key, (rec) => {
          resolve(rec)
        });
      })
    } else {
      return Browser.api.storage.local.get(key);
    }
  },

  localStore_remove: async function(key) 
  {
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.storage.local.remove(key, (rec) => {
          resolve(rec)
        });
      })
    } else {
      return Browser.api.storage.local.remove(key);
    }
  }


}


function putResource (_fetch, url, data, contentType, links, options = {}) 
{
  const DEFAULT_CONTENT_TYPE = 'text/html; charset=utf-8'
  const _ffetch = _fetch || fetch;;
  const LDP_RESOURCE = '<http://www.w3.org/ns/ldp#Resource>; rel="type"'

  if (!url) {
    return Promise.reject(new Error('Cannot PUT resource - missing url'))
  }

  options.method = 'PUT'

  options.body = data

  if (!options.noCredentials) {
    options.credentials = 'include'
  }

  options.headers = options.headers || {}

  options.headers['Content-Type'] = contentType || DEFAULT_CONTENT_TYPE

  links = links
    ? LDP_RESOURCE + ', ' + links
    : LDP_RESOURCE

  options.headers['Link'] = links

  return _ffetch(url, options)

    .then(response => {
      if (!response.ok) {  // not a 2xx level response
        let error = new Error('Error writing resource: ' +
          response.status + ' ' + response.statusText)
        error.status = response.status
        error.response = response

        throw error
      }

      return response
    })
}



function getWebIdProfile(url) 
{
  var PIM = $rdf.Namespace("http://www.w3.org/ns/pim/space#");
  var FOAF = $rdf.Namespace("http://xmlns.com/foaf/0.1/");
  var LDP = $rdf.Namespace("http://www.w3.org/ns/ldp#");
  var AS = $rdf.Namespace("http://www.w3.org/ns/activitystreams#");

  var promise = new Promise(function(resolve, reject) {
      // Load main profile
      getGraph(url).then(
          function(graph) {
              // set WebID
              var docURI = (url.indexOf('#') >= 0)?url.slice(0, url.indexOf('#')):url;
              var webid = graph.any($rdf.sym(docURI), FOAF('primaryTopic'));

              // find additional resources to load
              var inbox = graph.statementsMatching(webid, LDP('inbox'), undefined);
              var storage = graph.statementsMatching(webid, PIM('storage'), undefined);
              var outbox = graph.statementsMatching(webid, AS('outbox'), undefined);

              var profile = {webid};
              if (inbox && inbox.length > 0)
                profile.storage = inbox[0].object.value;
              else if (storage && storage.length > 0) 
                profile.storage = storage[0].object.value;
              else if (outbox && outbox.length > 0)
                profile.storage = outbox[0].object.value;

              return resolve(profile);
          }
      )
      .catch(
          function(err) {
              reject(err);
          }
      );
  });

  return promise;
}

function getGraph(url)
{
  const timeout = 5000;

  var promise = new Promise(function(resolve, reject) {
      var g = new $rdf.graph();
      var f = new $rdf.fetcher(g, timeout);

      var docURI = (url.indexOf('#') >= 0)?url.slice(0, url.indexOf('#')):url;
      f.nowOrWhenFetched(docURI,undefined,function(ok, body, xhr) {
          if (!ok) {
              reject({status: (xhr? xhr.status :0), xhr: xhr});
          } else {
              resolve(g);
          }
      });
  });

  return promise;
}




