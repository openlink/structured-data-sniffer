if (Browser.isChromeAPI) 
{
  var setting = new Settings();

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


}