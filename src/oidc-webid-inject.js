(function () {

const prefix = "oidc-webid:";

window.addEventListener("message", recvMessage, false);

async function recvMessage(event)
{
  var ev_data;
  var session = null;
  var idp = null;

  if (!String(event.data).startsWith("oidc-webid:"))
    return;

  var s_session = localStorage.getItem('oidc.session');
  try {
    session = JSON.parse(s_session);
  } catch(e) {
  }

  if (session)
    idp = session.issuer;

  if (session && idp) {
    var s_client = localStorage.getItem('oidc.clients.'+idp);

    if (s_client) {
      await save_data('oidc.session', s_session);
      await save_data('oidc.clients.'+idp, s_client);
      Browser.api.runtime.sendMessage({cmd:'store_updated', key:'oidc.session'});

    }
  }    


  setTimeout(function (){
      Browser.api.runtime.sendMessage({cmd:'close_oidc'});
  }, 1500);
}


async function save_data(key, val) 
{
    var rec = {};
    rec[key]=val;
    if (Browser.isChromeWebExt) {
      return new Promise(function (resolve, reject) {
        Browser.api.storage.local.set(rec, () => {
          resolve()
        });
      })
    } else {
      return Browser.api.storage.local.set(rec);
    }
}


})();