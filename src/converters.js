/*
 *  This file is part of the OpenLink Structured Data Sniffer
 *
 *  Copyright (C) 2015-2016 OpenLink Software
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


Convert_Turtle2JSON = function () {
  this.callback = null;
  this.baseURI = null;
  this.ns = new Namespace();
  this._pos = 0;
  this._output = [];
  this.ns_pref = null;
  this.skipped_error = [];
};


Convert_Turtle2JSON.prototype = {

  parse_ttl : function(ttlData, quadData, docURL, callback) {
    var self = this;
    if (quadData!==null && quadData.length > 0) {
      var handler = new Handle_Turtle(0, true);
      handler.parse_nano(quadData, docURL,
          function(error, data) {
            if (error) 
              self.skipped_error.push(error);

            self.skipped_error = self.skipped_error.concat(handler.skipped_error);

            if (data)
              ttlData = ttlData.concat(data);

            self.parse(ttlData, docURL, callback);
          });
    } else {
      this.parse(ttlData, docURL, callback);
    }
  },

  parse : function(textData, docURL, callback) {

    this.callback = callback;
    this.baseURI = docURL;
    var self = this;

    if (this._pos < textData.length) {
      var store = N3.Writer({ format: 'N-Triples' });
      var parser = N3.Parser();
      try {
        var ttl_data = textData[self._pos];

        parser.parse(ttl_data,
          function (error, tr, prefixes) {
            if (error) {
              error = ""+error;

              self.skipped_error.push(error);
              self._pos++;

              if (self._pos < textData.length)
                self.parse(textData, docURL, self.callback);
              else
                self.callback(null, self._output);
            }
            else if (tr) {
              store.addTriple(self.fixNode(tr.subject), 
                              self.fixNode(tr.predicate), 
                              self.fixNode(tr.object));
            }
            else {
              var context = prefixes;  

              store.end(function (error, ttl_text) { 
                self._pos++;

                if (error) {
                  self.skipped_error.push(error);
                  
                  if (self._pos < textData.length)
                    self.parse(textData, docURL, self.callback);
                  else
                    self.callback(null, self._output);
                }

                jsonld.fromRDF(ttl_text, {format: 'application/nquads'}, 
                   function(error, doc) 
                   {
                     if (error) {
                       self.skipped_error.push(error);

                       if (self._pos < textData.length)
                         self.parse(textData, docURL, self.callback);
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
                           self.parse(textData, docURL, self.callback);
                         else
                           self.callback(null, self._output);
                       });
                     } 
                   });
              });
            }
          });
      } catch (ex) {
        self.callback(ex.toString(), null);
      }
    } else {
        self.callback(null, this._output);
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


