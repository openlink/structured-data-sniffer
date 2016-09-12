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


var $ = jQuery;
var micro_items = 0;
var json_ld_Text = null;
var turtle_Text = null;
var posh_Text = null;
var rdfa_subjects = null;
var t_nano_Text = null;
var j_nano_Text = null;
var data_found = false;

var t_nano_pattern =/(\{|(## (Nanotation|Turtle) +Start ##))((.|\n|\r)*?)((## (Nanotation|Turtle) +(End|Stop) ##)|\})(.*)/gmi;
var j_nano_pattern =/(## JSON-LD +Start ##)((.|\n|\r)*?)((## JSON-LD +(End|Stop) ##))(.*)/gmi;


function getSelectionString(el, win) {
    win = win || window;
    var doc = win.document, sel, range, prevRange, selString;

    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        if (sel.rangeCount) {
          prevRange = sel.getRangeAt(0);
        }
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
        selString = sel.toString();
        sel.removeAllRanges();
        prevRange && sel.addRange(prevRange);
    } 
    else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    return selString;
}


function fix_Nano_data(str) {
    str = str.replace(/\xe2\x80\x9c/g, '"')       //replace smart quotes with sensible ones (opening)
       .replace(/\xe2\x80\x9d/g, '"')       //replace smart quotes with sensible ones (closing)
       .replace(/\xc3\xa2\xc2\x80\xc2\x9c/g, '"')  //smart->sensible quote replacement, wider encoding
       .replace(/\xc3\xa2\xc2\x80\xc2\x9d/g, '"')  //smart->sensible quote replacement, wider encoding
       .replace(/\u00a0/g," ")   //&nbsp
       .replace(/\u201A/g,"'")
       .replace(/\u2018/g,"'")
       .replace(/\u2019/g,"'")
       .replace(/\u2039/g,"'")
       .replace(/\u203A/g,"'")
       .replace(/\u201C/g,'"')
       .replace(/\u201D/g,'"')
       .replace(/\u201E/g,'"')
       .replace(/\u00BB/g,'"')
       .replace(/\u00AB/g,'"');
//       .replace(/\u8629/g,' ')
//       .replace(/\u2026/g,'...');
    return str;
}


function sniff_nanotation() {
  var t_ret = [];
  var j_ret = [];
  var doc_Text = document.body.innerText;

  if (doc_Text === undefined || (doc_Text!==null && doc_Text.length==0))
    doc_Text = getSelectionString(document.body);

  if (doc_Text) {
    //drop commetns
    var s_split = doc_Text.split(/[\r\n]/);
    var s_doc = "";
    var p1 = /## +([Nn]anotation|[Tt]urtle) +(Start|End|Stop) *##/;
    var p3 = /## +(JSON-LD) +(Start|End|Stop) *##/;
    var p2 = /^ *#/;

    s_split.forEach(function(item, i, arr){
      if (item.length>0 && (!p2.test(item) || p1.test(item) || p3.test(item)))
        s_doc += item +"\n";
    });

    while(true) {
      var ndata = t_nano_pattern.exec(s_doc);
      if (ndata==null)
        break;

      var str = ndata[4];
      str = fix_Nano_data(str);
      if (str.length>0)
        t_ret.push(str);
    }
    while(true) {
      var ndata = j_nano_pattern.exec(s_doc);
      if (ndata==null)
        break;

      var str = ndata[2];
      str = fix_Nano_data(str);
      if (str.length>0)
        j_ret.push(str);
    }
  }

  if (t_ret.length > 0 || j_ret.length > 0)
    return {t:t_ret, j:j_ret};
  else
    return null;
}


function is_data_exist() {
  try {

    data_found = false;

    var items = $('[itemscope]').not($('[itemscope] [itemscope]'));
    if (items && items.length > 0)
      data_found = true;

    if (!data_found) {
      var all = document.getElementsByTagName("script");
      for( var i = 0; i < all.length; i++ ) {
        if ( all[i].hasAttribute('type') 
             && all[i].getAttribute('type') === "application/ld+json")
          {
            data_found = true;
          }
      }
    }

    if (!data_found) {
      for( var i = 0; i < all.length; i++ ) {
        if ( all[i].hasAttribute('type') 
             && (all[i].getAttribute('type') === "text/turtle"
                 || all[i].getAttribute('type') === "application/turtle")
           )
          {
            data_found = true;
          }
      }
    }


    if (!data_found) {
      try {
        posh_Text = new POSH().getData(document.location.href);  
      } catch(e) {
        console.log("OSDS:"+e);
      }

      if (posh_Text && posh_Text.length>0)
        data_found = true;
    }

    if (!data_found) {
      try {
        GreenTurtle.attach(document);
        rdfa_subjects = document.data.getSubjects();
      } catch(e) {
        console.log("OSDS:"+e);
      }

      if (rdfa_subjects && rdfa_subjects.length>0)
        data_found = true;
    }


    if (!data_found) {
      var ret = sniff_nanotation();
      if (ret) {
        t_nano_Text = (ret.t.length>0)?ret.t:null;
        j_nano_Text = (ret.j.length>0)?ret.j:null;
        data_found = true;
      }
    }


    if (data_found) {
      // Tell the chrome extension that we're ready to receive messages
      //send data_exists flag to extension
      if (Browser.isFirefoxSDK) 
      {
        self.port.emit("content_status", {data_exists:data_found});
      }
      else
      {
        Browser.api.runtime.sendMessage(null, {
               property: "status", 
               status: 'ready',
               data_exists: data_found
           }, 
           function(response) {
        });
      }
    }

  } catch (e) {
    console.log("OSDS:"+e);
  }

}



function sniff_Data() {
  try {

    if (t_nano_Text===null && j_nano_Text===null) {
      var ret = sniff_nanotation();
      if (ret) {
        t_nano_Text = (ret.t.length>0)?ret.t:null;
        j_nano_Text = (ret.j.length>0)?ret.j:null;
        data_found = true;
      }
    }

    micro_items = $('[itemscope]').not($('[itemscope] [itemscope]'));

    if (posh_Text===null) {
      try {
        posh_Text = new POSH().getData(document.location.href);  
      } catch(e) {
        console.log("OSDS:"+e);
      }
    }

    try {
      GreenTurtle.attach(document);
      rdfa_subjects = document.data.getSubjects();
    } catch(e) {
      console.log("OSDS:"+e);
    }

    json_ld_Text = null;
    var all = document.getElementsByTagName("script");
    for( var i = 0; i < all.length; i++ ) {
      if ( all[i].hasAttribute('type') 
           && all[i].getAttribute('type') == "application/ld+json")
        {
          var htmlText = all[i].innerHTML;
          if (json_ld_Text == null)
            json_ld_Text = [];

          htmlText = htmlText.replace("//<![CDATA[", "").replace("//]]>", "");
          htmlText = htmlText.replace("<![CDATA[", "").replace("]]>", "");
          if (htmlText.length > 0)
            json_ld_Text.push(htmlText);
        }
    }

    turtle_Text = null;
    for( var i = 0; i < all.length; i++ ) {
      if ( all[i].hasAttribute('type') 
           && all[i].getAttribute('type') == "text/turtle")
        {
          var htmlText = all[i].innerHTML;
          if (turtle_Text == null)
            turtle_Text = [];

          htmlText = htmlText.replace("//<![CDATA[", "").replace("//]]>", ""); 
          htmlText = htmlText.replace("<![CDATA[", "").replace("]]>", ""); 
          if (htmlText.length > 0)
            turtle_Text.push(htmlText); 
        }
    }

  } catch (e) {
    console.log("OSDS:"+e);
  }

}





window.onload = function() {

  try {

    is_data_exist();
    if (!data_found) {
       setTimeout(is_data_exist, 3000);
    }

    function isBlank(n) {
      return n && n.substr(0, 2) === '_:';
    }

    function iri2str(n) {
      return (n && n.substr(0, 2) === '_:')? n : "<"+n+">";
    }


    function requested_doc_data()
    {
        sniff_Data();
        send_doc_data();
    }


    function send_doc_data() 
    {
        var docData = {
               docURL: document.location.href,
               micro :{ data:null }, 
               jsonld :{ text:null },
               rdfa :{ data:null , ttl:null},
               turtle :{ text:null },
               t_nano :{ text:null },
               j_nano :{ text:null },
               posh :{ text:null }
             };
        
        var microdata = jQuery.microdata.json(micro_items, function(o) { return o; });
        var rdfa = null;
        var rdfa_ttl = null;

        ///Convert RDFa data to internal format
        if (rdfa_subjects!=null && rdfa_subjects.length>0) 
        {
           rdfa = [];
           rdfa_ttl = "";
           var _LiteralMatcher = /^"([^]*)"(?:\^\^(.+)|@([\-a-z]+))?$/i;

           for(var i=0; i<rdfa_subjects.length; i++) {
             var s_triple = " "+iri2str(rdfa_subjects[i]);
             var p_triple ;
             var o_triple ;
             var s = {s:rdfa_subjects[i], n:i+1};
             rdfa.push(s);
             var plist = document.data.getProperties(rdfa_subjects[i]);
             s.props = new Object();
            
             for(var j=0; j < plist.length; j++) {
               var p = s.props[plist[j]];
               if (p === undefined)
                 s.props[plist[j]] = [];

               p = s.props[plist[j]];
               p_triple = " "+iri2str(plist[j]);

               var vlist = document.data.getObjects(rdfa_subjects[i], plist[j]);
               for (var z=0; z<vlist.length; z++) {
                 var v = vlist[z];
                 if (v.type === "http://www.w3.org/1999/02/22-rdf-syntax-ns#object") {
                   p.push({"iri": String(v.value)});
                   o_triple = " "+iri2str(v.value);
                 }
                 else if (v.type === "http://www.w3.org/1999/02/22-rdf-syntax-ns#PlainLiteral") {
                   var v_val = v.value!=null?String(v.value):null;
                   var v_lang = v.language!=null?String(v.language):null;
                   p.push({value:v_val, type:null, lang:v_lang});
                   o_triple = ' "'+v_val+'"';
                   if (v_lang!=null)
                     o_triple += '@'+v_lang;
                 }
                 else {
                   var v_val = v.value!=null?String(v.value):null;
                   var v_lang = v.language!=null?String(v.language):null;
                   var v_type = v.type!=null?String(v.type):null;
                   p.push({value:v_val, type:v_type, lang:v_lang});
                   o_triple = ' "'+v_val+'"';
                   if (v_lang!=null)
                     o_triple += '@'+v_lang;
                   else if (v_type!=null) 
                     o_triple += '^^<'+v_type+">";
                 }
                 rdfa_ttl += s_triple+p_triple+o_triple+" .\n";
               }
             }
           } 
        }

        docData.micro.data = microdata;
        docData.jsonld.text = json_ld_Text;
        docData.turtle.text = turtle_Text;
        docData.rdfa.data = rdfa;
        docData.rdfa.ttl = rdfa_ttl;
        docData.t_nano.text = t_nano_Text;
        docData.j_nano.text = j_nano_Text;
        docData.posh.text = posh_Text;

        //send data to extension
        if (Browser.isFirefoxSDK) 
        {
            self.port.emit("doc_data", {data:JSON.stringify(docData, undefined, 2)});
        }
        else
        {
            Browser.api.runtime.sendMessage(null, 
                { property: "doc_data", 
                  data: JSON.stringify(docData, undefined, 2)
                }, 
                function(response) {
            });
        }
    }



    // wait data req from extension 
    if (Browser.isFirefoxSDK) 
    {
        self.port.on("doc_data", function(msg) {
          requested_doc_data()
        });
    }
    else 
    {
        Browser.api.runtime.onMessage.addListener(function(request, sender, sendResponse) {
          if (request.property == "doc_data") 
            requested_doc_data();
          else
            sendResponse({});  /* stop */
        });
    }




  } catch (e) {
    console.log("OSDS:"+e);
  }

}();

