"use strict";
/*
Aufgabe: <L04_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <17.11.2022>
Quellen: <Ich>
*/
var L06_shoppingList;
(function (L06_shoppingList) {
    let product = "";
    let quantity;
    let buyNext;
    let isDone;
    let comment = "";
    let lastPurchase = "";
    let htmlProduct;
    let htmlQuantity;
    let htmlBuyNext;
    let htmlComment;
    let inputs;
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        let input = document.getElementById("input");
        input.addEventListener("change", handleInputChange);
        let button = document.getElementById("commit");
        button.addEventListener("click", handleButton);
        await requestList();
    }
    async function requestList() {
        let response = await fetch("data.json");
        let list = await response.text();
        inputs = JSON.parse(list);
        writeList(inputs);
    }
    async function sendListElement(_element, _command) {
        let sendInputs = JSON.stringify(inputs);
        let query = new URLSearchParams(sendInputs);
        await fetch("shoppinglist.html?command=" + _command + "&collection=Data&id=" + _element + "&" + query.toString());
        alert("List Send!!");
        requestList();
    }
    function handleInputChange(_event) {
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        let buy = formData.get("buyNext")?.toString();
        product = formData.get("Product")?.toString();
        quantity = Number(formData.get("Quantity"));
        comment = formData.get("Comment")?.toString();
        if (buy != "true") {
            buyNext = false;
        }
        else if (buy == "true") {
            buyNext = true;
        }
    }
    function handleButton(_event) {
        if (product == "") {
            return;
        }
        else {
            let checked = document.querySelector("#check");
            if (checked.value == "") {
                inputs.push({ product, quantity, buyNext, isDone, comment, lastPurchase });
                sendListElement(0, "insert");
            }
            else if (checked.value != "") {
                let element = parseInt(checked.value);
                inputs[element] = { product, quantity, buyNext, isDone, comment, lastPurchase };
                sendListElement(element, "update");
            }
            product = "";
            quantity = 0;
            buyNext = false;
            isDone = false;
            comment = "";
            lastPurchase = "";
            let check = document.querySelector("#check");
            check.value = "";
            htmlProduct = document.querySelector("#product");
            htmlProduct.value = product;
            htmlQuantity = document.querySelector("#quantity");
            htmlQuantity.value = quantity.toString();
            htmlBuyNext = document.querySelector("#buyNext");
            htmlBuyNext.checked = buyNext;
            htmlComment = document.querySelector("#comment");
            htmlComment.value = comment;
        }
    }
    function writeList(_inputs) {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < _inputs.length; index++) {
            let checked = _inputs[index].isDone ? "done" : "open";
            let buyNext = _inputs[index].buyNext ? "buy" : "dontbuy";
            if (_inputs[index].lastPurchase != "" && _inputs[index].comment != "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + _inputs[index].product + ", " + _inputs[index].quantity + ", " + _inputs[index].comment + ", " + _inputs[index].lastPurchase + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (_inputs[index].lastPurchase != "" && _inputs[index].comment == "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + _inputs[index].product + ", " + _inputs[index].quantity + ", " + _inputs[index].lastPurchase + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (_inputs[index].lastPurchase == "" && _inputs[index].comment == "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + _inputs[index].product + ", " + _inputs[index].quantity + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (_inputs[index].lastPurchase == "" && _inputs[index].comment != "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + _inputs[index].product + ", " + _inputs[index].quantity + ", " + _inputs[index].comment + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
        }
        for (let index = 0; index < _inputs.length; index++) {
            let listElement = document.querySelector("#listElement" + index);
            listElement.addEventListener("click", handleClick);
        }
    }
    function handleClick(_event) {
        let id = _event.target.id;
        if (id.includes("listElement")) {
            let newID = cutID(id, 11);
            clickList(newID);
        }
        else if (id.includes("removeElement")) {
            let newID = cutID(id, 13);
            deleteElement(newID);
        }
        else if (id.includes("editElement")) {
            let newID = cutID(id, 11);
            editElement(newID);
        }
        else if (id.includes("buyNextElement")) {
            let newID = cutID(id, 14);
            buyNexttime(newID);
        }
    }
    function clickList(_bought) {
        inputs[_bought].isDone = !inputs[_bought].isDone;
        let date = new Date();
        let day = date.getDate();
        let month = (new Date().getMonth() + 1);
        let year = date.getFullYear();
        inputs[_bought].lastPurchase = day.toString() + "." + month.toString() + "." + year.toString();
        sendListElement(_bought, "update");
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
    function deleteElement(_element) {
        inputs.splice(_element, 1);
        sendListElement(_element, "delete");
    }
    function buyNexttime(_element) {
        inputs[_element].buyNext = !inputs[_element].buyNext;
        sendListElement(_element, "update");
    }
    function editElement(_element) {
        product = inputs[_element].product;
        quantity = inputs[_element].quantity;
        buyNext = inputs[_element].buyNext;
        comment = inputs[_element].comment;
        let check = document.querySelector("#check");
        check.value = (_element).toString();
        htmlProduct = document.querySelector("#product");
        htmlProduct.value = product;
        htmlQuantity = document.querySelector("#quantity");
        htmlQuantity.value = quantity.toString();
        htmlBuyNext = document.querySelector("#buyNext");
        htmlBuyNext.checked = buyNext;
        htmlComment = document.querySelector("#comment");
        htmlComment.value = comment;
        lastPurchase = inputs[_element].lastPurchase;
    }
})(L06_shoppingList || (L06_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map