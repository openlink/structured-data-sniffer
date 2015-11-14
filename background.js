
// React when the browser action's icon is clicked.
var icon_active   = 'icon48.png';
var items;
var $ = jQuery;
var gData = null;
var gData_showed = false;

$(document).ready(function() 
{
  $('#tabs a[href=#micro]').click(function(){
      selectTab('#micro');
      return false;
  });
  $('#tabs a[href=#jsonld]').click(function(){
      selectTab('#jsonld');
      return false;
  });
  $('#tabs a[href=#turtle]').click(function(){
      selectTab('#turtle');
      return false;
  });


  jQuery('#ext_ver').text('ver: '+ chrome.runtime.getManifest().version);

  chrome.tabs.query({active:true}, function(tabs) {
      if (tabs.length > 0) {
        //?? Request the microdata items in JSON format from the client (foreground) tab.
        chrome.tabs.sendMessage(tabs[0].id, {
            property: 'items.json'
          }, 
          function(response) {
          });
      }
    });

});


// Trap any link clicks and open them in the current tab.
$('a').live('click', function(e) {
  var href = e.currentTarget.href;

//  chrome.tabs.query({active:true}, function(tabs) {
//      if (tabs.length > 0)
//        chrome.tabs.update(tabs[0].id, {url: href});
//    });
//  window.close(); /* close popup */
  window.open(href);
});


function selectTab(tab)
{
  var tab_data = $('#micro_items');
  var tab_id = $('#tabs a[href=#micro]');

  if (tab==='#micro') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#jsonld_items');
  tab_id = $('#tabs a[href=#jsonld]');

  if (tab==='#jsonld') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

  tab_data = $('#turtle_items');
  tab_id = $('#tabs a[href=#turtle]');

  if (tab==='#turtle') {
    tab_data.show()
    tab_id.addClass('selected');
  } else {
    tab_data.hide()
    tab_id.removeClass('selected');
  }

}



function show_Data()
{
//  $('body').prepend("<div id='metadata_viewer' class='alignleft'/>");
//  $('#metadata_viewer').append(gData.micro_expanded);

//  $('.content').prepend("<div id='metadata_viewer' class='alignleft'/>");
/**/
  var micro = false;
  var jsonld = false;
  var turtle = false;


  $('#micro_items').append("<div id='metadata_viewer' class='alignleft'/>");
  if (gData.micro.expanded) {
      $('#micro_items #metadata_viewer').append(gData.micro.expanded);
      micro = true;
  }
  else if (gData.micro.error) {
//      $('#micro_items #metadata_viewer').append("<div id='metadata'><i><p>Microdata discovered, but fails syntax checking by parser:<p>"+gData.micro.error+"</i></div>");
      $('#micro_items #metadata_viewer').append("<div id='metadata'><i><p>Microdata discovered, but fails syntax checking by parser.<p></i></div>");
      micro = true;
  }
  else
      $('#micro_items #metadata_viewer').append("<div id='metadata'><i>No data found.</i></div>");


  $('#jsonld_items').append("<div id='metadata_viewer' class='alignleft'/>");
  if (gData.jsonld.expanded) {
      $('#jsonld_items #metadata_viewer').append(gData.jsonld.expanded);
      jsonld = true;
  }
  else if (gData.jsonld.error) {
      $('#jsonld_items #metadata_viewer').append("<div id='metadata'><i><p>JSON-LD discovered, but fails syntax checking by parser:<p>"+gData.jsonld.error+"</i></div>");
      jsonld = true;
  }
  else
      $('#jsonld_items #metadata_viewer').append("<div id='metadata'><i>No data found.</i></div>");


  $('#turtle_items').append("<div id='metadata_viewer' class='alignleft'/>");
  if (gData.turtle.expanded) {
      $('#turtle_items #metadata_viewer').append(gData.turtle.expanded);
      turtle = true;
  }
  else if (gData.turtle.error) {
      $('#turtle_items #metadata_viewer').append("<div id='metadata'><i><p>Turtle discovered, but fails syntax checking by parser:<p>"+gData.turtle.error+"</i></div>");
      turtle = true;
  }
  else
      $('#turtle_items #metadata_viewer').append("<div id='metadata'><i>No data found.</i></div>");


  if (micro)
    selectTab('#micro');
  else if (jsonld)
    selectTab('#jsonld');
  else if (turtle)
    selectTab('#turtle');



  if (!micro)
    $('#tabs a[href=#micro]').hide();
  if (!jsonld)
    $('#tabs a[href=#jsonld]').hide();
  if (!turtle)
    $('#tabs a[href=#turtle]').hide();

  gData_showed = true;
}



function check_Microdata() 
{
  if (gData.micro.jsonText && gData.micro.jsonText.length > 0)
  {
    var handler = new Handle_Microdata();
    handler.parse(gData.micro.jsonText, gData.docURL,
      function(error, html_data) 
      {
        if (error)
          gData.micro.error = error.toString();
        else
          gData.micro.expanded = html_data;

      check_JSON_LD();
    });
  }
  else
  {
    check_JSON_LD();
  }
}




