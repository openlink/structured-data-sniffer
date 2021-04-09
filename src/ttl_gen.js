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
  

  TTL_Gen = function(_docURI, for_query) {
    this.ns = new Namespace();
    this.docURI = _docURI;
    this.for_query = for_query;
    this.prefixes = {};
    
    this.escape    = /["\\\t\n\r\b\f\u0000-\u0019\ud800-\udbff]/;
    this.escapeAll = /["\\\t\n\r\b\f\u0000-\u0019]|[\ud800-\udbff][\udc00-\udfff]/g;
    this.escapeReplacements = { '\\': '\\\\', '"': '\\"', '\t': '\\t',
                           '\n': '\\n', '\r': '\\r', '\b': '\\b', '\f': '\\f' };
  };

  TTL_Gen.prototype = {

    load: function (n_data) 
    {
      if (n_data!=null &&
          n_data.length!==undefined && 
          n_data.length > 0) 
      {
        var str = "";

        //rename bnodes based on rdf:type relation
        this.bnodes = {};
        this.bnode_types = {};
        for(var i=0; i < n_data.length; i++) 
          {
            var subj = n_data[i].s;
            var isBNode = false;

            if (this.is_VBNode(subj)) {
              this.bnodes[subj] = this.VBNode2BNode(subj);
              isBNode = true;
            }
            else if (this.is_BNode(subj)) {
              this.bnodes[subj] = this.pre(subj.substring(1));
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
          var item = n_data[i];
          var subj = this.format_id(item.s);

          var props = [];
          props = props.concat(this.format_props(item.props, true));
          props = props.concat(this.format_props(item.props, false));

          for(var j=0; j < props.length; j++)
            str += subj +" "+props[j]+" .\n";
        }
      }

      if (this.for_query) {
        var pref = "";
        $.each(this.prefixes, function(key, val){
          pref += "prefix "+key+": <"+val+"> \n";
        });
        pref += "prefix : <#> \n";

        return {pref, ttl: str};
      } else {
        var ret = "";
        $.each(this.prefixes, function(key, val){
          ret += "@prefix "+key+": <"+val+"> .\n";
        });
        ret += "@prefix : <#> .\n";
        return ret+str;
      }
    },


    format_props : function(props, only_rdf_type)
    {
      if (props=== undefined) 
        return "";
        
      var ret = [];
      var self = this;
      $.each(props, function(key, val){
        if ((only_rdf_type && key!==self.ns.RDF_TYPE)
            || (!only_rdf_type && key===self.ns.RDF_TYPE))
          return;

        var pred_str = self.format_id(key);

        for(var i=0; i<val.length; i++) 
        {
          ret.push(pred_str +" "+self.format_obj(val[i]));
        } 
      });
      return ret;
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
            data = data.substr(0, data.length-1);

          if (data.indexOf("/")!==-1)
            return "<"+value+sid+">";
          else
            return ":"+this.pre(data+sid);
        }
        else
          return "<"+this.pre(value+sid)+">";
      } else 
        return null;
    },


    format_obj: function(obj)
    {
      var obj_str = "";
      if (obj.iri) {
        var iri = obj.iri;
        obj_str = this.format_id(obj.iri);
      } 
      else {
        var v = obj.value;
        if (obj.type) {
          var pref = this.ns.has_known_ns(obj.type);
          if (pref!=null) {
            this.prefixes[pref.ns]=pref.link;
            obj_str = this.obj_value(v) +"^^"+this.pref_link(obj.type, pref);
          }
          else
            obj_str = this.obj_value(v) +"^^<"+obj.type+">";
        }
        else if (obj.lang){
          obj_str = this.obj_value(v)+'@'+obj.lang;
        } 
        else {
          obj_str = this.obj_value(v);
        }
      }
      return obj_str;
    },


    format_id : function (value) 
    {
       if (this.is_VBNode(value)) {
         var s = this.bnodes[value];
         if (s)
           return s;
         else
           return this.VBNode2BNode(value);
       }
       else if (this.is_BNode(value)) {
         var s = this.bnodes[value];
         if (s)
           return s;
         else
           return this.pre(value.substring(1));
       }
       else {
         var pref = this.ns.has_known_ns(value);
         if (pref!=null) {
           this.prefixes[pref.ns]=pref.link;
           return this.pref_link(value, pref);
         }
         else
           return "<"+this.pre(value)+">";
       }
    },

    check_link : function (val) 
    {
      val = String(val);
      if ( val.match(/^http(s)?:\/\//) ) {
        val = "<"+this.pre(val)+">";
      } else if ( val.match(/^mailto:/) ) {
        val = "<"+this.pre(val)+">";
      } else {
        val = '"'+this.pre(val)+'"';
      }
      return val;
    },

    obj_value : function (val) 
    {
      val = String(val);
      return '"'+this.pre(val)+'"';
    },

    pref_link : function (val, pref) 
    {
      var data = val.substring(pref.link.length);
      var len = data.length;

      if (data[len-1]==="/") 
        data = data.substr(0, data.length-1);

      if (data.indexOf("/")!==-1)
        return "<"+val+">";
      else
        return pref.ns+":"+this.pre(data);
    },

    pre : function (value) 
    {
      var self = this;
      function characterReplacer(character) {
        // Replace a single character by its escaped version
        var result = self.escapeReplacements[character];
        if (result === undefined) {
          // Replace a single character with its 4-bit unicode escape sequence
          if (character.length === 1) {
            result = character.charCodeAt(0).toString(16);
            result = '\\u0000'.substr(0, 6 - result.length) + result;
          }
          // Replace a surrogate pair with its 8-bit unicode escape sequence
          else {
            result = ((character.charCodeAt(0) - 0xD800) * 0x400 +
                       character.charCodeAt(1) + 0x2400).toString(16);
            result = '\\U00000000'.substr(0, 10 - result.length) + result;
          }
        }
        return result;
      }

      if (this.escape.test(value))
        value = value.replace(this.escapeAll, characterReplacer);

      return value;
    },

    is_BNode : function (str) {
        return str.startsWith("_:");
    },
    is_VBNode : function (str) {
        return (str.startsWith("nodeID://") || str.startsWith("nodeid://"));
    },

    VBNode2BNode : function (str) {
        //return "_:nodeID"+this.pre(str.substr(9));
        return ":nodeID"+this.pre(str.substr(9));
    },

  }
