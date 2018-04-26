function createTable () {
    // 表の作成開始
    var rows = [];
    var table = document.createElement("table");
    table.id = "matrix_table"

    // 表に2次元配列の要素を格納
    for (i = 0; i < 8; i++) {
        rows.push(table.insertRow(-1));
        for (j = 0; j < 11; j++) {
            cell = rows[i].insertCell(-1);
            cell.width = "25";
            cell.align = "center";
            let elem;
            // 背景色の設定
            if (i == 0 || j == 0) {
                cell.style.backgroundColor = "#bbb"; // ヘッダ行
                let text = "";
                if (i + j > 0) {
                    if (i == 0) {
                        text =  String.fromCharCode("@".charCodeAt(0) + j);
                    }else if (j == 0) {
                        text = String(i);
                    }
                }
                elem = document.createTextNode(text);
            } else {
                cell.style.backgroundColor = "#ddd"; // ヘッダ行以外
                elem = document.createElement("input");
                elem.style.border = "none"
                elem.type = "text";
                elem.size = "1";
                elem.maxLength = "1";
            }
            cell.appendChild(elem);
        }
    }
    document.getElementById("matrix_area").appendChild(table);
}

createTable();