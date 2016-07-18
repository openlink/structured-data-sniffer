if (Browser.isChromeAPI) 
{
  var setting = new Settings();
  var _r = {};
  var _rb = {};


  chrome.webRequest.onBeforeSendHeaders.addListener(
        function(details) {
/**
          for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
              details.requestHeaders.splice(i, 1);
              break;
            }
          }
**/
          var pref_user = setting.getValue('ext.osds.pref.user');
          if (pref_user && pref_user.length> 0)
            details.requestHeaders.push({name:"On-Behalf-Of", value:pref_user})
          return {requestHeaders: details.requestHeaders};
        },
        {urls: ["<all_urls>"]},
        ["blocking", "requestHeaders"]);


  chrome.webRequest.onCompleted.addListener (
  	onCompleted, {types: ['main_frame'], urls: ["<all_urls>"]});
  chrome.webRequest.onErrorOccurred.addListener(
  	onErrorOccurred, {types: ['main_frame'], urls: ["<all_urls>"]});
  chrome.webRequest.onHeadersReceived.addListener(
  	onHeadersReceived, {types: ["main_frame"], urls: ["<all_urls>"]}, ["responseHeaders", "blocking"]);


  function onErrorOccurred(d) 
  { 
    delete _rb[d.requestId];
    return finish(d); 
  }


  function onCompleted(d) 
  { 
    delete _rb[d.requestId];
  }


  function onHeadersReceived(d) 
  {
    //console.log(d);
    var rc = null;
    try {
      rc = _rb[d.requestId];
    }catch(e) {}

    if (rc != null)
      return;

    var found = false;
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
            _r[d.requestId] = {handle: true, type:type};
            found = true;
          }
    }
    if (found)
      return finish(d);
  }


  function finish(d) 
  {
    var v = _r[d.requestId];
    if (v && v.handle == true) 
      {
        var url;
        delete _r[d.requestId];

//        var url = 'view-source:'+d.url
        var url = chrome.extension.getURL("page_panel.html?url="+encodeURIComponent(d.url)+"&type="+v.type);

        if (url != null) {
          chrome.tabs.update(d.tabId, { url: url });
          return { cancel: true };
        } else {
          return { cancel: false };
        }
      }
  }



}