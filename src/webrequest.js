var _browser;

try {
  _browser = (Browser.isChromeAPI && Browser.isChromeWebExt) ? chrome : browser;
} catch(e) {}


if (Browser.isChromeAPI) 
{
  var setting = new Settings();
  var _r = {};
  var ext_url = _browser.extension.getURL("page_panel.html");

  function s_startWith(str, val) 
  {
     return str.lastIndexOf(val, 0) === 0;
  }


  _browser.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
          var pref_user = setting.getValue('ext.osds.pref.user');
          if (pref_user && pref_user.length> 0)
            details.requestHeaders.push({name:"On-Behalf-Of", value:pref_user})
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);


  _browser.webRequest.onHeadersReceived.addListener(
  	onHeadersReceived, {types: ["main_frame"], urls: ["<all_urls>"]}, ["responseHeaders", "blocking"]);


  function onHeadersReceived(d) 
  {
    //console.log(d);
    
    for (var i in d.responseHeaders) {
        var header = d.responseHeaders[i];
        var handle = false;
        var type = null;

        if (header.name && header.name.match(/content-type/i)) {
/**
          if (header.value.match(/\/(rdf)/)) {
            handle = true;
            type = "rdf";
          }
          else 
**/
          if (header.value.match(/\/(turtle)/)) {
            handle = true;
            type = "turtle"
          }
          else if (header.value.match(/\/(n3)/)) {
            handle = true;
            type = "turtle"
          }
          else if (header.value.match(/\/(json\+ld)/)) {
            handle = true;
            type = "jsonld"
          }
          else if (header.value.match(/\/(ld\+json)/)) {
            handle = true;
            type = "jsonld"
          }
        }

        if (handle)
          {
            var _url = _browser.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+type);
            if (Browser.isEdgeWebExt) {
              return { redirectUrl: _url };
            } else {
              _browser.tabs.update(d.tabId, { url: _url });
              return { cancel: true };
            }
          }
    }
  }




}