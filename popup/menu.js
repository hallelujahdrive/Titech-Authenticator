const TitechPortalURL = "https://portal.titech.ac.jp/"
const T2WirelessURL = "https://wlanauth.noc.titech.ac.jp/fs/customwebauth/techauth.html"

document.getElementById("menu_link").textContent = browser.i18n.getMessage("openTokyoTechPortalPage");
document.getElementById("menu_link").addEventListener("click", function(e) {
  browser.tabs.create({
    url: TitechPortalURL
  });
});

document.getElementById("menu_login").textContent = browser.i18n.getMessage("loginT2Wireless");
document.getElementById("menu_login").addEventListener("click", function(e) {
  let getting = browser.storage.local.get();
  getting.then(onGot, onError);
});

document.getElementById("menu_option").textContent = browser.i18n.getMessage("optionsTitle");
document.getElementById("menu_option").addEventListener("click", function(e) {
  browser.tabs.create({
    url: "../options.html"
  });
});


function onError(error) {
    console.log(`Error: ${error}`);
}

function openOptions (message) {
  if (window.confirm(message)) {
      // do something.
    browser.tabs.create({
        url: "../options.html"
    });
  }
}

function onGot(items) {
  let account = items.account;
  let password = items.password;
    
  if (account == null || account == "" || password == null || password == "") {
  // 設定されていなければ設定画面を表示
    openOptions (browser.i18n.getMessage("accountAndPasswordConfirmMessage"));
  } else {
      var queue = "username=" + account + "&" + "password=" + password + "&" + "buttonClicked=4";

      var xhr = new XMLHttpRequest ();
      xhr.open("POST", T2WirelessURL);
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
      xhr.onreadystatechange = function() {
 
            alert(xhr.responseText);
      }
      xhr.send(queue)
    }
}