(function () {
    var $$ = function (sel, con) {
        return Array.prototype.slice.call((con||document).querySelectorAll(sel));
    }
    Array.prototype.addEventListener = function (type, listener, options) {
        this.forEach(function(element) {
            if (element instanceof Element) {
                element.addEventListener(type, listener, options);
            }
        });
    }

    var editors = $$(".edit");
    for (var i = 0; i < editors.length; i++) {
        if (!editors[i].getAttribute("id")) editors[i].setAttribute("id", "editor" + i);
        var editor = ace.edit(editors[i].getAttribute("id"));
        editor.setTheme("ace/theme/github");
        editor.setOptions({fontSize: "16px"});
        editor.session.setMode("ace/mode/javascript");
        editors[i] = editor;
    }

    $$('.test').addEventListener("click", function (e) {
        var num = e.target.id.replace(/[a-zA-Z]/g,"");
        var editorId = "editor" + num;
        var testId   = "test"   + num;
        var editor   = ace.edit(editorId);
        var source   = editor.getValue();
        var testSource = document.getElementById(testId).textContent;
        var testResult = eval(source + ";" + testSource);
        if (testResult == true) {
            alert("test passed :)");
        } else {
            alert("test failed :(");
        }
        e.preventDefault();
    })


}());
