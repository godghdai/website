function requst(url, fn) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
            fn.call(this, xhr.responseText);
        }
    };
    xhr.send();
}


window.onload = function() {
    var keyword = document.getElementById("keyword");
    var search = document.getElementById("search");
    var result = document.getElementById("result");
    search.onclick = function() {
        //requst("http://39.97.120.241:3389/search/"
        reload(keyword.value);
    }
}

function reload(word) {
    requst("http://127.1.1.1:3389/search/" + word, function(res) {
        var data = JSON.parse(res);
        var html = "";
        for (var i = 0; i < data.length; i++) {
            html += "<a class='item'><span class='title'>" + data[i].name + "</span><p class='detail'>" + data[i].content + "</p></a>"
        }
        result.innerHTML = html;
        bindClickEvent();
    });
}

function bindClickEvent() {
    var childs = result.children;
    for (var i = 0; i < childs.length; i++) {
        childs[i].onclick = function() {
            keyword.value = this.children[0].innerText[3];
            reload(this.children[0].innerText[3]);
        };
    }
}