const TitechPortalURL = "https://portal.titech.ac.jp/"
const T2WirelessURL = "https://wlanauth.noc.titech.ac.jp/fs/customwebauth/techauth.html"

document.getElementById("menu_link").textContent = browser.i18n.getMessage("openTokyoTechPortalPage");
document.getElementById("menu_link").addEventListener("click", function(e) {
  browser.tabs.create({
    url: TitechPortalURL
  });
});

document.getElementById("menu_login").textContent = browser.i18n.getMessage("loginT2Wireless");
document.getElementById("menu_option").textContent = browser.i18n.getMessage("optionsTitle");
document.getElementById("menu_option").addEventListener("click", function(e) {
  browser.tabs.create({
    url: "../options.html"
  });
});