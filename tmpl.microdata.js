
var gPrefix = { 
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



function s_trunc(str, n) {
   return str.substr(0,n-1)+(str.length>n?'&hellip;':'');
}
 

function s_startWith(str, val) {
   return str.substring(0, val.length) === val;
}



if (!this.tmpl) {
  tmpl = function() {
    var converter = {
      template: "\
        {.section items} \
          {.repeated section @} \
            <table class='metadata table'> \
              <thead> \
                <tr> \
                  <th width='40%'></th> \
                  <th width='60%'></th> \
                </tr> \
              </thead> \
              <tbody> \
                <tr class='major'><td>ITEM {number}</td><td></td></tr> \
                {.section id} \
                  {@|f_id} \
                {.end} \
                {.section type} \
                  {@|f_type} \
                {.end} \
                <tr class='major'> \
                  <td>properties:</td><td></td> \
                </tr> \
                {.section properties} \
                  {@|pairs} \
                {.end} \
              </tbody> \
            </table> \
          {.end} \
        {.or} \
          <p><em>(No data)</em></p> \
        {.end} \
        ",
      load: function (json_text) {
        var expanded = null;
        var items = $($.parseJSON(json_text));
/**
        if (items.length === 0) {
          $('#metadata_viewer').append("<div id='metadata' />");
          $('#metadata').append('<i>No data found.</i>');
        } else {
***/
        if (items.length > 0) {
          var item_id = 0;
          items.each( function() {

            var t = jsontemplate.Template(tmpl.converter.template, {more_formatters: more_formatters, undefined_str: ""});
            var item_number = 0;

            function more_formatters(formatter_name) {
              if (formatter_name === 'pairs') {
                return rowize_pairs;
              } 
              else if (formatter_name === 'f_type') {
                return f_type;
              } 
              else if (formatter_name === 'f_id') {
                return f_id;
              } 
              else {
                return null;
              }
            }

            function check_link(val) {
              if ( String(val).match(/^http(s)?:\/\//) ) {
                if ( String(val).match(/\.(jpg|png|gif)$/) ) {
                  val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:200px;" /></a>';
                } else {
                  val = '<a href="' + val + '" title="' + val + '">' + s_trunc(String(val), 60) + '</a>';
                }
              }
              return val;
            }

            function check_keylink1(val) {
              if ( String(val).match(/^http(s)?:\/\//) ) {
                if ( String(val).match(/\.(jpg|png|gif)$/) ) {
                  val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:200px;" /></a>';
                } else {
                  val = '<a href="' + val + '">' + val + '</a>';
                }
              } else
                val += ":"
              return val;
            }

            function check_link1(val) {
              if ( String(val).match(/^http(s)?:\/\//) ) {
                if ( String(val).match(/\.(jpg|png|gif)$/) ) {
                  val = '<a href="' + val + '" title="' + val + '"><img src="' + val + '" style="max-width:200px;" /></a>';
                } else {
                  val = '<a href="' + val + '">' + val + '</a>';
                }
              }
              return val;
            }

            function pref_link(val, pref) {
              var data = val.substring(pref.val.length);
              return '<a href="' + val + '" title="' + val + '">' + pref.key+':'+data + '</a>';
            }

            function has_known_prefix(str) {
              var rc = null;
              $.each(gPrefix, function(pref, link_url) {
                if (s_startWith(String(str),link_url)) {
                  rc = { key:pref, val:link_url };
                  return false;
                } 
                return true;
              });
              return rc;
            }

            function f_type(value) {
              var str = "";
              $.each(value, function(key, val){
                var pref = has_known_prefix(val);
                var sval = (pref!=null) ? pref_link(val, pref) : check_link1(val);
                str += "<tr class='major data_row'><td>type:</td><td>" + sval + "</td></tr>";
              });

              return str;
            }

            function f_id(value) {
              var pref = has_known_prefix(value);
              var sval = (pref!=null) ? pref_link(value, pref) : check_link1(value);
              return "<tr class='major data_row'><td>id:</td><td>" + sval + "</td></tr>";
            }


            function rowize_pairs(value) {
              var str = "";
              var tables = [];
              $.each(value, function(key, val){

                var pref = has_known_prefix(key);
                var key_str = (pref!=null) ? pref_link(key, pref) : check_keylink1(key);

                if (String(val).indexOf('[object Object]') === 0) {
                   var v_item_data = null;
                   var v_item_typed_data = null;

                   if ($.isArray(val) && val.length==1) {
                     var v = val[0];
                     var v_id = (typeof(v["id"])!== "undefined") ? v["id"] : null;
                     var v_type = (typeof(v["type"])!== "undefined") ? v["type"] : null;
                     var v_value = (typeof(v["value"])!== "undefined") ? v["value"] : null;
                     var v_properties = (typeof(v["properties"])!== "undefined") ? v["properties"] : null;

                     if (!v_id && !v_type && v_value && !v_properties)
                       v_item_data = check_link1(v_value);
                     else if (!v_id && v_type && v_value && !v_properties) {
                       var pref = has_known_prefix(v_type);
                       if (pref)
                         v_item_typed_data = check_link1(v_value)+"("+pref_link(v_type,pref)+")";
                       else
                         v_item_typed_data = check_link1(v_value)+"("+check_link1(v_type)+")";
                     }
                   }

                   if (v_item_data) {
                     str += "<tr class='data_row'><td>" + key_str + "</td><td>"+v_item_data+"</td></tr>";
                   }
                   else if (v_item_typed_data) {
                     str += "<tr class='data_row'><td>" + key_str + "</td><td>"+v_item_typed_data+"</td></tr>";
                   }
                   else {
                     item_id++;
                     tables.push(t.expand({ items: val, number: ++item_number}));
                     str += "<tr class='data_row'><td>" + key_str + "</td><td class='major'><i>ITEM " + item_id + "</i></td></tr>";
                   }
                }
                else {
                  for(var i=0; i < val.length; i++) {
                    var v = val[i];
                    var pref = has_known_prefix(v);
                    var sval = (pref!=null) ? pref_link(v, pref) : check_link1(v);
                    str += "<tr class='data_row'><td>" + key_str + "</td><td>" + sval + "</td></tr>";
                  }
                }
              });
              str += tables.join("");
              return str;
            }

            expanded = t.expand($.parseJSON(json_text));

            var tbl_start = "\
                  <table> \
                    <tbody> \
                    ";
            var tbl_end = "\
                    </tbody> \
                  </table> \
                  ";
            if (expanded.length > 0)
               expanded = tbl_start + expanded + tbl_end;

          } );
        }
        return expanded;
      }
    };

    return {
      converter: converter
    };

  }();
}
