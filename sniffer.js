
var $ = jQuery;
var items = 0;
var json_ld_Text = null;

var data = {
             micro :{ jsonText:null }, 
             jsonld :{ text:null },
             rdfa :{  },
             ttl :{  }
           };


$(window).load(function() {


  items = $('[itemscope]').not($('[itemscope] [itemscope]'));

  var all = document.getElementsByTagName("script");
  for( var i = 0; i < all.length; i++ ) {
    if ( all[i].hasAttribute('type') 
           && all[i].getAttribute('type') == "application/ld+json")
       {
         json_ld_Text = all[i].innerHTML;
         break;
       }
  }


  try {

    // Add the listener for messages from the chrome extension.
    chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
      if (request.property == "items.json") 
      {
        var microdata_Text = jQuery.microdata.json(items, function(o) { return JSON.stringify(o, undefined, 2); });

        data.micro.jsonText = microdata_Text;
        data.jsonld.text = json_ld_Text;

        chrome.extension.sendMessage(null, 
            { property: 'items.json', 
              data: JSON.stringify(data, undefined, 2)
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
    if (items.length > 0 || (json_ld_Text!=null && json_ld_Text.length>0))
      exists = true;

    chrome.extension.sendMessage(null, {
               property: 'status', 
               status: 'ready',
               data_exists: exists
           }, 
           function(response) {
           });

  } catch (e) {

    alert(e);
  }
});