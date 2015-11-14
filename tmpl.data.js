  Namespace = function() {
    this.ns_list = {
          "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
           "owl": "http://www.w3.org/2002/07/owl#",
            "dc": "http://purl.org/dc/elements/1.1/",
        "schema": "http://schema.org/",
           "rsa": "http://www.w3.org/ns/auth/rsa#",
          "cert": "http://www.w3.org/ns/auth/cert#",
       "oplcert": "http://www.openlinksw.com/schemas/cert#",
           "xsd": "http://www.w3.org/2001/XMLSchema#",
           "xhv": "http://www.w3.org/1999/xhtml/vocab#",
          "foaf": "http://xmlns.com/foaf/0.1/"
    };
  }
  
  Namespace.prototype = {
    has_known_ns : function (str) 
    {
      function s_startWith(str, val) {
       return str.substring(0, val.length) === val;
      }

      var rc = null;
      $.each(this.ns_list, function(pref, link_url) {
        if (s_startWith(String(str),link_url)) {
          rc = { ns:pref, link:link_url };
          return false;
        } 
        return true;
      });
      return rc;
    },
    
  }

  
  
  
  
  Tmpl2 = function() {
    this.gPrefix = { 
          "rdf" : "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
          "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
           "owl": "http://www.w3.org/2002/07/owl#",
            "dc": "http://purl.org/dc/elements/1.1/",
        "schema": "http://schema.org/",
           "rsa": "http://www.w3.org/ns/auth/rsa#",
          "cert": "http://www.w3.org/ns/auth/cert#",
       "oplcert": "http://www.openlinksw.com/schemas/cert#",
           "xsd": "http://www.w3.org/2001/XMLSchema#",
           "xhv": "http://www.w3.org/1999/xhtml/vocab#",
          "foaf": "http://xmlns.com/foaf/0.1/"
          };
  };

  Tmpl2.prototype = {

    load: function (json_data) 
    {
      var expanded = null;
      var id_list = {};

      if (json_data!=null &&
          json_data.length!==undefined && 
          json_data.length > 0) 
      {
        var str = "";
        //fill id_list
        for(var i=0; i < json_data.length; i++) 
        {
          id_list[json_data[i].s] = i+1;
        }


        for(var i=0; i < json_data.length; i++) 
        {
          var item = json_data[i];
          str += "\
            <table class='metadata table'> \
              <thead> \
                <tr> \
                  <th width='40%'></th> \
                  <th width='60%'></th> \
                </tr> \
              </thead> \
              <tbody> \
                <tr class='major'><td>Entity"+item.n+"</td><td></td></tr> \
                ";
          str += this.format_id(item.s, id_list);
          str += this.format_props(item.props, id_list);

          str += "\
              </tbody> \
            </table> \
                 ";
        }

        var tbl_start = "\
                <table> \
                  <tbody> \
                  ";
        var tbl_end = "\
                  </tbody> \
                </table> \
                ";
        if (str.length > 0)
           expanded = tbl_start + str + tbl_end;
      }
      return expanded;
    },


    format_props : function(props, id_list)
    {
      if (props=== undefined) 
        return "";

        
      var str = "";
      var self = this;
      $.each(props, function(key, val){
        var key_str = key;
        var pref = self.has_known_prefix(key);
        var key_str = (pref!=null) ? self.pref_link(key, pref) : self.check_keylink1(key);

        for(var i=0; i<val.length; i++) {
          var obj = val[i];
          if (obj.iri!=undefined) {
            var iri = obj.iri;
            var entity_id = id_list[iri];
            if (entity_id!==undefined && iri[0]==="_" && iri[1]===":") {
              str += "<tr class='data_row'><td>" + key_str + "</td><td class='major'><i>Entity" + entity_id + "</i></td></tr>";
            }
            else {
              var pref = self.has_known_prefix(obj.iri);
              var sval = (pref!=null) ? self.pref_link(obj.iri, pref) : self.check_link1(obj.iri);
              str += "<tr class='data_row'><td>" + key_str + "</td><td>"+sval+"</td></tr>";
            }
          } 
          else {
            var v = obj.value;
            var sval;
            if (obj.type!==undefined) {
              var pref = self.has_known_prefix(obj.type);
              if (pref)
                sval = self.check_link1(v)+"("+self.pref_link(obj.type,pref)+")";
              else
                sval = self.check_link1(v)+"("+self.check_link1(obj.type)+")";
            }
            else if (obj.lang!==undefined){
              sval = v+"@"+obj.lang;
            } 
            else {
              sval = v;
            }
            str += "<tr class='data_row'><td>" + key_str + "</td><td>"+sval+"</td></tr>";
          }
        } 
      });
      if (str.length > 0)
        return "\
          <tr class='major'> \
            <td>Properties</td><td></td> \
          </tr> \
           " + str;
      else
        return str;
    },

    format_id : function (value, id_list) 
    {
       var entity_id = id_list[value];
       if (entity_id!==undefined && value[0]==="_" && value[1]===":") {
         return "";
       }
       else {
         var pref = this.has_known_prefix(value);
         var sval = (pref!=null) ? this.pref_link(value, pref) : this.check_link1(value);
         return "<tr class='major data_row'><td>ID</td><td>" + sval + "</td></tr>";
       }
    },

    has_known_prefix : function (str) 
    {
      function s_startWith(str, val) {
       return str.substring(0, val.length) === val;
      }

      var rc = null;
      $.each(this.gPrefix, function(pref, link_url) {
        if (s_startWith(String(str),link_url)) {
          rc = { key:pref, val:link_url };
          return false;
        } 
        return true;
      });
      return rc;
    },

    check_keylink1 : function (val) 
    {
      if ( String(val).match(/^http(s)?:\/\//) ) {
        if ( String(val).match(/\.(jpg|png|gif)$/) ) {
          val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:200px;" /></a>';
        } else {
          val = '<a href="' + val + '">' + val + '</a>';
        }
      } else
        val += ":"
      return val;
    },

    check_link1 : function (val) 
    {
      if ( String(val).match(/^http(s)?:\/\//) ) {
        if ( String(val).match(/\.(jpg|png|gif)$/) ) {
          val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:200px;" /></a>';
        } else {
          val = '<a href="' + val + '">' + val + '</a>';
        }
      }
      return val;
    },

    pref_link : function (val, pref) 
    {
      var data = val.substring(pref.val.length);
      return '<a href="' + val + '" title="' + val + '">' + pref.key+':'+data + '</a>';
    },

  }



