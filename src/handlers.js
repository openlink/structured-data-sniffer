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

class Fix_Nano {
  constructor(start_id) 
  {
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this._tokens = 0;
    this._bad_data = false;
  }


  async parse(textData) 
  {
    var output = [];

    for(var i=0; i < textData.length; i++) 
    {
      var str = await this._parse_1(textData[i]);
      if (str)
        output.push(str);
    }
    return output;
  }


  async _parse_1(textData) 
  {
    var self = this;
    var _output = '';

    return new Promise(function (resolve, reject) {
      try {
        var lexer = N3.Lexer({ lineMode: false });
        var ttl_data = textData;
        var tok0;
        var tok1;

        lexer.tokenize(ttl_data, function (error, token) {
          if (token) {
            if (self._tokens == 0) {
              tok0 = token;
            } else if (self._tokens == 1) {
              tok1 = token;
            }
          }

          if (token && self._tokens ==0 &&
              !(token.type==="IRI"
                || token.type==="abbreviation"
                || token.type==="prefixed"
                || token.type==="prefix"
                || token.type==="PREFIX"
                || token.type[0]==="@"
                || token.type==="["
               )) {
            self._bad_data = true;
          }
          if (token && self._tokens ==1 &&
              !(token.type==="IRI"
                || token.type==="abbreviation"
                || token.type==="prefixed"
                || token.type==="prefix"
                || token.type==="PREFIX"
                || token.type===","
                || token.type===";"
                || token.type==="]"
               )) {
            self._bad_data = true;
          }

          if (token && self._tokens==1) {
            if ( (tok0.type === "prefixed" 
                 || tok0.type==="IRI" 
                 || tok0.type==="abbreviation"
                 )
                && 
                 (tok1.type==="," 
                 || tok1.type===";" 
                 || tok1.type==="]" 
                 || tok1.type==="PREFIX"
                 || tok1.type==="prefix"
                 )) {
              self._bad_data = true;
            }
          }

          if (self._tokens==2 && !self._bad_data) {
              _output = textData;
          }

          if (token && !error && !self._bad_data)
            self._tokens++;

          if (error || (token && token.type==="eof")) {
            self._tokens = 0;
            self._bad_data = false;
            resolve(_output);
          }
        });

      } catch (ex) {
        resolve('');
      }
    });
  }

}



class Handle_Microdata {
  constructor(make_ttl) {
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
  }

  parse(jsonData, docURL, bnode_types) 
  {
    var self = this;
    var ret_data = null;

    try
    {
      var conv = new MicrodataJSON_Converter();
      var out_data = conv.transform(jsonData, docURL);

      if (self._make_ttl)
        ret_data = new TTL_Gen(docURL, false, bnode_types).load(out_data);
      else
        ret_data = new HTML_Gen(docURL, bnode_types).load(out_data);

      return {data:ret_data, errors:[]};
    }
    catch (ex) {
      return {data:null, errors:[ex.toString()]};
    }
  }

}


class Handle_Turtle {
  constructor(start_id, make_ttl, for_query, bnode_types, skip_docpref) 
  {
    this.baseURI = null;
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.ns = new Namespace();
    this.ns_pref = null;
    this.ns_pref_size = 0;
    this.skip_error = true;
    this.skipped_error = [];
    this._pattern = /([0-9]*).$/gm;
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
    this.for_query = for_query;
    this.bnode_types = bnode_types || {};
    this.skip_docpref = skip_docpref;
  }

  async parse_nano(textData, docURL, _skip_error) {
    this.ns_pref = this.ns.get_ns_desc();
    this.ns_pref_size = this.ns.get_ns_size();
    this.skip_error = _skip_error;

    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';
    var srcData = [];

    for(var i=0; i < textData.length; i++)
    {
      try {
        var data = await this._parse_1(textData[i], docURL);
        if (this._make_ttl)
          output.push(data);
        else
          output += data;
        srcData.push(textData[i]);
      } catch(e) {
        console.log(e);
      }
    }
    return {data:output, errors: this.skipped_error, text:srcData};

  }

