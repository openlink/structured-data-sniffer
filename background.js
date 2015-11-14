
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


function jsonld_expand_item(item) 
{
   var id = (typeof(item["@id"])!== "undefined") ? item["@id"] : null;
   var type = (typeof(item["@type"])!== "undefined") ? item["@type"] : null;
   var value = (typeof(item["@value"])!== "undefined") ? item["@value"] : null;
   var row = {};
   var props = {};
   var props_count = 0;

   jQuery.each(item, function(key, val) 
   {
     if (key!=="@id" && key!="@type" && key!= "@value")
     {
       if ($.isArray(val)) {
         var out = [];
         for(var i=0; i < val.length; i++) {
           out.push(jsonld_expand_item(val[i]));
         }
         props[key] = out;
       }
       else 
         props[key] = val;

       props_count++;
     }
   });

   if (props_count==0 && id && !type && !value) {
     row = id;
   } else {
     if (id)
       row["id"] = id;
     if (type)
       row["type"] = type;
     if (value)
       row["value"] = value;

     if (props_count > 0)
       row["properties"] = props;
   }

   return row;
}


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


function check_JSON_LD() 
{
    //// JSONLD
  if (gData.jsonld.text && gData.jsonld.text.length > 0)
  { 
    var jsonld_data = null;
    try {
      jsonld_data = JSON.parse(gData.jsonld.text);
    } catch(e) {
      gData.jsonld.error = e; 
    }

    if (jsonld_data != null)
    {
      jsonld.expand(jsonld_data, function(err, expanded) 
        {
          if (err!=null) {
            gData.jsonld.error = err.toString();
          } 
          else {
          
            var out = [];
            for(var i=0; i < expanded.length; i++)
            {
               var item = expanded[i];
               var row = jsonld_expand_item(item);
               out.push(row);

            }
            var ex_json = {"items": out};
            ////ADD Data to View
            gData.jsonld.expanded = tmpl.converter.load(JSON.stringify(ex_json, undefined, 2));
          }
          check_Turtle();
        });
    }
    else
    {
      check_Turtle();
    }
  }
  else 
  {
    check_Turtle();
  }
}



function check_Turtle() 
{
  var baseURI = gData.docURL;
  
  function fixNode(n) 
  {
     if ( n==="")
         return baseURI;
     else if (N3.Util.isIRI(n)) {
       if (n==="")
         return baseURI;
       else if (n.substring(0,1)==="#") 
         return baseURI+n;
       else if (n.substring(0,1)===":") 
         return baseURI+n;
       else
         return n;
     } else {
       return n;
     }
  }

  
  function conv_Turtle_2_NQuads(turtle)
  {
    var writer = N3.Writer({format:"application/nquads"});
    var parser = N3.Parser();
    parser.parse(turtle,
       function (error, tr, prefixes) {
         if (error) {
           gData.turtle.error = error.toString();
           show_Data();
         }
         else if (tr) {
           writer.addTriple(fixNode(tr.subject), fixNode(tr.predicate), fixNode(tr.object));
         }
         else {
           writer.end(function(error, result) {
             if (error) {
               gData.turtle.error = error.toString();
               show_Data();
             } else {
               conv_NQuads_2_JSONLD(result);
             }
           });
         }
       });
  }


  function conv_NQuads_2_JSONLD(nquads)
  {
     jsonld.fromRDF(nquads, {format: 'application/nquads'}, 
         function(error, doc) {
           if (error) {
             gData.turtle.error = error.toString();
             show_Data();
           }
         else {
           expand_JSONLD(doc);
         }
     });
  }

  function expand_JSONLD(jsonld_data)
  {
     if (jsonld_data != null)
     {
       jsonld.expand(jsonld_data, function(err, expanded) 
         {
           if (err!=null) {
             gData.turtle.error = err.toString();
           } 
           else 
           {
             var out = [];
             for(var i=0; i < expanded.length; i++)
             {
                var item = expanded[i];
                var row = jsonld_expand_item(item);
                out.push(row);
             }
             var ex_json = {"items": out};
             ////ADD Data to View
             gData.turtle.expanded = tmpl.converter.load(JSON.stringify(ex_json, undefined, 2));
           }
           show_Data();
        });
     }
     else
     {
       show_Data();
     }
  }
  

  if (gData.turtle.text && gData.turtle.text.length > 0)
  {
    conv_Turtle_2_NQuads(gData.turtle.text);
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
    gData.jsonld.expanded = null;
    gData.jsonld.error = null;
    gData.rdfa.expanded = null;
    gData.turtle.expanded = null;
    gData.turtle.error = null;

    // Load up the template
    gData.micro.expanded = tmpl.converter.load(gData.micro.jsonText);

    check_JSON_LD();

  }
  else
  {
    sendResponse({}); /* stop */
  }

});