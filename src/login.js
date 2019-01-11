  const popupUri = "https://solid.openlinksw.com:8444/common/popup.html";

  solid.auth.trackSession(session => {
    var webid = session ? session.webId : null;
    if (webid) {
      window.close();
    }
  })



  setTimeout(function (){
    solid.auth.popupLogin({popupUri});
  }, 3000);