  async parse(textData, docURL) 
  {
    this.baseURI = docURL;
    var output = this._make_ttl ? [] : '';

    for(var i=0; i < textData.length; i++)
    {
      var data = await this._parse_1(textData[i], docURL);
      if (this._make_ttl)
        output.push(data);
      else
        output += data;
    }
    return {data:output, errors: this.skipped_error};
  }

  async _parse_1(textData, docURL) 
  {
    this.baseURI = docURL;
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        var store = new N3DataConverter();
        var parser = N3.Parser({baseIRI:self.baseURI, format:'text/n3'});
        var ttl_data = textData;

        if (self.ns_pref!==null)
          ttl_data = self.ns_pref + ttl_data;

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;
              error = sanitize_str(error);
              if (self.ns_pref_size>0) { // fix line in error message
                try {
                  var m = self._pattern.exec(error);
                  if (m!==null)
                    error = error.substr(0,m.index)+(parseInt(m[1])-self.ns_pref_size-1);
                } catch(e) {}
              }

              if (self.skip_error) {
                self.skipped_error.push(error);

                resolve('');
              }
              else
              {
                self.error = error;
                reject(self.error);
              }

            }
            else if (tr) {
              store.addTriple(tr.subject,
                              tr.predicate,
                              tr.object);
            }
            else {

              var triples = store.output;
              var output;

              if (self._make_ttl) {
                var ttl_data = new TTL_Gen(docURL, self.for_query, self.bnode_types, self.skip_docpref).load(triples);
                output = ttl_data==null?'':ttl_data;
              }
              else
              {
                var html_str =  new HTML_Gen(docURL).load(triples, self.start_id, self.bnode_types);
                output = html_str==null?'':html_str;
              }

              if (triples!==null && triples.length!==undefined)
                self.start_id+= triples.length;

              resolve(output);
            }
          });
      } catch (ex) {
        if (self.skip_error)  {
          self.skipped_error.push(""+ex.toString());
          resolve('');
        }
        else 
          reject(ex.toString());
      }
    });
  }

}



class Handle_JSONLD {
  constructor(make_ttl) 
  {
    this.start_id = 0;
    this.skip_error = true;
    this.skipped_error = [];
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
  }

  async parse(textData, docURL, bnode_types)
  {
    var output = '';
    var self = this;

    for(var i=0; i < textData.length; i++)
    {
      try {
        var jsonld_data = JSON.parse(textData[i]);
        if (jsonld_data != null) {
          try {
            var txt = JSON.stringify(jsonld_data, null, 2);
            if (txt)
              textData[i] = txt;
          } catch (e) {}

          var expanded = await jsonld.expand(jsonld_data, {base:docURL});
          var nquads = await jsonld.toRDF(expanded, {base:docURL, format: 'application/nquads', includeRelativeUrls: true});

          var handler = new Handle_Turtle(self.start_id, self._make_ttl, false, bnode_types);
          handler.skip_error = false;
          var ret = await handler.parse([nquads], docURL);
          if (ret.errors.length > 0) {
            self.skipped_error = self.skipped_error.concat(ret.errors);
          } else {
            output += ret.data;
            output += "\n\n";

            self.start_id += handler.start_id;
          }
        }
      } catch (ex) {
        if (textData[i].replace(/\s/g, '').length > 1) {
          if (self.skip_error)
            self.skipped_error.push(""+ex.toString());
          else 
            throw ex;
        }
      }
    }
    return {data:output, errors: this.skipped_error};
  }

}



class Handle_JSON {
  constructor(make_ttl) 
  {
    this.s_id = ':this';
    this.id = 0;
    this.start_id = 0;
    this.skip_error = true;
    this.skipped_error = [];
    this._make_ttl = false;
    if (make_ttl)
      this._make_ttl = make_ttl;
    this.baseURL = '';
    this.rep1 = /\(/g;
    this.rep2 = /\)/g;
    this.jprops = {}; 
  }

  gen_subj() {
    this.id++;
    return this.s_id+this.id;
  }


