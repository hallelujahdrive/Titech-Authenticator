
function saveOptions(e) {
  e.preventDefault();

  // tableから二元配列を生成
  let csv = [];
  let table = document.getElementById("matrix_table");

  for (let i = 1; i < table.rows.length; i++) {
    let row = [];
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      row.push(table.rows[i].cells[j].getElementsByTagName("input")[0].value);
    }
    csv.push (row);
  }

  browser.storage.local.set({
    account: document.querySelector("#account").value,
    password: document.querySelector("#password").value,
    matrix: csv
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#account").value = result.account || Null;
    document.querySelector("#password").value = result.password || Null;
    setMatrixData(result.matrix);
  }

  function onError(error) {
    alert(`Error: ${error}`);
  }

  let getting = browser.storage.local.get();
  getting.then(setCurrentChoice, onError);
}

 // CSVを二元配列に整形
function setMatrix(data) {

  let lines = data.split(/[\n\r]+/);
  let csv = new Array();
  for (let line of lines) {
    csv.push(line.split(","));
  }

  setMatrixData(csv);
}

// 二元配列を挿入
function setMatrixData(csv) {
  let table = document.getElementById("matrix_table");
  for (let i = 1; i < table.rows.length; i++) {
    for (let j = 1; j < table.rows[i].cells.length; j++) {
      let elem = table.rows[i].cells[j].getElementsByTagName("input")[0];
      elem.value = csv[i - 1][j - 1];
    }
  }
}

function handleFiles(e) {
  let file = e.target.files[0];
  
  var reader = new FileReader();
  reader.onload = function () {
    // tableに挿入
    setMatrix(reader.result);
  }
  reader.readAsText(file);
}

document.title = browser.i18n.getMessage ("optionsTitle");
document.getElementById("submit").textContent = browser.i18n.getMessage("submitButtonText");
document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.getElementById("matrix_input").addEventListener("change", handleFiles);