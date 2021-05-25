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
  

  HTML_Gen = function(_docURI, bnode_types) {
    this.ns = new Namespace();
    this.uimode = "";
    this.SubjName = "Subject";
    this.PredName = "Predicate";
    this.ObjName  = "Object";
    this.docURI = _docURI;
    this.bnode_types = bnode_types || {};
    this.subst_list = {
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#label": "Label",
            "http://www.w3.org/2000/01/rdf-schema#label": "Label",
                                "https://schema.org/name": "Name",
          "http://www.w3.org/2004/02/skos/core#altLabel": "AltLabel",
         "http://www.w3.org/2004/02/skos/core#prefLabel": "PrefLabel",
    };
  };

  HTML_Gen.prototype = {

    load: function (n_data, start_id) 
    {
      var expanded = null;
      var id_list = {};
   
      if (start_id===undefined)
        start_id = 0;

      this.uimode = localStorage.getItem("ext.osds.uiterm.mode");
      if (this.uimode===null)
        this.uimode = "ui-eav";

      if (this.uimode === "ui-eav") 
      {
        this.SubjName = "Entity";
        this.PredName = "Attribute";
        this.ObjName  = "Value";
      }


      if (n_data!=null &&
          n_data.length!==undefined && 
          n_data.length > 0) 
      {
        var str = "";

        //rename bnodes based on rdf:type relation
        this.bnodes = {};
        for(var i=0; i < n_data.length; i++) 
        {
          var subj = n_data[i].s;
          var isBNode = false;

          if (this.is_VBNode(subj)) {
            this.bnodes[subj] = this.docURI + "#nodeID" + subj.substring(9);
            isBNode = true;
          }
          else if (this.is_BNode(subj)) {
            this.bnodes[subj] = this.docURI + "#" + subj.substring(2);
            isBNode = true;
          }

          if (isBNode) {
            $.each(n_data[i].props, (key, val) => {
              if (key === this.ns.RDF_TYPE && val.length > 0) {
                var type_name = this.create_iri_for_type(val[0]);
                var id = this.bnode_types[type_name];

                if (id!==undefined)
                  id++;
                else
                  id = 0;
                
                this.bnodes[subj] = this.create_iri_for_type(val[0], id);
                this.bnode_types[type_name] = id;
              }
            });
          }
        }

        //fill id_list
        for(var i=0; i < n_data.length; i++) 
        {
          var subj = n_data[i].s;
          id_list[n_data[i].s] = start_id+i+1;

          //replace bNode with IRI
          if (this.is_BNode(subj)) {
            var s = this.bnodes[subj];
            if (s)
              n_data[i].s = s;
            else
              n_data[i].s = this.docURI + "#" + subj.substring(2);
          }
          else if (this.is_VBNode(subj)) {
            var s = this.bnodes[subj];
            if (s)
              n_data[i].s = s;
            else
              n_data[i].s = this.docURI + "#nodeID" + subj.substring(9);
          }

          $.each(n_data[i].props, (key, val) => {

              for(var j=0; j < val.length; j++) {
                var obj = val[j];
                if (obj.iri) {
                  if (this.is_BNode(obj.iri)) {
                    var s = this.bnodes[obj.iri];
                    if (s)
                      n_data[i].props[key][j].iri = s;
                    else
                      n_data[i].props[key][j].iri = this.docURI + "#" + obj.iri.substring(2);
                  }
                  else if (this.is_VBNode(obj.iri)) {
                    var s = this.bnodes[obj.iri];
                    if (s)
                      n_data[i].props[key][j].iri = s;
                    else
                      n_data[i].props[key][j].iri = this.docURI + "#nodeID" + obj.iri.substring(9);
                  }
                }
              }
          });
          //end replace bNode with IRI
        
        }


        for(var i=0; i < n_data.length; i++) 
        {
          var item = n_data[i];
          var item_num = start_id + item.n;
          str += 
           `<table class='docdata table'> 
              <thead> 
                <tr> 
                  <th width='40%'></th> 
                  <th width='60%'></th> 
                </tr> 
              </thead> 
              <tbody> 
                <tr class='major'>
                  <td><a name='sc${item_num}'>Statement Collection #${item_num}</a></td>
                  <td></td>
                </tr> 
                `;
          str += this.format_id(item.s, id_list);

          var props = "";
          props += this.format_props(item.props, id_list, true);
          props += this.format_props(item.props, id_list, false);

          if (props.length > 0)
            str += `<tr class='major'> 
                      <td>${this.PredName}s</td>
                      <td></td> 
                    </tr>${props}`;

          str += `
              </tbody> 
            </table> 
            `;
        }

        var tbl_start = `
                <table> 
                  <tbody> `;
        var tbl_end = `
                  </tbody>
                </table>
                `;
        if (str.length > 0)
           expanded = tbl_start + str + tbl_end;
      }
      return expanded;
    },


    format_props : function(props, id_list, only_rdf_type)
    {
      if (props=== undefined) 
        return "";
        
      var str = "";
      var self = this;
      $.each(props, function(key, val){
        if ((only_rdf_type && key!==self.ns.RDF_TYPE)
            || (!only_rdf_type && key===self.ns.RDF_TYPE))
          return;

        var key_str = self.iri2html(key, true);

        for(var i=0; i<val.length; i++) {
          var obj = val[i];
          if (obj.iri) {
            var iri = obj.iri;
            var entity_id = id_list[iri];
            //nodeID://
            if (entity_id!==undefined && (self.is_BNode(iri) || self.is_VBNode(iri))) {
              str += `<tr class='data_row'>
                         <td> ${key_str} </td>
                         <td class='major'>
                           <a href='#sc${entity_id}'><i>See Statement Collection #${entity_id}</i></a>
                         </td>
                      </tr>`;
            }
            else {
              var sval = self.iri2html(obj.iri);
              var td_class = obj.typeid!==undefined || key===self.ns.RDF_TYPE ?" class='typeid'":"";
              str += `<tr class='data_row'>
                        <td ${td_class}> ${key_str} </td>
                        <td ${td_class} > ${sval} </td>
                      </tr>`;
            }
          } 
          else {
            var v = obj.value;
            var sval;
            if (obj.type) {
              var pref = self.ns.has_known_ns(obj.type);
              if (pref)
                sval = self.check_link(v)+"("+self.pref_link(obj.type,pref)+")";
              else
                sval = self.check_link(v)+"("+self.check_link(obj.type)+")";
            }
            else if (obj.lang){
              sval = '"'+self.check_link(v)+'"@'+obj.lang;
            } 
            else {
              sval = self.check_link(v);
            }
            str += `<tr class='data_row'>
                      <td> ${key_str} </td>
                      <td> ${sval} </td>
                    </tr>`;
          }
        } 
      });
      return str;
    },

    create_iri_for_type: function(obj, id)
    {
      var sid = (id && id > 0) ? '_'+id : '';
      if (obj.iri && !this.is_VBNode(obj.iri) && !this.is_BNode(obj.iri)) {
        var value = obj.iri;
        var pref = this.ns.has_known_ns(value);
        if (pref!=null) {
          var data = value.substring(pref.link.length);
          var len = data.length;
          if (data[len-1]==="/") 
            data = data.substr(0, len-1);

          if (data.indexOf("/")!==-1) {
            var lst = data.split('/');
            data = lst.length>0 ? lst[lst.length-1] : "";
            if (!data)
              data = "b";
          }
          
          return this.docURI +"#"+data+sid;
        }
        else {
          var u = new URL(value);
          if (u.hash) {
            return this.docURI +"#"+u.hash+sid;
          } else {
            var lst = u.pathname.split('/');
            var data = lst.length>0 ? lst[lst.length-1] : "";
            if (!data)
              data = "b";

            return this.docURI +"#"+data+sid;
          }
        }
      } else 
        return null;
    },


    format_id : function (value, id_list) 
    {
       var entity_id = id_list[value];
//--
/***
       if (entity_id!==undefined && this.is_BNode(value)) {
         return "";
       }
       else 
***/
       {
         // for scroll between entities on page
         var uri = String(value);
         var anc = "";
         if (this.docURI && uri.match(/^http(s)?:\/\//) && this.check_URI(uri)) {
           var hashPos = uri.lastIndexOf("#");
           if (hashPos!=-1 && hashPos!=uri.length-1) {
             anc = '<a name="'+uri.substr(hashPos+1)+'"/>';           
           }
         }
         var sval = this.iri2html(uri, null, 'ent');
         return `<tr class='major data_row'>
                   <td> ${anc} ${this.SubjName} </td>
                   <td> ${sval} </td>
                 </tr>`;
       }
    },

    iri2html : function (uri, is_key, myid)
    {
      var v = this.check_subst(uri);

      if (v.rc==true) {
         return v.val;
      }
      else { 
        var pref = this.ns.has_known_ns(uri);
        var sid = myid ? ` ${myid} ` : '';
        return (pref!=null) ? this.pref_link(uri, pref, sid) : this.check_link(uri, is_key, sid);
      }
    },
    
    check_link : function (val, is_key, sid) 
    {
      var s_val = String(val);
      var t_val = val;

      if ( s_val.match(/^http(s)?:\/\//) ) 
      {
        if ( s_val.match(/\.(jpg|png|gif|svg)$/) ) {
          var width = (is_key!==undefined && is_key)?200:300;
          return `<a ${sid} href="${val}" title="${val}"><img src="${val}" style="max-width: ${width}px;" /></a>`;
        } 
        if ( s_val.match(/\.(jpg|png|gif|svg)[?#].*/) ) {
          var width = (is_key!==undefined && is_key)?200:300;
          return `<a ${sid} href="${val}" title="${val}"><img src="${val}" style="max-width: ${width}px;" /></a>`;
        } 
        return `<a ${sid} href="${val}"> ${this.decodeURI(val)} </a>`;
      } 
      else if ( s_val.match(/^mailto:/) ) 
      {
        return `<a ${sid} href="${val}"> ${this.decodeURI(val)} </a>`;
      }
      return this.pre(val);
    },


    pref_link : function (val, pref, sid) 
    {
      var data = val.substring(pref.link.length);
      return `<a ${sid} href="${val}" title="${val}"> ${pref.ns}:${this.decodeURI(data)}</a>`;
    },

    pre : function (text) 
    {
      return sanitize_str(text);
    },

    is_BNode : function (str) 
    {
        return str.startsWith("_:");
    },

    is_VBNode : function (str) 
    {
        return (str.startsWith("nodeID://") || str.startsWith("nodeid://"));
    },

    check_URI : function(uri) {
      if (this.docURI[this.docURI.length-1]==="#")
        return uri.startsWith(this.docURI);
      else
        return uri.startsWith(this.docURI+'#');
    },

    check_subst : function(uri) {
      if (uri.startsWith(this.docURI)) {
        var s = uri.substr(this.docURI.length);
        if (s[0]==="#") {
          var v = '<a href="' + uri + '" title="' + uri + '">' +this.decodeURI(s)+ '</a>';
          return {rc:true, val:v};
        }
        else
          return {rc:false};
      } 
      else {
        var anc_name = this.subst_list[uri];
        if (anc_name) {
          var v = `<a href="${uri}" title="${uri}"> ${this.decodeURI(anc_name)}</a>`;
          return {rc:true, val:v};
        }
        else
          return {rc:false};
      }
    },

    decodeURI : function(val) {
      try {
        return decodeURI(val);
      } catch (ex) {
        return val; 
      }
    },

  }
