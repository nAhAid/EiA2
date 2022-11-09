"use strict";
/*
Aufgabe: <L04_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <09.11.2022>
Quellen: <Ich, StackOverflow>
*/
var L05_shoppingList;
(function (L05_shoppingList) {
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
    window.addEventListener("load", handleLoad);
    async function handleLoad() {
        let input = document.getElementById("input");
        input.addEventListener("change", handleInputChange);
        let button = document.getElementById("commit");
        button.addEventListener("click", handleButton);
        await requestList();
    }
    async function requestList() {
        let response = await fetch("Data.json");
        let list = await response.text();
        let inputs = JSON.parse(list);
        writeList(inputs);
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
            }
            else if (checked.value != "") {
                let element = parseInt(checked.value);
                inputs[element] = { product, quantity, buyNext, isDone, comment, lastPurchase };
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
            //writeList();
        }
    }
    function writeList(_inputs) {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < inputs.length; index++) {
            let checked = inputs[index].isDone ? "done" : "open";
            let buyNext = inputs[index].buyNext ? "buy" : "dontbuy";
            if (inputs[index].lastPurchase != "" && inputs[index].comment != "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].comment + ", " + inputs[index].lastPurchase + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (inputs[index].lastPurchase != "" && inputs[index].comment == "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].lastPurchase + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (inputs[index].lastPurchase == "" && inputs[index].comment == "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else if (inputs[index].lastPurchase == "" && inputs[index].comment != "") {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].comment + " <img id=\"buyNextElement" + index + "\" class=\"trash\" src=\"assets/mark.png\"><img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
        }
        for (let index = 0; index < inputs.length; index++) {
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
        //writeList();
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
    function deleteElement(_element) {
        inputs.splice(_element, 1);
        //writeList();
    }
    function buyNexttime(_element) {
        inputs[_element].buyNext = !inputs[_element].buyNext;
        //writeList();
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
})(L05_shoppingList || (L05_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map