/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2019 OpenLink Software
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


function sanitize_str(str) {
  str = str || '';
  return str.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#39;');
}


Rest_Cons = function () {
  this.callback = null;
  this.yasqe = {
        obj : null,
        val : null,
        init: false,
      };
  this.fix_restURI = null;
};


Rest_Cons.prototype = {

  show : function() {
    if (this.yasqe.obj && this.yasqe.val && !this.yasqe.init) {
      this.yasqe.obj.setValue(this.yasqe.val+"\n");
      this.yasqe.init = true;
    }
  },

  exec : function(doc_URL, tab_index) {  // rest_exec
    if (!doc_URL) {
      return;
    }

    var _url = (this.fix_restURI)? this.fix_restURI : new URL(doc_URL);
    _url.search = "";

    if (this.yasqe.obj) {
      var val = this.yasqe.obj.getValue();
      var name = $("#query_id").val();
      if (val && (val.replace(/[\r\n ]/g, '')).length > 0) {
         _url.searchParams.append(name, val);
      }
    }

    var rows = $('#restData>tr');
    for(var i=0; i < rows.length; i++) {
      var r = $(rows[i]);
      var h = r.find('#h').val();
      var v = r.find('#v').val();
      if (h.length>0) {
         _url.searchParams.append(h, v);
      }
    }

    _url = _url.toString();
    if (this.fix_restURI) {
      _url = _url.replace(/%23\/editor\?/g, "#/editor\?");
    }

    if (tab_index) {
      Browser.openTab(_url, tab_index);
    } else {
      Browser.api.tabs.create({url:_url});
    }
  },

  del_row : function(e) {  // rest_del
    //get the row we clicked on
    var row = $(this).parents('tr:first');

    $('#alert-msg').prop('textContent','Delete row ?');
    $('#alert-dlg').dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        'Yes': function() {
            $(row).remove();
            $(this).dialog( 'destroy' );
        },
        'No': function() {
            $(this).dialog( 'destroy' );
        }
      }
    });
    return true;
  },

  
  create_row : function() {  // createRestRow
    return `<tr>
              <td width="12px"><button id="rest_del" class="rest_del">Del</button></td>
              <td><input id="h" style="WIDTH: 100%" value=""></td>
              <td><input id="v" style="WIDTH: 100%" value=""></td>
            </tr>`;
  },


  add_empty_row : function() { //addRestEmpty
    this.add_row('','');
  },


  add_row : function(h,v) {     //addRestParam
    $('#restData').append(this.create_row());
    $('#restData tr:last-child #h').val(h);
    $('#restData tr:last-child #v').val(v);


    $('.rest_del').button({
      icons: { primary: 'ui-icon-minusthick' },
      text: false
    });
    $('.rest_del').click(this.del_row);
  },


  clear : function() { //delRest
    var data = $('#users_data>tr');
    var data = $('#restData>tr');
    for(var i=0; i < data.length; i++) {
      $(data[i]).remove();
    }
  },

  load : function(doc_url) {
    this.yasqe.val = null;
    this.fix_restURI = null;

    this.clear();

    if (!doc_url) {
      this.add_empty_row();
      return;
    }

    var url = new URL(doc_url);
    var hash = url.hash;
    // check for RDF Editor URL
    if (hash.lastIndexOf("#/editor?", 0) === 0) {
      var tmp_url = doc_url.replace(/#\/editor\?/g, "%23/editor?");
      this.fix_restURI = url = new URL(tmp_url);
    }

    var params = url.searchParams;
    var count = 0;

    for(var pair of params.entries()) {
      var key = pair[0];
      var val = pair[1];
      if (key === "query" || key === "qtxt") {
        this.yasqe.val = val;
        $("#query_id").val(key);
      }
      else {
        this.add_row(key, val);
      }
      count++;
    }

    if (count == 0) {
      this.add_empty_row();
    }

    if (this.yasqe.obj && this.yasqe.val) {
      this.yasqe.obj.setValue(this.yasqe.val+"\n");
    }
    else {
      this.yasqe.obj.setValue("\n");
      $(".yasqe").hide();
    }
  },

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
              reject({status: xhr.status, xhr: xhr});
          } else {
              resolve(g);
          }
      });
  });

  return promise;
}


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
      await localStore_remove(oidc_session);
      await localStore_remove(oidc_clients+idp);
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
     window.open(gOidc.login_url, 'Login', settings);
  },

  checkSession: async function() 
  {
    try {
      var rec = await localStore_get(oidc_session);

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
  }

}


