  
  
  HTML_Gen = function() {
    this.ns = new Namespace();
  };

  HTML_Gen.prototype = {

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
            <table class='docdata table'> \
              <thead> \
                <tr> \
                  <th width='40%'></th> \
                  <th width='60%'></th> \
                </tr> \
              </thead> \
              <tbody> \
                <tr class='major'><td>Statement #"+item.n+"</td><td></td></tr> \
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
        var pref = self.ns.has_known_ns(key);
        var key_str = (pref!=null) ? self.pref_link(key, pref) : self.check_link(key, true);

        for(var i=0; i<val.length; i++) {
          var obj = val[i];
          if (obj.iri!=undefined) {
            var iri = obj.iri;
            var entity_id = id_list[iri];
            if (entity_id!==undefined && iri[0]==="_" && iri[1]===":") {
              str += "<tr class='data_row'><td>" + key_str + "</td><td class='major'><i>Statement #" + entity_id + "</i></td></tr>";
            }
            else {
              var pref = self.ns.has_known_ns(obj.iri);
              var sval = (pref!=null) ? self.pref_link(obj.iri, pref) : self.check_link(obj.iri);
              str += "<tr class='data_row'><td>" + key_str + "</td><td>"+sval+"</td></tr>";
            }
          } 
          else {
            var v = obj.value;
            var sval;
            if (obj.type!==undefined && obj.type) {
              var pref = self.ns.has_known_ns(obj.type);
              if (pref)
                sval = self.check_link(v)+"("+self.pref_link(obj.type,pref)+")";
              else
                sval = self.check_link(v)+"("+self.check_link(obj.type)+")";
            }
            else if (obj.lang!==undefined && obj.lang){
              sval = self.check_link(v)+"@"+obj.lang;
            } 
            else {
              sval = self.check_link(v);
            }
            str += "<tr class='data_row'><td>" + key_str + "</td><td>"+sval+"</td></tr>";
          }
        } 
      });
      if (str.length > 0)
        return "\
          <tr class='major'> \
            <td>Attributes</td><td></td> \
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
         var pref = this.ns.has_known_ns(value);
         var sval = (pref!=null) ? this.pref_link(value, pref) : this.check_link(value);
         return "<tr class='major data_row'><td>Entity</td><td>" + sval + "</td></tr>";
       }
    },

    check_link : function (val, is_key) 
    {
      if ( String(val).match(/^http(s)?:\/\//) ) {
        if ( String(val).match(/\.(jpg|png|gif)$/) ) {
          var width = (is_key!==undefined && is_key)?200:300;
          val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:'+width+'px;" /></a>';
        } else {
          val = '<a href="' + val + '">' + val + '</a>';
        }
      } else if ( String(val).match(/^mailto:/) ) {
        val = '<a href="' + val + '">' + val + '</a>';
      }
      return val;
    },


    pref_link : function (val, pref) 
    {
      var data = val.substring(pref.link.length);
      return '<a href="' + val + '" title="' + val + '">' + pref.ns+':'+data + '</a>';
    },

  }



