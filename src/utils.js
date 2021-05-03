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
      if (this.yasqe.obj)
        this.yasqe.obj.setValue("\n");
      $(".yasqe").hide();
    }
  },

}


//====== Upload data to SPARQL server
async function exec_sparql(sparqlendpoint, sparql_graph, prefixes, triples, docURI)
{
  var pref = "";
  var max_bytes = 64000;
  var pref_len = 10;
  var pref_sz;
  var insert_cmd = sparql_graph.length > 1
                 ? 'INSERT INTO GRAPH <' + sparql_graph + '> {\n'
                 : 'INSERT DATA { \n';

  pref += "base <"+docURI+"> \n";
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
  for(var i=0; i < triples.length; i++) 
  {
    if (qry_sz + triples[i].length >= max_bytes || count+1 >= max_len) {
      var ret = await send_sparql(sparqlendpoint, pref + "\n" + insert_cmd + data.join('\n') + ' }');
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
    var ret = await send_sparql(sparqlendpoint, pref + "\n" + insert_cmd + data.join('\n') + ' }');
    if (!ret.rc)
      return ret;
  }

  return {rc: true};
}


async function send_sparql(sparqlendpoint, query)
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
      ret = await gOidc.fetch(sparqlendpoint, options);

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




