/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015 OpenLink Software
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

Namespace = function() {
  this.ns_list = {
       "grddl": "http://www.w3.org/2003/g/data-view#",
          "ma": "http://www.w3.org/ns/ma-ont#",
         "owl": "http://www.w3.org/2002/07/owl#",
         "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
        "rdfa": "http://www.w3.org/ns/rdfa#",
        "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
         "rif": "http://www.w3.org/2007/rif#",
        "skos": "http://www.w3.org/2004/02/skos/core#",
      "skosxl": "http://www.w3.org/2008/05/skos-xl#",
         "wdr": "http://www.w3.org/2007/05/powder#",
        "void": "http://rdfs.org/ns/void#",
        "wdrs": "http://www.w3.org/2007/05/powder-s#",
         "xhv": "http://www.w3.org/1999/xhtml/vocab#",
         "xml": "http://www.w3.org/XML/1998/namespace",
         "xsd": "http://www.w3.org/2001/XMLSchema#",

          "sd": "http://www.w3.org/ns/sparql-service-description#",
         "org": "http://www.w3.org/ns/org#",
        "gldp": "http://www.w3.org/ns/people#",
         "cnt": "http://www.w3.org/2008/content#",
        "dcat": "http://www.w3.org/ns/dcat#",
        "earl": "http://www.w3.org/ns/earl#",
          "ht": "http://www.w3.org/2006/http#",
         "ptr": "http://www.w3.org/2009/pointers#",

          "cc": "http://creativecommons.org/ns#",
        "ctag": "http://commontag.org/ns#",

     "dcterms": "http://purl.org/dc/terms/",
        "foaf": "http://xmlns.com/foaf/0.1/",
          "gr": "http://purl.org/goodrelations/v1#",
        "ical": "http://www.w3.org/2002/12/cal/icaltzd#",
          "og": "http://ogp.me/ns#",
         "rev": "http://purl.org/stuff/rev#",
        "sioc": "http://rdfs.org/sioc/ns#",
           "v": "http://rdf.data-vocabulary.org/#",
      "schema": "http://schema.org/",


       "dawgt": "http://www.w3.org/2001/sw/DataAccess/tests/test-dawg#",
     "dbpedia": "http://dbpedia.org/resource/",
     "dbpprop": "http://dbpedia.org/property/",
          "dc": "http://purl.org/dc/elements/1.1/",
          "fn": "http://www.w3.org/2005/xpath-functions/#",

         "geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",
          "go": "http://purl.org/obo/owl/GO#",
         "ldp": "http://www.w3.org/ns/ldp#",
        "math": "http://www.w3.org/2000/10/swap/math#",
        "mesh": "http://purl.org/commons/record/mesh/",
          "mf": "http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#",
         "nci": "http://ncicb.nci.nih.gov/xml/owl/EVS/Thesaurus.owl#",
         "obo": "http://www.geneontology.org/formats/oboInOwl#",
         "ogc": "http://www.opengis.net/",
      "ogcgml": "http://www.opengis.net/ont/gml#",
       "ogcgs": "http://www.opengis.net/ont/geosparql#",
      "ogcgsf": "http://www.opengis.net/def/function/geosparql/",
      "ogcgsr": "http://www.opengis.net/def/rule/geosparql/",
       "ogcsf": "http://www.opengis.net/ont/sf#",
     "product": "http://www.buy.com/rss/module/productV2/",
     "protseq": "http://purl.org/science/protein/bysequence/",

       "rdfdf": "http://www.openlinksw.com/virtrdf-data-formats#",
          "sc": "http://purl.org/science/owl/sciencecommons/",
       "scovo": "http://purl.org/NET/scovo#",
       "vcard": "http://www.w3.org/2001/vcard-rdf/3.0#",
   "vcard2006": "http://www.w3.org/2006/vcard/ns#",
    "virtcxml": "http://www.openlinksw.com/schemas/virtcxml#",
     "virtrdf": "http://www.openlinksw.com/schemas/virtrdf#",
        "void": "http://rdfs.org/ns/void#",
          "xf": "http://www.w3.org/2004/07/xpath-functions",

       "xsl10": "http://www.w3.org/XSL/Transform/1.0",
     "xsl1999": "http://www.w3.org/1999/XSL/Transform",
       "xslwd": "http://www.w3.org/TR/WD-xsl",
        "yago": "http://dbpedia.org/class/yago/",

         "rsa": "http://www.w3.org/ns/auth/rsa#",
        "cert": "http://www.w3.org/ns/auth/cert#",
     "oplcert": "http://www.openlinksw.com/schemas/cert#",
     "twitter": "https://dev.twitter.com/cards/markup#>"
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
  
  

Handle_Microdata = function () {
  var callback = null;
};

Handle_Microdata.prototype = {
  parse : function(jsonData, docURL, callback) {
    this.callback = callback;
    var self = this;
    try 
    {
      var conv = new MicrodataJSON_Converter();
      var out_data = conv.transform(jsonData, docURL);

      var html_data = new HTML_Gen().load(out_data);
      self.callback(null, html_data);
    } 
    catch (ex) {
      self.callback(ex.toString(), null);
    }
  }

}



Handle_Turtle = function () {
  var callback = null;
  var baseURI = null;
};

Handle_Turtle.prototype = {

  parse : function(textData, docURL, callback) {
    this.callback = callback;
    this.baseURI = docURL;

    var store = new N3DataConverter();
    var parser = N3.Parser();
    var self = this;
    try {
      parser.parse(textData,
        function (error, tr, prefixes) {
          if (error) {
            self.error = ""+error;
            self.callback(self.error, null);
          }
          else if (tr) {
            store.addTriple(self.fixNode(tr.subject), 
                            self.fixNode(tr.predicate), 
                            self.fixNode(tr.object));
          }
          else {
            var str = new HTML_Gen().load(store.output);
            self.callback(null, str);
          }
        });
    } catch (ex) {
      self.callback(ex.toString(), null);
    }
  },


  fixNode : function (n) 
  {
     if ( n==="")
         return this.baseURI;
     else if (N3.Util.isIRI(n)) {
       if (n==="")
         return this.baseURI;
       else if (n.substring(0,1)==="#") 
         return this.baseURI+n;
       else if (n.substring(0,1)===":") 
         return this.baseURI+n;
       else
         return n;
     } else {
       return n;
     }
  }

}




Handle_JSONLD = function () {
  var callback = null;
};

Handle_JSONLD.prototype = {

  parse : function(textData, docURL, callback) {
    this.callback = callback;
    var self = this;
    try {
      jsonld_data = JSON.parse(textData);
      if (jsonld_data != null) {
        jsonld.expand(jsonld_data, 
          function(err, expanded) {
            if (err) {
              self.callback(""+err, null);
            }
            else {
              jsonld.toRDF(expanded, {format: 'application/nquads'}, 
                function(err, nquads) {
                  if (err) {
                    self.callback(""+err, null);
                  }
                  else {
                    var handler = new Handle_Turtle();
                    handler.parse(nquads, docURL, function(error, html_data) {
                      if (error) {
                        self.callback(""+error, null);
                      }
                      else {
                        self.callback(null, html_data);
                      }
                    });
                  }
              });
            }
          })
      }
      else
        self.callback(null, null);
    } catch (ex) {
      self.callback(ex.toString(), null);
    }
  }


}



Handle_RDFa = function () {
  var callback = null;
};

Handle_RDFa.prototype = {

  parse : function(data, callback) {
    this.callback = callback;

    var self = this;
    try {
      var str = new HTML_Gen().load(data);
      self.callback(null, str);
    } catch (ex) {
      self.callback(ex.toString(), null);
    }
  }

}






//Convert N3 data to internal format
function N3DataConverter(options) {
  this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
  this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
  this.RDF_TYPE   = this.RDF_PREFIX + 'type';
  this.output = [];
}

N3DataConverter.prototype = {
  addTriple: function (subj, pred, obj) 
  {
      var s = null;

      for(var i=0; i < this.output.length; i++)
        if (this.output[i].s === subj) {
          s = this.output[i];
          break;
        }

      if (s == null) {
        s = {s:subj, n: this.output.length+1};
        this.output.push(s);
      }

      if (s.props === undefined) 
        s.props = new Object();
      
      var p = s.props[pred];
      if  (p === undefined) {
         s.props[pred] = [];
      }

      p = s.props[pred];

      if (obj[0] !=='"') {
        p.push({iri :obj});
      }
      else {
        var match = this._LiteralMatcher.exec(obj);
        if (!match) throw new Error('Invalid literal: ' + obj);
        p.push({
             value:match[1], 
             type:match[2], 
             lang:match[3]});
      }
  }
}


//Convert Microdata JSON to internal format
function MicrodataJSON_Converter(options) {
  this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
  this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
  this.RDF_TYPE   = this.RDF_PREFIX + 'type';
  this.output = [];
  this.last_Bnode = 0;
  this.baseURI;
}

MicrodataJSON_Converter.prototype = {
  transform: function (json, baseURI) 
  {
      this.baseURI = baseURI;
      var self = this;
      var out = [];

      for(var i=0; i < json.items.length; i++)
      {
        var item = json.items[i];
        var rc = this.expand_item(item);
        out.push(rc.data);
        out = out.concat(rc.data_add);
      }

      for(var i=0; i < out.length; i++)
      {
        out[i]["n"] = i+1;
        if (!out[i].s)
          out[i]["s"] = baseURI;
      }

      return out;
  },

  new_bnode : function() 
  {
    this.last_Bnode++;
    return "_:bb"+this.last_Bnode;
  },

  expand_item : function(item) 
  {
    var self =this;
    var out = { };
    var out_add = [];
    var retVal = { id:null, data:{}, data_add:[] };
    var i_props = null;
    var props = {};
    var id_ns = null;

    retVal.data = out;
    retVal.data_add = out_add;
    out["props"] = props;

    //try get current NS
    if (item.type!==undefined) {
      var ns_list = new Namespace();
      if ($.isArray(item.type)) {
        for(var i=0; i<item.type.length; i++) {
          id_ns = ns_list.has_known_ns(String(item.type[i]));
          if (id_ns)
            break;
        }
      } else {
        id_ns = ns_list.has_known_ns(String(item.type));
      }
    }


    $.each(item, function(key, val) 
     {
       if (key==="properties") {
         i_props = val;
       }
       else if (key==="id") 
       {
         if (val.indexOf(':') === -1)
           val = ":"+val;
         out["s"]=val;
         retVal.id = val;
       } 
       else if (key==="type") 
       {
         if ($.isArray(val)) {
           for(var i=0; i<val.length; i++) {
             if (val[i].indexOf(':') === -1)
               val[i] = { "iri" : ":"+val[i]};
             else
               val[i] = { "iri" : val[i]};
           } 
         } 
         else {
           if (val.indexOf(':') === -1)
               val = [{ "iri" : ":"+val}];
           else
               val = [{ "iri" : val}];
         } 
         props[self.RDF_TYPE] = val;
       } 
       else 
       {
         if (key.indexOf(':') === -1)
            key = ":"+key;

         if ($.isArray(val))
           props[key]=val;
         else
           props[key]=[val];
       }
     });


      function expand_sub_item(parent, val) 
      {
         var rc = self.expand_item(val);
         if (!rc.id) {
           var bnode = self.new_bnode();
           rc.id = bnode;
           rc.data.s = bnode;
         }
         parent.push({ "iri" : rc.id });
         out_add.push(rc.data);
         for(var i=0; i<rc.data_add.length; i++)
           out_add.push(rc.data_add[i]);
      }

      function handle_val(v_lst, val)
      {
         if (String(val).indexOf('[object Object]') === 0)
           expand_sub_item(v_lst, val); 
         else if (val.substring(0,7) ==="http://")
           v_lst.push({ "iri" : val});
         else if (val.substring(0,8) ==="https://")
           v_lst.push({ "iri" : val});
         else
           v_lst.push({ "value" : val}); //??todo parse literal
/**
      else {
        var match = this._LiteralMatcher.exec(obj);
        if (!match) throw new Error('Invalid literal: ' + obj);
        p.push({
             value:match[1], 
             type:match[2], 
             llang:match[3]});
      }
****/
      }

    
    if (i_props) {
      $.each(i_props, function(key, val) 
      {
        if (key.indexOf(':') === -1) {
          if (id_ns) 
            key = id_ns.link+key;
          else
            key = ":"+key;
        }

       var v = [];
/**
       if (!$.isArray(val) && String(val).indexOf('[object Object]') === 0)
       {
           expand_sub_item(v, val);
       }
       else {
         for(var i=0; i<val.length; i++) {
           if (String(val[i]).indexOf('[object Object]') === 0) //isArray lenght=1, el == Object
             expand_sub_item(v, val[i]); 
           else if (val[i].substring(0,7) ==="http://")
             v.push({ "iri" : val[i]});
           else if (val[i].substring(0,8) ==="https://")
             v.push({ "iri" : val[i]});
           else
             v.push({ "value" : val[i]}); 
         }
       }
**/
       if ($.isArray(val))
       {
         for(var i=0; i<val.length; i++)
           handle_val(v, val[i]);
       }
       else 
       {
         handle_val(v, val);
       }

       props[key] = v;
        
      });
    }

    return retVal;
  }

}
