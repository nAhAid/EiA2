"use strict";
/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <27.10.2022>
Quellen: <Ich, StackOverflow>
*/
var L03_shoppingList;
(function (L03_shoppingList) {
    window.addEventListener("load", handleLoad);
    let formData = new FormData(document.forms[0]);
    function handleLoad() {
        let input = document.getElementById("input");
        input.addEventListener("change", handleInputChange);
        let display = document.getElementById("display");
        display.addEventListener("change", handleListChange);
    }
    function handleInputChange(_event) {
        for (let entry of formData) {
            //console.log(entry);
            let item = document.querySelector("[name='" + entry[0] + "']");
            console.log(item.value);
        }
    }
    function handleListChange(_event) {
        let checked = _event.target;
        console.log(checked.checked);
    }
    function writeList() {
    }
})(L03_shoppingList || (L03_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map