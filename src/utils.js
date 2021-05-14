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


function sanitize_str(str) {
  str = str || '';
  return str.replace(/&/g, '&amp;')
                 .replace(/</g, '&lt;')
                 .replace(/>/g, '&gt;')
                 .replace(/"/g, '&quot;')
                 .replace(/'/g, '&#39;');
}


class Rest_Cons {
  constructor()
  {
    this.callback = null;
    this.yasqe = {
        obj : null,
        val : null,
        init: false,
      };
    this.fix_restURI = null;
    this.doc_url;
  }


  update() 
  {
    if (!this.doc_url) {
      return;
    }

    var _url = new URL(this.doc_url);
    _url.search = "";
    _url.protocol = DOM.iSel("rest_scheme").value;
    var v = DOM.iSel("rest_auth").value;
    var vlist = v.split('@');
    if (vlist.length == 1) {
      _url.host = vlist[0];
    } else {
      _url.username = vlist[0];
      _url.host = vlist[1];
    }

    _url.pathname = DOM.iSel("rest_path").value;
    _url.hash = DOM.iSel("rest_hash").value;

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

    DOM.iSel("rest_url").value = _url;
  }


  show() 
  {
    if (this.yasqe.obj && this.yasqe.val && !this.yasqe.init) {
      this.yasqe.obj.setValue(this.yasqe.val+"\n");
      this.yasqe.init = true;
    }
  }

  exec(tab_index)
  {
    if (!this.doc_url) {
      return;
    }

    this.update();
    var _url = DOM.iSel("rest_url").value;

    if (tab_index) {
      Browser.openTab(_url, tab_index);
    } else {
      Browser.api.tabs.create({url:_url});
    }
  }

  del_row(e)
  {
    //get the row we clicked on
    var row = $(e.currentTarget).parents('tr:first');
    var self = this;

    $('#alert-msg').prop('textContent','Delete row ?');
    $('#alert-dlg').dialog({
      resizable: false,
      height:180,
      modal: true,
      buttons: {
        'Yes': function() {
            row.remove();
            self.update()
            $(this).dialog( 'destroy' );
        },
        'No': function() {
            $(this).dialog( 'destroy' );
        }
      }
    });
    return true;
  }

  
  create_row(h,v)
  {
    return `<td width="12px"><button id="rest_del" class="rest_del">Del</button></td>
            <td><input id="h" style="WIDTH: 100%" value="${h}"></td>
            <td><textarea id="v" style="WIDTH: 100%; height:3em">${v}</textarea></td>`;
  }


  add_empty_row() 
  {
    this.add_row('','');
  }

  add_row(h,v) 
  {
    var tbody = DOM.qSel("#rest_params tbody");
    var r = tbody.insertRow(-1);
    r.innerHTML = this.create_row(h, v);

    $('.rest_del').button({
      icons: { primary: 'ui-icon-minusthick' },
      text: false
    });
    r.querySelector(".rest_del").onclick = (e) => { this.del_row(e) }
    r.querySelector("#h").oninput = (e) => { this.update() }
    r.querySelector("#v").oninput = (e) => { this.update() }
  }


  clear() 
  {
    var data = $('#users_data>tr');
    var data = $('#restData>tr');
    for(var i=0; i < data.length; i++) {
      $(data[i]).remove();
    }
  }

  load(doc_url) 
  {
    this.yasqe.val = null;
    this.fix_restURI = null;
    this.doc_url = doc_url;
    $("#rest_query").hide();

    this.clear();

    if (!this.doc_url) {
      this.add_empty_row();
      return;
    }

//??--    this.doc_url = "https://john.doe@www.example.com:123/forum/questions/?tag=networking&order=newest#top";
    DOM.iSel("rest_url").value = this.doc_url;

    var url = new URL(this.doc_url);
    var hash = url.hash;
    // check for RDF Editor URL
    if (hash.lastIndexOf("#/editor?", 0) === 0) {
      var tmp_url = this.doc_url.replace(/#\/editor\?/g, "%23/editor?");
      this.fix_restURI = url = new URL(tmp_url);
    }


    var params = url.searchParams;
    var count = 0;
    for(var pair of params.entries()) {
      var key = pair[0];
      var val = pair[1];
      if (key === "query" || key === "qtxt") {
        $("#rest_query").show();
        this.yasqe.val = val;
        var n = DOM.iSel("query_id");
        n.value = key;
        n.oninput = (e) => { this.update() };
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
      if (this.yasqe.obj)
        this.yasqe.obj.setValue("\n");
      $(".yasqe").hide();
    }


    url.search = "";

    var n = DOM.iSel("rest_scheme");
    n.value = url.protocol;
    n.oninput = (e) => { this.update() };

    n = DOM.iSel("rest_auth");
    n.value = url.username ? url.username+'@'+ url.host : url.host;
    n.oninput = (e) => { this.update() };

    n = DOM.iSel("rest_path");
    n.value = url.pathname;
    n.oninput = (e) => { this.update() };

    n = DOM.iSel("rest_hash");
    n.value = decodeURIComponent(url.hash);
    n.oninput = (e) => { this.update() };

    $('#rest_add').button({
      icons: { primary: 'ui-icon-plusthick' },
      text: false
    });
    
    DOM.iSel("rest_add").onclick = (e) => { this.add_empty_row(); }
  }


  parse_params(search)
  {
    var params = [];
    var s = search && search.length > 1 ? search.substring(1) : "";
    var lst = s.split('&');
    for(var v of lst) 
    {
       var lv = v.split('=');
       params.push( [lv[0], decodeURIComponent(lv[1])] );
    }
    return params;
  }
}



//====== Upload data to SPARQL server
class Save2Sparql {
  constructor(sparqlendpoint, sparql_graph, baseURI, oidc)
  {
    this.sparqlendpoint = sparqlendpoint;
    this.sparql_graph = sparql_graph;
    this.baseURI = baseURI;
    this.oidc = oidc
  }

  async upload_to_sparql(data)
  {

    var handler = new Convert_Turtle();
    try {
      show_throbber('&nbsp;Preparing&nbsp;data...');
      
      var ttl_data = await handler.prepare_query(data.txt, this.baseURI);

      for(var i=0; i < ttl_data.length; i++) {

        var ret = await this.exec_sparql(ttl_data[i].prefixes, ttl_data[i].triples);

        if (!ret.rc)
          return ret;
      }
    } finally {
      hide_throbber();
    }
  
    return {rc:true};
  }

  async exec_sparql(prefixes, triples)
  {
    var pref = "";
    var max_bytes = 64000;
    var pref_len = 10;
    var pref_sz;
    var insert_cmd = this.sparql_graph.length > 1
                 ? 'INSERT INTO GRAPH <' + this.sparql_graph + '> {\n'
                 : 'INSERT DATA { \n';

    pref += "base <"+this.baseURI+"> \n";
    pref += "prefix : <#> \n";

    pref_sz = pref.length;

    for(var key in prefixes) {
      var item = "prefix "+key+": <"+prefixes[key]+"> \n";
      pref += item;
      pref_len++;
      pref_sz += item.length;
    }
  
    var max_len = 10000 - pref_len;
    var count = 0;
    var data = [];
    var qry_sz = pref_sz;
    var z = 1;
    for(var i=0; i < triples.length; i++) 
    {
      if (qry_sz + triples[i].length >= max_bytes || count+1 >= max_len) {
        show_throbber('&nbsp;Uploading&nbsp;data&nbsp;...'+z);  z++;

        var ret = await this.send_sparql(pref + "\n" + insert_cmd + data.join('\n') + ' }');
        if (!ret.rc)
          return ret;

        count = 0;
        data = [];
        qry_sz = pref_sz;
      }

      data.push(triples[i]);
      count++;
      qry_sz += triples[i].length + 1;

    }

    if (count > 0) 
    {
      show_throbber('&nbsp;Uploading&nbsp;data&nbsp;...'+z);  z++;

      var ret = await this.send_sparql(pref + "\n" + insert_cmd + data.join('\n') + ' }');
      if (!ret.rc)
        return ret;
    }

    return {rc: true};
  }


  async send_sparql(query)
  {
    var contentType = "application/sparql-update;utf-8";
    var ret;
    var options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/sparql-update;utf-8'
      },
      credentials: 'include',
      body: query
    }

    try {
      ret = await this.oidc.fetch(this.sparqlendpoint, options);

      if (!ret.ok) {
        var message;
        switch(ret.status) {
          case 0:
          case 405:
            message = ''+ret.status +' this location is not writable'
            break
          case 401:
          case 403:
            message = ''+ret.status +' you do not have permission to write here'
            break
          case 406:
            message = ''+ret.status +' enter a name for your resource'
            break
          default:
            message = ''+ret.status +' '+ret.statusText;
            break
        }
        return {rc:false, error: message} ;
      }
    } catch (e) {
      return {rc:false, error:e.toString() };
    }

    return {rc: true};
  }


}



function show_throbber(msg)
{
  DOM.qSel('.throbber_msg #throbber_msg_text').innerHTML = msg;
  $(".throbber_msg").css("display","flex");
  sleep(100);
}

function hide_throbber()
{
  $(".throbber_msg").css("display","none");
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


function fixedEncodeURIComponent (str) {
  return encodeURIComponent(str).replace(/[!'()*&?#$,:@=;+\/]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}


function fetchWithTimeout(url, options, timeout) 
{
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var DOM = {};
DOM.qSel = (sel) => { return document.querySelector(sel); };
DOM.qSelAll = (sel) => { return document.querySelectorAll(sel); };
DOM.iSel = (id) => { return document.getElementById(id); };




