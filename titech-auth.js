/*
Just draw a border round the document.body.
*/
const authURL = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login";
const accountAndPasswordURL = "https://portal.nap.gsic.titech.ac.jp/GetAccess/Login?Template=userpass_key&AUTHMETHOD=UserPassword&LOCALE=ja_JP";

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
        openOptions(browser.i18n.getMessage("matrixConfirmMessage"));
    }
}

function authAccountAndPassword(items) {
    let account = items.account;
    let password = items.password;
    
    console.debug (document.referrer);

    if (account == null || account == "" || password == null || password == "") {
        openOptions (browser.i18n.getMessage("accountAndPasswordConfirmMessage"));
    } else if (document.referrer != accountAndPasswordURL){
        let result = document.evaluate(".//input[contains(@name, 'usr')]", document.body, null, XPathResult.ANY_TYPE, null);

        let node;
        let inputs = new Array();
        while (node = result.iterateNext()){
            inputs.push(node);
        }

        inputs[0].value = account;
        inputs[1].value = password;

        form.submit();
    }
}

function authMatrix(items, array) {
    let matrix = items.matrix;
    

    if (matrix == null) {
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
        form.submit();
    }
}

function openOptions (message) {
    if (window.confirm(message)) {
        // do something.
        window.open (browser.extension.getURL("options.html"), "_blank");
    }
}

function onError(error) {
    console.log(`Error: ${error}`);
}

// default
let form = document.forms[0];
let getting = browser.storage.local.get();
getting.then(onGot, onError);
