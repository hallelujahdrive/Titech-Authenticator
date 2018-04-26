/*
Just draw a border round the document.body.
*/
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
    } else {
        authAccountAndPassword(items);
    }
}

function authAccountAndPassword(items) {
    let account = items.account;
    let password = items.password;
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

function authMatrix(items, array) {
    let matrix = items.matrix;

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

function onError(error) {
    console.log(`Error: ${error}`);
}

// default
let form = document.forms[0];
let getting = browser.storage.local.get();
getting.then(onGot, onError);
