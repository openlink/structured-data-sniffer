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

var $ = jQuery;
var micro_items = 0;
var json_ld_Text = null;
var turtle_Text = null;
var rdfa_subjects = null;


$(window).load(function() {

  try {

    micro_items = $('[itemscope]').not($('[itemscope] [itemscope]'));

    GreenTurtle.attach(document);
    rdfa_subjects = document.data.getSubjects();

    var all = document.getElementsByTagName("script");
    for( var i = 0; i < all.length; i++ ) {
      if ( all[i].hasAttribute('type') 
           && all[i].getAttribute('type') == "application/ld+json")
        {
          var htmlText = all[i].innerHTML;
          json_ld_Text = htmlText.replace("<![CDATA[", "").replace("]]>", ""); 
          break;
        }
    }

    for( var i = 0; i < all.length; i++ ) {
      if ( all[i].hasAttribute('type') 
           && all[i].getAttribute('type') == "text/turtle")
        {
          var htmlText = all[i].innerHTML;
          turtle_Text = htmlText.replace("<![CDATA[", "").replace("]]>", ""); 
          break;
        }
    }


    // Add the listener for messages from the chrome extension.
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.property == "doc_data") 
      {
        var docData = {
               docURL: document.location.href,
               micro :{ data:null }, 
               jsonld :{ text:null },
               rdfa :{ data:null },
               turtle :{ text:null }
             };
        
        var microdata = jQuery.microdata.json(micro_items, function(o) { return o; });
        var rdfa = null;

        ///Convert RDFa data to internal format
        if (rdfa_subjects!=null && rdfa_subjects.length>0) {
           rdfa = [];
           var _LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;


           for(var i=0; i<rdfa_subjects.length; i++) {
             var s = {s:rdfa_subjects[i], n:i+1};
             rdfa.push(s);
             var plist = document.data.getProperties(rdfa_subjects[i]);
             s.props = new Object();
            
             for(var j=0; j < plist.length; j++) {
               var p = s.props[plist[j]];
               if (p === undefined)
                 s.props[plist[j]] = [];

               p = s.props[plist[j]];

               var vlist = document.data.getObjects(rdfa_subjects[i], plist[j]);
               for (var z=0; z<vlist.length; z++) {
                 var v = vlist[z];
                 if (v.type === "http://www.w3.org/1999/02/22-rdf-syntax-ns#object")
                   p.push({"iri": String(v.value)});
                 else if (v.type === "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral")
                   p.push({value:String(v.value), type:null, lang:String(v.language)});
                 else
                   p.push({value:String(v.value), type:String(v.type), lang:String(v.language)});
               }
             }
           } 
        }

        docData.micro.data = microdata;
        docData.jsonld.text = json_ld_Text;
        docData.turtle.text = turtle_Text;
        docData.rdfa.data = rdfa;

        chrome.extension.sendMessage(null, 
            { property: "doc_data", 
              data: JSON.stringify(docData, undefined, 2)
            }, 
            function(response) {
            });

      } 
      else
      {
        sendResponse({});  /* stop */
      }
    });

    // Tell the chrome extension that we're ready to receive messages
    var exists = false;
    if (micro_items.length > 0 
        || (json_ld_Text!=null && json_ld_Text.length>0)
        || (turtle_Text!=null && turtle_Text.length>0)
        || (rdfa_subjects!=null && rdfa_subjects.length>0)
       )
      exists = true;

    chrome.extension.sendMessage(null, {
               property: "status", 
               status: 'ready',
               data_exists: exists
           }, 
           function(response) {
           });

  } catch (e) {

    alert(e);
  }
});
