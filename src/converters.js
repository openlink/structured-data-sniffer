/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2019 OpenLink Software
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



Convert_Turtle = function () {
  this.callback = null;
  this.baseURI = null;
  this.ns = new Namespace();
  this._pos = 0;
  this._output = [];
  this.ns_pref = null;
  this.skipped_error = [];
};


Convert_Turtle.prototype = {

  _fix_nano_ttl : function(ttlData, nanoData, baseURL, callback) {
    var self = this;
    if (nanoData!==null && nanoData.length > 0) {
      var handler = new Handle_Turtle(0, true);
      handler.parse_nano(nanoData, baseURL,
          function(error, data) {
            if (error)
              self.skipped_error.push(error);

            self.skipped_error = self.skipped_error.concat(handler.skipped_error);

            if (data)
              ttlData = ttlData.concat(data);

            callback(ttlData);
          });
    } else {
      callback(ttlData);
    }
  },

  to_json : function(ttlData, nanoData, baseURL, callback) {
    var self = this;
    this._fix_nano_ttl(ttlData, nanoData, baseURL,
       function(fixed_ttl) {
           self._to_json_exec(fixed_ttl, baseURL, callback);
       });
  },


  to_rdf : function(ttlData, nanoData, baseURL, callback) {
    var self = this;
    this._fix_nano_ttl(ttlData, nanoData, baseURL,
       function(fixed_ttl) {
           self._to_rdf_exec(fixed_ttl, baseURL, callback);
       });
  },


  _to_rdf_exec : function(textData, baseURL, callback) {

    this.callback = callback;
    this.baseURI = baseURL;
    var self = this;

    if (this._pos < textData.length) {
      try {
        var store=$rdf.graph();
        var ttl_data = textData[self._pos];

        $rdf.parse(ttl_data, store, baseURL, 'text/turtle');

        var rdf_data = $rdf.serialize(undefined, store, baseURL, "application/rdf+xml");
        self._pos++;
        self._output.push(rdf_data);

        if (self._pos < textData.length)
          self._to_rdf_exec(textData, self.baseURI, self.callback);
        else
          self.callback(null, self._output);

      } catch (ex) {
        self.skipped_error.push(""+ex.toString());
        self._pos++;

        if (self._pos < textData.length)
          self._to_rdf_exec(textData, self.baseURL, self.callback);
        else
          self.callback(null, self._output);
      }
    } else {
        self.callback(null, this._output);
    }
  },


  _to_json_exec : function(textData, baseURL, callback) {

    this.callback = callback;
    this.baseURI = baseURL;
    var self = this;

    if (this._pos < textData.length) {
      try {
        var store = N3.Writer({ format: 'N-Triples' });
        var parser = N3.Parser({baseIRI:self.baseURI});
        var ttl_data = textData[self._pos];

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;

              self.skipped_error.push(error);
              self._pos++;

              if (self._pos < textData.length)
                self._to_json_exec(textData, self.baseURI, self.callback);
              else
                self.callback(null, self._output);
            }
            else if (tr) {
              store.addQuad(tr.subject,
                            tr.predicate,
                            tr.object);
            }
            else {
              var context = prefixes;

              store.end(function (error, ttl_text) {
                self._pos++;

                if (error) {
                  self.skipped_error.push(error);

                  if (self._pos < textData.length)
                    self._to_json_exec(textData, self.baseURI, self.callback);
                  else
                    self.callback(null, self._output);
                }

                jsonld.fromRDF(ttl_text, {format: 'application/nquads'},
                   function(error, doc)
                   {
                     if (error) {
                       self.skipped_error.push(error+(error.details?JSON.stringify(error.details,undefined, 2):""));

                       if (self._pos < textData.length)
                         self._to_json_exec(textData, self.baseURI, self.callback);
                       else
                         self.callback(null, self._output);
                     }
                     else {
                       jsonld.compact(doc, context, function(error, compacted) {
                         if (error)
                           self.skipped_error.push(error);
                         else
                           self._output.push(JSON.stringify(compacted, null, 2));

                         if (self._pos < textData.length)
                           self._to_json_exec(textData, self.baseURI, self.callback);
                         else
                           self.callback(null, self._output);
                       });
                     }
                   });
              });
            }
          });
      } catch (ex) {
        self.skipped_error.push(""+ex.toString());
        self._pos++;

        if (self._pos < textData.length)
          self._to_json_exec(textData, self.baseURL, self.callback);
        else
          self.callback(null, self._output);
      }
    } else {
        self.callback(null, this._output);
    }

  },

}



Convert_RDF_XML = function (make_ttl) {
  this.callback = null;
  this.skipped_error = [];
  this._output = [];
  this._pos = 0;
};

