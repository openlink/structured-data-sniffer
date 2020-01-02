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



class Convert_Turtle{
  constructor() 
  {
    this.baseURI = null;
    this.skipped_error = [];
  }


  async fix_ttl(ttlData, baseURL)
  {
    var self = this;
    var handler = new Handle_Turtle(0, true);

    return new Promise(function (resolve, reject) {
      handler.parse(ttlData, baseURL,
        function(error, data) {
          if (error)
            self.skipped_error.push(error);

          self.skipped_error = self.skipped_error.concat(handler.skipped_error);

          resolve(data);
        });
    });
  }

  async _fix_nano_ttl(ttlData, nanoData, baseURL) 
  {
    var self = this;
    if (nanoData!==null && nanoData.length > 0) {
      var handler = new Handle_Turtle(0, true);
      return new Promise(function (resolve, reject) {

        handler.parse_nano(nanoData, baseURL,
          function(error, data) {
            if (error)
              self.skipped_error.push(error);

            self.skipped_error = self.skipped_error.concat(handler.skipped_error);

            if (data)
              ttlData = ttlData.concat(data);

            resolve(ttlData);
          });
      });
    } else {
      return ttlData;
    }
  }

  async to_json(ttlData, nanoData, baseURL) 
  {
    var fixed_ttl = await this._fix_nano_ttl(ttlData, nanoData, baseURL);
    var output = [];

    for(var i=0; i < fixed_ttl.length; i++)
    {
      var str = await this._to_json_exec(fixed_ttl[i], baseURL);
      output.push(str);
    }
    return output;
  }


  async to_rdf(ttlData, nanoData, baseURL, callback) 
  {
    var fixed_ttl = await this._fix_nano_ttl(ttlData, nanoData, baseURL);
    var output = [];

    for(var i=0; i < fixed_ttl.length; i++)
    {
      output.push(this._to_rdf_exec(fixed_ttl[i], baseURL));
    }

    return output;
  }


  _to_rdf_exec(textData, baseURL) 
  {
    try {
      var store=$rdf.graph();
      var ttl_data = textData;

      $rdf.parse(ttl_data, store, baseURL, 'text/turtle');

      return $rdf.serialize(undefined, store, baseURL, "application/rdf+xml");
    } catch (ex) {
      this.skipped_error.push(""+ex.toString());
      return '';
    }
  }



  async _to_json_exec(ttl_data, baseURL) 
  {
    this.baseURI = baseURL;
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        var store = N3.Writer({ format: 'N-Triples' });
        var parser = N3.Parser({baseIRI:self.baseURI});

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;

              self.skipped_error.push(error);
              resolve('');
            }
            else if (tr) {
              store.addQuad(tr.subject,
                            tr.predicate,
                            tr.object);
            }
            else {
              var context = prefixes;

              store.end(function (error, ttl_text) {

                if (error) {
                  self.skipped_error.push(error);
                  resolve('');
                }

                jsonld.fromRDF(ttl_text, {format: 'application/nquads'},
                   function(error, doc)
                   {
                     if (error) {
                       self.skipped_error.push(error+(error.details?JSON.stringify(error.details,undefined, 2):""));
                       resolve('');
                     }
                     else {
                       jsonld.compact(doc, context, function(error, compacted) {
                         if (error) {
                           self.skipped_error.push(error);
                           //resolve('');
                           var json = {'@context':context, '@graph':doc};
                           resolve(JSON.stringify(json, null, 2));
                         }
                         else {
                           resolve(JSON.stringify(compacted, null, 2));
                         }
                       });
                     }
                   });
              });
            }
          });
      } catch (ex) {
        this.skipped_error.push(""+ex.toString());
        resolve('');
      }
    });
  }

}



class Convert_RDF_XML { 
  constructor() {
    this.skipped_error = [];
  }

  to_ttl(textData, baseURL) {
    var output = [];

    for(var i=0; i < textData.length; i++)
    {
      try {
        var rdf_data = textData[i];
        var store=$rdf.graph();

        $rdf.parse(rdf_data, store, baseURL, "application/rdf+xml");
        var ttl_data = $rdf.serialize(undefined, store, baseURL, "text/turtle");
        output.push(ttl_data);

      } catch (ex) {
        this.skipped_error.push(""+ex.toString());
      }
    }
    return output;
  }


  async to_json(textData, baseURL) {
    var output = [];

    for(var i=0; i < textData.length; i++)
    {
      try {
        var rdf_data = textData[i];
        var store=$rdf.graph();

        $rdf.parse(rdf_data, store, baseURL, "application/rdf+xml");
        var ttl_data = $rdf.serialize(undefined, store, baseURL, "text/turtle");

        var conv = new Convert_Turtle();
        var str = await conv.to_json([ttl_data], null, baseURL);
        output.push(str);

      } catch (ex) {
        this.skipped_error.push(""+ex.toString());
      }
    }

    return output;
  }

}



class Convert_JSONLD {
  constructor() {
    this._output = [];
    this.start_id = 0;
    this.skipped_error = [];
  }

  async to_ttl(textData, baseURL) 
  {
    var output = [];

    for(var i=0; i < textData.length; i++)
    {
      var str = await this._to_ttl(textData[i], baseURL);
      output = output.concat(str);
    }
    return output;
  }

  async _to_ttl(textData, baseURL) 
  {
    var self = this;

    return new Promise(function (resolve, reject) {
      try {
        jsonld_data = JSON.parse(textData);
        if (jsonld_data != null) {
          jsonld.expand(jsonld_data,
            function(error, expanded) {
              if (error) {
                self.skipped_error.push(""+error);
                resolve('');
              }
              else {
                jsonld.toRDF(expanded, {base:baseURL, format: 'application/nquads', includeRelativeUrls: true},
                  function(error, nquads) {
                    if (error) {
                      self.skipped_error.push(""+error);
                      resolve('');
                    }
                    else {
                      var handler = new Handle_Turtle(self.start_id, true);
                      handler.skip_error = false;
                      handler.parse([nquads], baseURL, function(error, html_data) {
                        if (error) {
                          self.skipped_error.push(""+error);
                          resolve('');
                        }
                        else {
                          self.start_id += handler.start_id;
                          resolve(html_data);
                        }
                      });
                    }
                });
              }
            })
        }
        else
          resolve('');
      } catch (ex) {
        self.skipped_error.push(""+ex);
        resolve('');
      }

    });
  }



  async to_rdf(textData, baseURL)
  {
    var output = [];
    this.baseURI = baseURL;

    var ttl_data = await this.to_ttl(textData, baseURL);

    for(var i=0; i < ttl_data.length; i++)
    {
      output.push(this._to_rdf_exec(ttl_data[i], baseURL));
    }

    return output;
  }


  _to_rdf_exec(textData, baseURL) 
  {
    try {
      var store=$rdf.graph();
      var ttl_data = textData;

      $rdf.parse(ttl_data, store, baseURL, 'text/turtle');

      return $rdf.serialize(undefined, store, baseURL, "application/rdf+xml");
    } catch (ex) {
      this.skipped_error.push(""+ex.toString());
      return '';
    }
  }

}

