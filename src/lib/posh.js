var POSH = (function () {

  'use strict';


  function POSH(uriStr) {
    this.terms = {};
    this.terms["description"] = "dc:description";
    this.terms["describedby"] = "wdrs:describedby";

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

    var s = "";
    $.each(this.prefixes, function(pref, link_url) {
      s += "@prefix "+pref+": <"+link_url+"> .\n";
      return true;
    });
    this.pref_list = s;

    this.twcard = {
        "meta@name='twitter:url'": {p:"foaf:homepage", o:"iri:content"},
        "meta@name='og:url'"     : {p:"foaf:homepage", o:"iri:content"},
        "meta@property='og:url'" : {p:"foaf:homepage", o:"iri:content"},

        "meta@name='twitter:player:stream'": {p:"schemavideo:embedUrl", o:"iri:content"},

        "meta@name='twitter:player'": {p:"schemavideo:embedUrl", o:"iri:content"},

        "meta@name='twitter:player:stream:'": {p:"formats:media_type", o:"val:content"},

        "meta@name='twitter:url'": {p:"foaf:homepage", o:"iri:content"},

        "meta@name='twitter:title'": [{p:"dc:title", o:"val:content"}, {p:"rdfs:label", o:"val:content"}],
        "meta@name='og:title'"     : [{p:"dc:title", o:"val:content"}, {p:"rdfs:label", o:"val:content"}],
        "meta@property='og:title'" : [{p:"dc:title", o:"val:content"}, {p:"rdfs:label", o:"val:content"}],

        "meta@name='twitter:description'": {p:"dc:description", o:"val:content"},
        "meta@name='og:description'"     : {p:"dc:description", o:"val:content"},
        "meta@property='og:description'" : {p:"dc:description", o:"val:content"},

        "meta@name='twitter:image'"    : {p:"foaf:depiction", o:"iri:content"},
        "meta@name='og:image'"         : {p:"foaf:depiction", o:"iri:content"},
        "meta@property='og:image'"     : {p:"foaf:depiction", o:"iri:content"},


        "meta@name='twitter:site'": {p:"foaf:page", o:"iri:content"},
        "meta@name='twitter:site'@": {p:"foaf:page", o:"cmd:content", cmd:["str_after/@","add_pref/https://twitter.com/"]},
//  <xsl:template match="h:meta[@name='twitter:site' and starts-with(@content, '@')]" mode="twittercard" priority="5">
//         <#TwitterCard> foaf:page @content
//??    <foaf:page rdf:resource="{concat('https://twitter.com/', substring-after(@content, '@'))}"/>


        "meta@name='twitter:site:id'": {p:"opltw:id", o:"content"},

        "meta@name='twitter:creator'": {p:"foaf:maker", o:"cmd:content", cmd:["str_after/@","add_pref/https://twitter.com/"]},
//  <xsl:template match="h:meta[@name='twitter:creator']" mode="twittercard">
//         <#TwitterCard> foaf:maker @content
//??    <foaf:maker rdf:resource="{concat('https://twitter.com/', substring-after(@content, '@'))}"/>

        "meta@name='twitter:creator:id'": {p:"foaf:maker", o:"cmd:content", cmd:["str_after/@","add_pref/https://twitter.com/"]},
//  <xsl:template match="h:meta[@name='twitter:creator:id']" mode="twittercard">
//         <#TwitterCard> foaf:maker @content
//    <foaf:maker rdf:resource="{concat('https://twitter.com/', substring-after(@content, '@'))}"/>
       };
  
  }

  POSH.prototype = {
    getData: function (baseURI) 
    {
      var triples = "";
      var self = this;
      var twittercard = false;

      function s_startWith(str, val) {
        return str.lastIndexOf(val, 0) === 0;
      }

      function node2str(n)
      {
        if (n.length==0)
          return "<>";
        else if (s_startWith(n, "http://") 
                 || s_startWith(n, "https://")
                 || s_startWith(n, "#")
                )
          return "<"+n+">";
        else if (n.lastIndexOf(":")!=-1)
          return n;
        else {
          var s = self.terms[n];
          if (s)
            return s;
          return "xhv:"+n;
        }
      }

      function addTriple(s, p, o)
      {
        triples += node2str(s)+" "+node2str(p)+" ";
        if (o==="<>")
          triples += o;
        else if (s_startWith(o, "http://") 
                 || s_startWith(o, "https://")
                 || s_startWith(o, "#")
                )
          triples += "<"+o+">";
        else
          triples += '"'+o+'"';

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

//        addTriple("", "opltw:hasCard", "#TwitterCard");
//        addTriple("#TwitterCard", "opltw:hasCard", cardtype );
        addTriple("", "opltw:hasCard", cardtype);
        addTriple("", "rdf:about", "#TwitterCard");

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
                   var o = "";
                   for (var c=0; c<op.cmd.length; c++) {
                     var cmd = op.cmd[c];
                     if (cmd==="str_after/@") {
                       var p = content.indexOf("@");
                       if (p!=-1)
                         o +=content.substring(p+1);
                     }
                     else if (cmd==="add_pref/https://twitter.com/") {
                         o = "https://twitter.com/"+o;
                     }
                   }
                   
                   addTriple("#TwitterCard", op.p, o);
                 }
               } 
             }
           }

        });

      }



//      $("head link,meta[name],meta[property]").each(function(i, el){
      $("head link,meta[name]").each(function(i, el){
         if (el.localName==="link") {
           var rev = el.getAttribute("rev");
           var rel = el.getAttribute("rel");
           var href = el.getAttribute("href");

           if (rel && href) {
             addTriple("", encodeURI(rel), href);   
           }
           else if(rev && href) {
             addTriple(href, encodeURI(rev), "<>")
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
             addTriple("", name, content);   
           }

         }
      });

      return (triples.length > 0)?this.pref_list+triples: triples;
    }
  }


  return POSH;
}());

