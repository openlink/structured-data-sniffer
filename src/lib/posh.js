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

var POSH = (function () {

  'use strict';


  function POSH(uriStr) {
    this.terms = {};
    this.terms["description"] = "schema:description";
    this.terms["describedby"] = "wdrs:describedby";
    this.facebook_vision = "Image may contain: ";

    this.namespace = new Namespace();

    this.prefixes = {
        "xhv": "http://www.w3.org/1999/xhtml/vocab#",
        "wdrs": "http://www.w3.org/2007/05/powder-s#",

	"opltw": "http://www.openlinksw.com/schemas/twitter#",
	"schema":"http://schema.org/",
	"schemavideo":"http://schema.org/VideoObject#",
        "formats": "http://www.w3.org/ns/formats/",
	"geo": "http://www.w3.org/2003/01/geo/wgs84_pos#",

        "foaf": "http://xmlns.com/foaf/0.1/",
        "dc": "http://purl.org/dc/elements/1.1/",
        "sioc":"http://rdfs.org/sioc/ns#",
        "rdfs":"http://www.w3.org/2000/01/rdf-schema#",
        "rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      };

    this._prefixed = /^((?:[A-Za-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])(?:\.?[\-0-9A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff])*)?:((?:(?:[0-:A-Z_a-z\xc0-\xd6\xd8-\xf6\xf8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])(?:(?:[\.\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~])*(?:[\-0-:A-Z_a-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u037f-\u1fff\u200c\u200d\u203f\u2040\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd]|[\ud800-\udb7f][\udc00-\udfff]|%[0-9a-fA-F]{2}|\\[!#-\/;=?\-@_~]))?)?)(?=\.?[,;\s#()\[\]\{\}"'<])/;


    function fix_twitterid(content) {
      var o = "";
      var p = content.indexOf("@");

      if (p!=-1)
        o +=content.substring(p+1);

      return "https://twitter.com/"+o;
    }

    function fix_twitter_creator(content) {
      var o = "";
      var p = content.indexOf("@");

      if (p!=-1)
        o +=content.substring(p+1);

      return "https://twitter.com/"+o+"#this";
    }

    this.twcard = {
        "meta@name='twitter:url'": {p:"schema:mainEntityOfPage", o:"iri:content"},
        "meta@name='og:url'"     : {p:"schema:mainEntityOfPage", o:"iri:content"},
        "meta@property='og:url'" : {p:"schema:mainEntityOfPage", o:"iri:content"},

        "meta@name='twitter:player:stream'": {p:"schemavideo:embedUrl", o:"iri:content"},

        "meta@name='twitter:player'": {p:"schemavideo:embedUrl", o:"iri:content"},

        "meta@name='twitter:player:stream:'": {p:"formats:media_type", o:"val:content"},

        "meta@name='twitter:url'": {p:"schema:mainEntityOfPage", o:"iri:content"},

        "meta@name='twitter:title'": [{p:"schema:title", o:"val:content"}, {p:"schema:name", o:"val:content"}],
        "meta@name='og:title'"     : [{p:"schema:title", o:"val:content"}, {p:"schema:name", o:"val:content"}],
        "meta@property='og:title'" : [{p:"schema:title", o:"val:content"}, {p:"schema:name", o:"val:content"}],

        "meta@name='twitter:description'": {p:"schema:description", o:"val:content"},
        "meta@name='og:description'"     : {p:"schema:description", o:"val:content"},
        "meta@property='og:description'" : {p:"schema:description", o:"val:content"},

        "meta@name='twitter:image'"    : {p:"schema:image", o:"iri:content"},
        "meta@name='og:image'"         : {p:"schema:image", o:"iri:content"},
        "meta@property='og:image'"     : {p:"schema:image", o:"iri:content"},


        "meta@name='twitter:site'": {p:"schema:url", o:"iri:content"},
        "meta@name='twitter:site'@": {p:"schema:author", o:"cmd:content", cmd:fix_twitter_creator},

        "meta@name='twitter:site:id'": {p:"opltw:id", o:"content"},

        "meta@name='twitter:creator'": {p:"schema:author", o:"cmd:content", cmd:fix_twitter_creator},

        "meta@name='twitter:creator:id'": {p:"schema:author", o:"cmd:content", cmd:fix_twitter_creator},
       };
  
  }

  POSH.prototype = {
    getData: function (baseURI) 
    {
      var triples = "";
      var self = this;
      var twittercard = false;
      var url = new URL(baseURI);
      var baseOrigin = url.origin;
      var basePATH = baseURI;

      if (baseURI.lastIndexOf('.')!=-1) {
         var i = baseURI.lastIndexOf('/');
         if (i!=-1)
           basePATH = basePATH.substring(0, i);
      }


      function s_startWith(str, val) {
        if (str)
          return str.lastIndexOf(val, 0) === 0;
        else
          return false;
      }

      function node2str(n)
      {
        if (n.length==0)
        {
          return "<#this>";
        }
        else if (s_startWith(n, "http://") 
                 || s_startWith(n, "https://")
                 || s_startWith(n, "mailto:")
                )
        {
          return "<"+n+">";
        }
        else if (s_startWith(n, "#"))
        {
          return "<"+encodeURI(n)+">";
        }
        else if (n.lastIndexOf(":")!=-1)
        {
          var arr = n.split(":");
          var pref_link = self.namespace.ns_list[arr[0]];
          if (!pref_link) //unknown prefix
             return "xhv:"+encodeURIComponent(n);
          else {
             var p = self.prefixes[arr[0]];
             if (!p)
               self.prefixes[arr[0]] = pref_link;
             return n;
          }
        }
        else {
          var s = self.terms[n];
          if (s)
            return s;
          return "xhv:"+encodeURIComponent(n);
        }
      }

      function addTriple(s, p, o, obj_is_Literal)
      {
        triples += node2str(s)+" "+node2str(p)+" ";
        if (obj_is_Literal) {
          triples += '"'+o+'"';
        }
        else {
          o = o.replace(/\\/g,'\\\\').replace(/\"/g,'\\\"');
          if (o==="<>" || o==="<#this>")
            triples += o;
          else if (s_startWith(o, "http://") 
                 || s_startWith(o, "https://")
                 || s_startWith(o, "mailto:")
                )
            triples += "<"+o+">";
          else if (s_startWith(o, "#"))
            triples += "<"+encodeURI(o)+">";
          else if (o.lastIndexOf(":")!=-1) 
          {
            var arr = o.split(":");
            var pref_link = self.namespace.ns_list[arr[0]];
            if (!pref_link) {//unknown prefix
              triples += '"'+o+'"';
            } else {
              var p = self.prefixes[arr[0]];
              if (!p)
                self.prefixes[arr[0]] = pref_link;
              triples += arr[0]+":"+encodeURIComponent(o.substring(arr[0].length+1));
            }
          }
          else
            triples += '"'+o+'"';
        }

        triples += " .\n";
      } 


      function handleTwitterCard(p, o) 
      {
        var cardtype = "SummaryCard";
        var content;
        var el = $("head link,meta[name='twitter:card']");

        if (el && el.length > 0) {
          content = el[0].getAttribute("content");
          if (content==="player")
            cardType = "PlayerCard";
          else if (content==="photo")
            o = "PhotoCard";
        }

        addTriple("#this", "rdf:about", "#TwitterCard");
        addTriple("#TwitterCard", "rdf:type", "schema:CreativeWork");
        addTriple("#TwitterCard", "rdf:type", "opltw:"+cardtype);
        addTriple("#TwitterCard", "schema:url", "<>");


        $("head meta[name^='twitter:'],meta[name^='og:'],meta[property^='og:']").each(function(i, el){
           var name = el.getAttribute("name");
           var content = el.getAttribute("content");
           var property = el.getAttribute("property");

           var val = null;
           var add_dog = s_startWith(content,"@")?"@":"";

           if (name) {
             if (add_dog.length>0)
               val = self.twcard["meta@name='"+name+"'"+add_dog];
             if (!val)
               val = self.twcard["meta@name='"+name+"'"];
           }
           else {
             if (add_dog.length>0)
               val = self.twcard["meta@property='"+property+"'"+add_dog];
             if (!val)
               val = self.twcard["meta@property='"+property+"'"];
           }

           if (val) {
             var op_lst = $.isArray(val)?val:[val];

             for(var i=0; i<op_lst.length; i++) 
             {
               var op = op_lst[i];
               if (op) {
                 if (!op.cmd) {
                   if (op.o==="iri:content")
                     addTriple("#TwitterCard", op.p, content);
                   else if (op.o==="val:content")
                     addTriple("#TwitterCard", op.p, content);
                   else
                     addTriple("#TwitterCard", op.p, content);
                 } else {
                   //command exec
                   addTriple("#TwitterCard", op.p, op.cmd(content));
                 }
               } 
             }
           }

        });

      }


      function fix_href(n)
      {
        if (n.length==0)
        {
          return n;
        }
        else if (s_startWith(n, "http://") 
                 || s_startWith(n, "https://")
                 || s_startWith(n, "mailto:")
                )
        {
          return n;
        }
        else if (s_startWith(n, "#"))
        {
          return baseURI+n;
        }
        else if (s_startWith(n, "/"))
        {
          return baseOrigin+n;
        }
        else
        {
          return basePATH+"/"+n;
        }
      }


//      $("head link,meta[name],meta[property]").each(function(i, el){
      $("head link,meta[name]").each(function(i, el){
         if (el.localName==="link") {
           var rev = el.getAttribute("rev");
           var rel = el.getAttribute("rel");
           var href = el.getAttribute("href");

           if (rel && href) {
             href = encodeURI(fix_href(href));
             var title = el.getAttribute("title");
             var type = el.getAttribute("type");
             addTriple("#this", encodeURI(rel), href);   
             addTriple(href+"#this", "rdf:type", "schema:CreativeWork");
             if (title)
               addTriple(href+"#this", "schema:name", title);   
             if (type)
               addTriple(href+"#this", "schema:fileFormat", type);   
           }
           else if(rev && href) {
             href = encodeURI(fix_href(href));
             addTriple(href, encodeURI(rev), "<#this>")
           }
         }
         else if (el.localName==="meta") {
           var name = el.getAttribute("name");
           var content = el.getAttribute("content");

           if (name && s_startWith(name, "twitter:")) {
             if (!twittercard) {
               twittercard = true;
               handleTwitterCard();
             }
           }
           else if (name && content) {
             addTriple("#this", name, content);
           }

         }
      });

      $("img[alt^='"+this.facebook_vision+"']").each(function(i, el){
           var src = el.getAttribute("src");
           var alt = el.getAttribute("alt");

           addTriple(src+"#this", "rdf:type", "schema:ImageObject");
           addTriple(src+"#this", "schema:mainEntityOfPage", src);
           addTriple(src+"#this", "schema:name", " "+src, true);
           addTriple(src+"#this", "schema:description", alt.substring(self.facebook_vision.length));
           addTriple(src+"#this", "schema:url", src);
      });


      var s = "";
      $.each(this.prefixes, function(pref, link_url) {
        s += "@prefix "+pref+": <"+link_url+"> .\n";
        return true;
      });

      return (triples.length > 0)?s+triples: triples;
    }
  }


  return POSH;
}());

