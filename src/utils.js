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
//--  $('#tabs a[href=#cons]').show();
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