  check_pred(val) 
  {
    if ( val.match(/^http(s)?:\/\//) ) {
      val = "<"+val+">";
    } else {
      val = ':'+fixedEncodeURIComponent(val);
    }
    return val;
  }

  str2obj_val(s) {
    var qv = '"';

    if (s.indexOf("\n")!=-1 || s.indexOf("\r")!=-1) {
      qv = "'''";
      s = s.replace(/\\/g,'\\\\').replace(/\"/g,"\\\"");
    } else {
      s = s.replace(/\\/g,'\\\\').replace(/\'/g,"''").replace(/\"/g,"\\\"");
    }

    return qv+s+qv;
  }

  handle_simple(b, subj, p, o) 
  {
    if (o === null )
      return; // ignore

    var pred = this.check_pred(p);
    var xsd = 'http://www.w3.org/2001/XMLSchema';
    var obj_type = `${xsd}#string`;

    if (typeof o === 'number') {
      if (o % 1 === 0) {
        b.push(`${subj} ${pred} "${o}"^^<${xsd}#int> .`);
        obj_type = `${xsd}#int`;
      }
      else {
        b.push(`${subj} ${pred} "${o}"^^<${xsd}#double> .`);
        obj_type = `${xsd}#double`;
      }
    } else if (typeof o === 'string') {
      b.push(`${subj} ${pred} ${this.str2obj_val(o)} .`);
    } else if (typeof o === 'boolean') {
      b.push(`${subj} ${pred} "${o}"^^<${xsd}#boolean> .`);
      obj_type = `${xsd}#boolean`;
    } else {
      b.push(`${subj} ${pred} ${this.str2obj_val(o)} .`);
    }

    this.jprops[pred] = obj_type;
  }

  handle_arr(b, subj, p, o) 
  {
    if (o === null )
      return; // ignore

    if (typeof o === 'object') {
      var s = this.gen_subj();
      b.push(`${subj} ${this.check_pred(p)} ${s} .`);
      this.handle_obj(b, s, o);
    } else {
      this.handle_simple(b, subj, p, o);
    }
  }


  handle_obj(b, subj, obj)
  {
    if (obj === null )
      return; // ignore
    
    if (typeof obj === 'object') {

      var props = Object.keys(obj);

      if (props.length > 0)
        b.push(`${subj} a <http://www.w3.org/2002/07/owl#Thing> .`);

      for(var i=0; i < props.length; i++) {
        var p = props[i];
        var v = obj[p];

        if (typeof v === 'object') {
          if (Array.isArray(v)) {
            for(var j=0; j < v.length; j++) {
              this.handle_arr(b, subj, p, v[j]);
            }
          } else if (v!== null) {
            var s = this.gen_subj();
            b.push(`${subj} ${this.check_pred(p)} ${s} .`);
            this.handle_obj(b, s, v);
          }
        } else {
          this.handle_simple(b, subj, p, v);
        }
      }
    } else {
      this.handle_simple(b, subj, 'p', obj);
    } 
  }
  
  
  async parse(textData, docURL, bnode_types) 
  {
    this.baseURL = docURL;
    var self = this;
    var output = '';
    var json_text = [];

    for(var x=0; x < textData.length; x++)
    {
      try {
        var buf = [];
        var json_data = JSON.parse(textData[x]);
        if (json_data != null) 
        {
          try {
            json_text.push(JSON.stringify(json_data, null, 2));
          } catch(e) {
            json_text.push(textData[x]);
          }

          if (Array.isArray(json_data)) {
            for(var i=0; i < json_data.length; i++)
              self.handle_obj(buf, self.gen_subj(), json_data[i]);
          } else {
            self.handle_obj(buf, self.gen_subj(), json_data);
          }

          var lst = Object.keys(this.jprops);
          for(var i=0; i < lst.length; i++) {
            var p = lst[i];
            var p_type = this.jprops[p];
            buf.push(`[ a <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> ;
                      <http://schema.org/name> ${p} ;
                      <http://www.w3.org/2000/01/rdf-schema#range> <${p_type}> ;
                      <http://www.w3.org/2000/01/rdf-schema#domain> <http://www.w3.org/2002/07/owl#Thing> ] .`);
          }

          var ttl_data = '@prefix : <#> .\n' 
                        + buf.join('\n');
          var handler = new Handle_Turtle(self.start_id, self._make_ttl, false, bnode_types);
          handler.skip_error = false;
          var ret = await handler.parse([ttl_data], docURL);
          if (ret.errors.length > 0) {
            self.skipped_error = self.skipped_error.concat(ret.errors);
          } else {
            output += ret.data;
            output += "\n\n";

            self.start_id += handler.start_id;
          }
        }
      } catch (ex) {
        json_text.push(textData[x]);
        if (self.skip_error)
          self.skipped_error.push(""+ex.toString());
        else 
          throw ex;
      }
    }
    return {data:output, text:json_text, errors: this.skipped_error};
  }

}



class Handle_RDFa {
  constructor()
  {
  }

  parse(data, docURL, bnode_types) 
  {
    var str = new HTML_Gen(docURL, bnode_types).load(data);
    return {data:str, errors: []};
  }
}



//Convert N3 data to internal format
class N3DataConverter {
  constructor(options) 
  {
    this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
    this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    this.RDF_TYPE   = this.RDF_PREFIX + 'type';
    this.xsdString  = 'http://www.w3.org/2001/XMLSchema#string',
    this.output = [];
  }

  _IriOrBlank(entity) {
    // A blank node or list is represented as-is
    if (entity.termType !== 'NamedNode')
      return 'id' in entity ? entity.id : '_:' + entity.value;
    // Escape special characters
    return entity.value;
  }

  addTriple(n_subj, n_pred, n_obj)
  {
    var s = null;
    var o = null;
    var subj = this._IriOrBlank(n_subj);
    var pred = this._IriOrBlank(n_pred);
    var obj = (n_obj.termType==="Literal") ? n_obj.value : this._IriOrBlank(n_obj);

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
    if (s.props_obj === undefined)
      s.props_obj = new Object();

    var p = s.props[pred];
    var p_obj = s.props_obj[pred];
    if  (p === undefined) {
       s.props[pred] = [];
       s.props_obj[pred] = {};
    }

    p = s.props[pred];
    p_obj = s.props_obj[pred];

    if (!p_obj[obj])
    {
      p_obj[obj]=1;

      if (n_obj.termType==="Literal") {
        p.push({
           value:n_obj.value,
           type: (n_obj.datatypeString!==this.xsdString) ? n_obj.datatypeString : "",
           lang: n_obj.language
          });
      } else {
        p.push({iri :obj});
      }
    }
  }

}



//Convert Microdata JSON to internal format
class MicrodataJSON_Converter {
  constructor(options) 
  {
    this._LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;
    this.RDF_PREFIX = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
    this.RDF_TYPE   = this.RDF_PREFIX + 'type';
    this.output = [];
    this.last_Bnode = 0;
    this.baseURI;
  }

  transform(json, baseURI)
  {
    this.baseURI = baseURI;
    this.baseURL = new URL(baseURI);
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
      if (!out[i].s) {
        var bnode = self.new_bnode();
        out[i]["s"] = bnode;
      }
    }

    return out;
  }

  new_bnode()
  {
    this.last_Bnode++;
    return "_:bb"+this.last_Bnode;
  }

  expand_item(item)
  {
    var self =this;
    var out = { };
    var out_add = [];
    var retVal = { id:null, data:{}, data_add:[] };
    var i_props = null;
    var props = {};
    var id_ns = null;
    var id_type = this.baseURI.toString();

    retVal.data = out;
    retVal.data_add = out_add;
    out["props"] = props;

    //try get current NS
    if (item.type!==undefined) {
      id_type = fix_url(String(item.type));
      var namespace = new Namespace();
      if ($.isArray(item.type)) {
        for(var i=0; i<item.type.length; i++) {
          var v_type = fix_url(String(item.type[i]));
          id_ns = namespace.has_known_ns(v_type);
          if (id_ns)
            break;
        }
        if (!id_ns && item.type.length > 0)
          id_type = fix_url(String(item.type[0]));
      } else {
        var v_type = fix_url(String(item.type));
        id_ns = namespace.has_known_ns(fix_url(v_type));
        id_type = v_type;
      }
    }

    $.each(item, function(key, val)
     {
       if (key==="properties") {
         i_props = val;
       }
       else if (key==="id")
       {
         var v_val = fix_url(val);
         if (v_val.indexOf(':') === -1)
           v_val = ":"+v_val;
         out["s"]=v_val;
         retVal.id = v_val;
       }
       else if (key==="type")
       {
         if ($.isArray(val)) {
           for(var i=0; i<val.length; i++) {
             var v_val = fix_url(val[i]);
             if (v_val.indexOf(':') === -1)
               val[i] = { "iri" : ":"+v_val, typeid:1};
             else
               val[i] = { "iri" : v_val, typeid:1};
           }
         }
         else {
           var v_val = fix_url(val);
           if (v_val.indexOf(':') === -1)
               val = [{ "iri" : ":"+v_val, typeid:1}];
           else
               val = [{ "iri" : v_val, typeid:1}];
         }
         props[self.RDF_TYPE] = val;
       }
       else
       {
         var v_key = fix_url(key);
         if (v_key.indexOf(':') === -1)
            v_key = ":"+v_key;

         if ($.isArray(val))
           props[v_key]=val;
         else
           props[v_key]=[val];
       }
     });

      function fix_url(v) 
      {
        if (v && v.length > 1 && v.startsWith('//') && v.indexOf(':') === -1)
          return self.baseURL.protocol + v;
        else
          return v;
      }

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
         else if (val.substring(0,9) ==="nodeid://")
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
          if (id_ns) {
            key = id_ns.link+key;
          }
          else {
            var last = id_type[id_type.length-1];
            if (last==='#' || last==='/') {
              key = id_type + key;
            } else {
              var u = new URL(fix_url(id_type));
              if (u.hash) {
                u.hash = key;
                key = u.toString();
              } else if (u.pathname === '/') {
                u.pathname = key;
                key = u.toString();
              } else {
                var lst = u.pathname.split('/');
                lst[lst.length-1] = key;
                u.pathname = lst.join('/');
                key = u.toString();
              }
            }
          }
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

       if (key!==":unnamed")
         props[key] = v;

      });
    }

    return retVal;
  }

}



