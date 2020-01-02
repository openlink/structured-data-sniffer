/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2020 OpenLink Software
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
  

  TTL_Gen = function(_docURI) {
    this.ns = new Namespace();
    this.docURI = _docURI;
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
      var ret = "";
      $.each(this.prefixes, function(key, val){
        ret += "@prefix "+key+": <"+val+"> .\n";
      });
      return ret+str;
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
          var obj_str = "";
          var obj = val[i];
          if (obj.iri) {
            var iri = obj.iri;
            obj_str = self.format_id(obj.iri);
          } 
          else {
            var v = obj.value;
            if (obj.type) {
              var pref = self.ns.has_known_ns(obj.type);
              if (pref!=null) {
                self.prefixes[pref.ns]=pref.link;
                obj_str = self.obj_value(v) +"^^"+self.pref_link(obj.type, pref);
              }
              else
                obj_str = self.obj_value(v) +"^^<"+obj.type+">";
            }
            else if (obj.lang){
              obj_str = self.obj_value(v)+'@'+obj.lang;
            } 
            else {
              obj_str = self.obj_value(v);
            }
          }
          ret.push(pred_str +" "+obj_str);
        } 
      });
      return ret;
    },

    format_id : function (value) 
    {
       if (this.is_VBNode(value)) {
         return this.VBNode2BNode(value);
       }
       else if (this.is_BNode(value)) {
         return this.pre(value);
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
        return (str.lastIndexOf("_:", 0) === 0);
    },
    is_VBNode : function (str) {
        return (str.lastIndexOf("nodeID://", 0) === 0 || str.lastIndexOf("nodeid://", 0) === 0);
    },

    VBNode2BNode : function (str) {
        return "_:nodeID"+this.pre(str.substr(9));
    },

  }