Convert_RDF_XML.prototype = {

  to_ttl : function(textData, baseURL, callback) {
    var self = this;
    this.callback = callback;
    this.baseURI = baseURL;

    if (this._pos < textData.length) {
      try {
        var rdf_data = textData[self._pos];
        var store=$rdf.graph();

        $rdf.parse(rdf_data, store, baseURL, "application/rdf+xml");
        var ttl_data = $rdf.serialize(undefined, store, baseURL, "text/turtle");
        self._pos++;
        self._output.push(ttl_data);

        if (self._pos < textData.length)
          self.to_ttl(textData, self.baseURI, self.callback);
        else
          self.callback(null, self._output);

      } catch (ex) {
        self.skipped_error.push(""+ex.toString());
        self._pos++;

        if (self._pos < textData.length)
          self.to_rdf(textData, self.baseURL, self.callback);
        else
          self.callback(null, self._output);
      }
    } else {
      self.callback(null, this._output);
    }
  },


  to_json: function(textData, baseURL, callback) {
    var self = this;
    this.callback = callback;
    this.baseURI = baseURL;

    if (this._pos < textData.length) {
      try {
        var rdf_data = textData[self._pos];
        var store=$rdf.graph();

        $rdf.parse(rdf_data, store, baseURL, "application/rdf+xml");
        var ttl_data = $rdf.serialize(undefined, store, baseURL, "text/turtle");

        var conv = new Convert_Turtle();
        conv.to_json([ttl_data], null, self.baseURI,
          function(error, json_data) {
            if (error)
              self.skipped_error.push(error);

            if (conv.skipped_error && conv.skipped_error.length > 0)
              self.skipped_error = self.skipped_error.concat(conv.skipped_error);

            self._pos++;
            self._output.push(json_data);

            if (self._pos < textData.length)
              self.to_json(textData, self.baseURI, self.callback);
            else
              self.callback(null, self._output);
          });

      } catch (ex) {
        self.skipped_error.push(""+ex.toString());
        self._pos++;

        if (self._pos < textData.length)
          self.to_rdf(textData, self.baseURL, self.callback);
        else
          self.callback(null, self._output);
      }
    } else {
      self.callback(null, this._output);
    }
  },

}


Convert_JSONLD = function () {
  this.callback = null;
  this._pos = 0;
  this._output = [];
  this.start_id = 0;
  this.skipped_error = [];
};

Convert_JSONLD.prototype = {

  to_ttl : function(textData, baseURL, callback) {
    this.callback = callback;
    var self = this;

    function handle_error(error)
    {
      self.skipped_error.push(""+error);
      self._pos++;

      if (self._pos < textData.length)
        self.parse(textData, baseURL, self.callback);
      else
        self.callback(null, self._output);
    }


    if (this._pos < textData.length)
    {
      try {
        jsonld_data = JSON.parse(textData[this._pos]);
        if (jsonld_data != null) {
          jsonld.expand(jsonld_data,
            function(error, expanded) {
              if (error) {
                handle_error(error);
              }
              else {
                jsonld.toRDF(expanded, {format: 'application/nquads', includeRelativeUrls: true},
                  function(error, nquads) {
                    if (error) {
                      handle_error(error);
                    }
                    else {
                      var handler = new Handle_Turtle(self.start_id, true);
                      handler.skip_error = false;
                      handler.parse([nquads], baseURL, function(error, html_data) {
                        if (error) {
                          handle_error(error);
                        }
                        else {
                          self._output.push(html_data);
                          self._pos++;
                          self.start_id += handler.start_id;

                          if (self._pos < textData.length)
                            self.parse(textData, baseURL, self.callback);
                          else
                            self.callback(null, self._output);
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
        handle_error(ex.toString());
      }

    } else {
       self.callback(null, this._output);
    }
  },


  to_rdf : function(textData, baseURL, callback)
  {
    var self = this;
    this.callback = callback;
    this.baseURI = baseURL;

    if (this._pos < textData.length) {
      try {
        var store=$rdf.graph();
        var ttl_data = textData[self._pos];

        $rdf.parse(ttl_data, store, baseURL, "application/ld+json");

        var rdf_data = $rdf.serialize(undefined, store, baseURL, "application/rdf+xml");
        self._pos++;
        self._output.push(rdf_data);

        if (self._pos < textData.length)
          self.to_rdf(textData, self.baseURI, self.callback);
        else
          self.callback(null, self._output);

      } catch (ex) {
        self.skipped_error.push(""+ex.toString());
        self._pos++;

        if (self._pos < textData.length)
          self.to_rdf(textData, self.baseURL, self.callback);
        else
          self.callback(null, self._output);
      }
    } else {
        self.callback(null, this._output);
    }
  },



}