function check_JSON_LD() 
{
  if (gData.jsonld.text && gData.jsonld.text.length > 0)
  {
    var handler = new Handle_JSONLD();
    handler.parse(gData.jsonld.text, 
      function(error, html_data) {
        if (error)
          gData.jsonld.error = error.toString();
        else
          gData.jsonld.expanded = html_data;

        check_Turtle();
    });
  }
  else
  {
    check_Turtle();
  }
}




function check_Turtle() 
{
  if (gData.turtle.text && gData.turtle.text.length > 0)
  {
    var handler = new Handle_Turtle();
    handler.parse(gData.turtle.text, gData.docURL, 
      function(error, html_data) {
        if (error)
          gData.turtle.error = error.toString();
        else
          gData.turtle.expanded = html_data;

        show_Data();
    });
  }
  else
  {
    show_Data();
  }
}



chrome.extension.onMessage.addListener(function(request, sender, sendResponse) 
{
  if (request.property == "status")
  {
//====================
    var show_action = request.data_exists;
    chrome.tabs.query({active:true}, function(tabs) {
       if (tabs.length>0) {
          if (show_action)
            chrome.pageAction.show(tabs[0].id);
          else
            chrome.pageAction.hide(tabs[0].id);
       }
      });
//======================
  } 
  else if (request.property == "items.json")
  {
    gData = $.parseJSON(request.data);
    gData.micro.expanded = null;
    gData.micro.error = null;
    gData.jsonld.expanded = null;
    gData.jsonld.error = null;
    gData.rdfa.expanded = null;
    gData.turtle.expanded = null;
    gData.turtle.error = null;

    check_Microdata();

  }
  else
  {
    sendResponse({}); /* stop */
  }

});



Handle_Microdata = function () {
  var callback = null;
  var error = null;
};

Handle_Microdata.prototype = {
  parse : function(textData, docURL, callback) {
    this.callback = callback;
    var self = this;
    try 
    {
      var jsonData = $.parseJSON(textData);
      var conv = new MicrodataJSON_Converter();
      var out_data = conv.transform(jsonData, docURL);

      var html_data = new Tmpl2().load(out_data);
      self.callback(null, html_data);
    } 
    catch (ex) {
      self.callback(ex.toString(), null);
    }
  }

}



Handle_Turtle = function () {
  var callback = null;
  var error = null;
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
            self.error = error.toString();
            self.callback(this.error, null);
          }
          else if (tr) {
            store.addTriple(self.fixNode(tr.subject), 
                            self.fixNode(tr.predicate), 
                            self.fixNode(tr.object));
          }
          else {
            var str = new Tmpl2().load(store.output);
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
  var error = null;
};

Handle_JSONLD.prototype = {

  parse : function(textData, callback) {
    this.callback = callback;
    var self = this;
    try {
      jsonld_data = JSON.parse(textData);
      if (jsonld_data != null) {
        jsonld.expand(jsonld_data, 
          function(err, expanded) {
            if (err) {
              self.callback(err.toString(), null);
            }
            else {
              jsonld.toRDF(jsonld_data, {format: 'application/nquads'}, 
                function(err, nquads) {
                  if (err) {
                    self.callback(err.toString(), null);
                  }
                  else {
                    var handler = new Handle_Turtle();
                    handler.parse(nquads, gData.docURL, function(error, html_data) {
                      if (error) {
                        self.callback(err.toString(), null);
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
             llang:match[3]});
      }
  }
}


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
    var props = null;
    var id_ns = null;

    retVal.data = out;
    retVal.data_add = out_add;

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
       else if (key==="id") {
         if (val.indexOf(':') === -1)
           val = ":"+val;
         out["s"]=val;
         retVal.id = val;
       } 
       else if (key==="type") 
       {
         if (!props)
           out["props"] = {}
         props = out["props"];

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
       else {
         if (!props)
           out["props"] = {}
         props = out["props"];

         if (key.indexOf(':') === -1)
            key = ":"+key;

         if ($.isArray(val))
           props[key]=val;
         else
           props[key]=[val];
       }
     });


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
       if (String(val).indexOf('[object Object]') === 0) {
         for(var i=0; i<val.length; i++) {
           var rc = self.expand_item(val[0]);
           if (!rc.id) {
             var bnode = self.new_bnode();
             rc.id = bnode;
             rc.data.s = bnode;
           }
           v.push({ "iri" : rc.id });
           out_add.push(rc.data);
           for(var i=0; i<rc.data_add.length; i++)
             out_add.push(rc.data_add[i]);
         }
       }
       else {
         for(var i=0; i<val.length; i++) {
           if (val[i].substring(0,7) ==="http://")
             v.push({ "iri" : val[i]});
           else if (val[i].substring(0,8) ==="https://")
             v.push({ "iri" : val[i]});
           else
             v.push({ "value" : val[i]}); //??todo parse literal
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
       }
       props[key] = v;
        
      });
    }

    return retVal;
  }

}