class Handle_RDF_XML {
  constructor(start_id) 
  {
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.skip_error = true;
    this.skipped_error = [];
  }

  async parse(textData, baseURL, bnode_types) 
  {
    var self = this;
    var output = '';

    for(var i=0; i < textData.length; i++)
    {
      try {
        var store=$rdf.graph();
        var rdf_data = textData[i];

        $rdf.parse(rdf_data, store, baseURL, 'application/rdf+xml');

        var ttl = $rdf.serialize(undefined, store, baseURL, "text/turtle");

        var handler = new Handle_Turtle(0, false, false, bnode_types);
        handler.skip_error = false;
        var ret = await handler.parse([ttl], baseURL);
        if (ret.errors.length > 0) {
          self.skipped_error = self.skipped_error.concat(ret.errors);
        } else {
          output += ret.data;
          output += "\n\n";

          self.start_id += handler.start_id;
        }

      } catch (ex) {
        if (self.skip_error)
          self.skipped_error.push(""+ex.toString());
        else 
          throw ex;
      }
    }
    return {data:output, errors: this.skipped_error};
  }

}



class Handle_CSV {
  constructor(start_id) 
  {
    this._output_ttl = [];
    this.start_id = 0;
    if (start_id!==undefined)
      this.start_id = start_id;
    this.skip_error = true;
    this.skipped_error = [];
  }

