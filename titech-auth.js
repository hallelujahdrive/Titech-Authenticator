/*
Just draw a border round the document.body.
*/
const authURL = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login";
const accountAndPasswordURL = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword&LOCALE=ja_JP";
const timeLimitMessage = "You have exceeded the login time limit. Please try again.";

function onGot(items) {
    // authenicate
    let result = document.evaluate(".//th/text()", document.body, null, XPathResult.ANY_TYPE, null);

    let node;
    let array = new Array();
    while (node = result.iterateNext()){
        let value = node.nodeValue;
        array.push([value.charAt(1), value.charAt(3)]);
    }
    if (array.length == 3) {
        authMatrix(items, array);
    } else if (array.length == 2){
        authAccountAndPassword(items);
    } else {
        let f = false;
        let result = document.evaluate(".//td[1]/text()", document.body, null, XPathResult.ANY_TYPE, null);
        while (node = result.iterateNext()){
            if (node.nodeValue == timeLimitMessage ){
                f = true;
            }
        }
        if (!f) {
            openOptions(browser.i18n.getMessage("matrixConfirmMessage"));
        }
    }
}

function authAccountAndPassword(items) {
    let account = items.account;
    let password = items.password;
    
    if (account == null || account == "" || password == null || password == "") {
        // 設定されていなければ設定画面を表示
        openOptions (browser.i18n.getMessage("accountAndPasswordConfirmMessage"));
    } else if (document.referrer != accountAndPasswordURL){
        let result = document.evaluate(".//input[contains(@name, 'usr')]", document.body, null, XPathResult.ANY_TYPE, null);

        let node;
        let inputs = new Array();
        while (node = result.iterateNext()){
            inputs.push(node);
        }

        // 値のセット
        inputs[0].value = account;
        inputs[1].value = password;
        
        // submit
        submit();
    }
}

function authMatrix(items, array) {
    let matrix = items.matrix;
    

    if (matrix == null) {
        // 設定されていなければ設定画面を表示
        openOptions (browser.i18n.getMessage("matrixConfirmMessage"));
    } else if (document.referrer != authURL){
        // inputの取得
        let result = document.evaluate(".//input[contains(@name, 'message')]", document.body, null, XPathResult.ANY_TYPE, null);

        let node;
        let inputs = new Array();
        while (node = result.iterateNext()){
            inputs.push(node);
        }

        let keys = new Array();
        for (let a of array) {
            keys.push(matrix[a[1] - 1][a[0].charCodeAt(0) - "A".charCodeAt(0)]);
        }

        // 値のセット
        for (let i = 0; i < keys.length; i++) {
            inputs[i + 1].value = keys[i];
        }
        
        // submit
        submit();
    }
}

function openOptions (message) {
    if (window.confirm(message)) {
        // do something.
        window.open (browser.extension.getURL("options.html"), "_blank");
    }
}

function submit () {
    // formのsubmitの発火
    let form = document.forms[0];
    form.submit ();
    
    // 誤操作防止にinputをすべてdisableに
    let result = document.evaluate(".//input", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (let i = 0; i < result.snapshotLength; i++ ) {
        result.snapshotItem (i).disabled = true;
    }

}

function onError(error) {
    console.log(`Error: ${error}`);
}

// default
let getting = browser.storage.local.get();
getting.then(onGot, onError);