  async parse(textData, baseURL, bnode_types) 
  {
    var self = this;
    var output = '';

    for(var x=0; x < textData.length; x++)
    {
      try {
        var text = textData[x];
        if (text.trim().length <= 0) {
          continue;
        }
         
        var ttl = '@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n'
                 +'@prefix xsd: <http://www.w3.org/2001/XMLSchema#> . \n'
                 +'@prefix : <#> . \n\n';
        var res = Papa.parse(text, {skipEmptyLines:true, dynamicTyping:true});
        if (res.errors && res.errors.length > 0) {
            throw new Exception(res.errors[0].message);
        }

        var col = res.data[0];
        var col_type = [];
        var found = 0;

        for (var i=0; i < col.length; i++){
          var lst = col[i].split(':');
          if (lst.length > 1) {
            col[i] = lst.length > 2 ? lst[2] : lst[0];
            found++;
            switch(lst[1]) {
              case 'int':
                col_type[i] = 'integer';
                break;
              case 'long':
                col_type[i] = 'long';
                break;
              case 'float':
                col_type[i] = 'float';
                break;
              case 'double':
                col_type[i] = 'double';
                break;
              case 'boolean':
                col_type[i] = 'boolean';
                break;
              case 'byte':
                col_type[i] = 'byte';
                break;
              case 'short':
                col_type[i] = 'short';
                break;
              case 'datetime':
                col_type[i] = 'dateTime';
                break;
              case 'date':
                col_type[i] = 'date';
                break;
              case 'time':
                col_type[i] = 'time';
                break;
              case 'decimal':
                col_type[i] = 'decimal';
                break;
              case 'uuid':
              case 'string': 
              default:
                col_type[i] = 'string';
                break;
            }
          } else {
            col_type[i] = 'string';
          }
        }  
        if (!found) {
          col_type = [];
        }

        if (res.data.length > 1) {
          if (col_type.length === 0)
            for (var i=0; i < res.data[1].length; i++) {
              var v = res.data[1][i];
              if (typeof v === 'number') {
                var is_int = 1;
                var v_type = 'integer';
                for(var r=1; r < res.data.length; r++) {
                  v = res.data[r][i];
                  if (v) {
                    if (typeof v === 'number') {
                      if (is_int == 1 && (v % 1) !== 0) {
                        is_int = 0;
                        v_type = 'decimal;'
                      }
                    } 
                    else {
                      is_int = -1;
                      v_type = 'string';
                      break;
                    }

                  } else {
                    v_type = 'string';
                    break;
                  }
                }
                col_type.push(v_type);
              } else if (typeof v === 'boolean') {
                col_type.push('boolean'); 
              } else if (typeof v === 'string') {
                if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('mailto:') || v.startsWith('urn:') || v.startsWith('../'))
                  col_type.push('anyURI');
                else
                  col_type.push('string');
              } else {
                col_type.push('string');
              }
            }

        }

        ttl += '\n';

        var rep1 = /\(/g;
        var rep2 = /\)/g 

        for (var i=0; i < col.length; i++) {
          col[i] = fixedEncodeURIComponent(col[i]);
          ttl += ':'+col[i]+' rdf:domain :this .\n';
          ttl += ':'+col[i]+' rdf:range xsd:'+col_type[i]+' .\n';
          ttl += ':'+col[i]+' a <http://www.w3.org/1999/02/22-rdf-syntax-ns#Property> .\n';
        }

        ttl += '\n';

        for(var i=1; i < res.data.length; i++) {
          var d = res.data[i];
          var s = '[\n';

          for(var j=0; j < d.length; j++) {
            var val = d[j] ? ''+d[j] : '';
            var qv = '"';

            if (val.indexOf("\n")!=-1 || val.indexOf("\r")!=-1) {
              qv = "'''";
              val = val.replace(/\\/g,'\\\\').replace(/\"/g,"\\\"");
            } else {
              val = val.replace(/\\/g,'\\\\').replace(/\'/g,"''").replace(/\"/g,"\\\"");
            }

            s += ':'+col[j]+' '+qv+val+qv+'^^xsd:'+col_type[j]+' ;\n' ;
          }
          ttl += s +'].\n\n';
        }

        self._output_ttl.push(ttl);

        var handler = new Handle_Turtle(0, false, false, bnode_types);
        handler.skip_error = false;
        var ret = await handler.parse([ttl], baseURL);
        if (ret.errors.length > 0) {
          self.skipped_error = self.skipped_error.concat(ret.errors);
        } else {
          output += ret.data;
          output += "\n\n";

          self.start_id += handler.start_id;
        }

      } catch (ex) {
        if (self.skip_error)
          self.skipped_error.push(""+ex.toString());
        else 
          throw ex;
      }
    }
    return {data:output, ttl_data:self._output_ttl ,errors: this.skipped_error};
  }

}

