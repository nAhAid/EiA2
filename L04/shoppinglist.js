"use strict";
/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <29.10.2022>
Quellen: <Ich, StackOverflow>
*/
var L04_shoppingList;
(function (L04_shoppingList) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let input = document.getElementById("input");
        input.addEventListener("change", handleInputChange);
        let button = document.getElementById("commit");
        button.addEventListener("click", handleButton);
        writeList();
    }
    function handleInputChange(_event) {
        let formData = new FormData(document.forms[0]);
        console.log(formData);
        /* for (let entry of formData) {

            if (entry[0] == "checkbox") {
                htmlBuyNext = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
                buyNext = JSON.parse(htmlBuyNext.value);
                console.log(buyNext);

            }

            else if (entry[0] == "Product") {
                htmlProduct = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
                product = htmlProduct.value;
                console.log(product);
            }

            else if (entry[0] == "Quantity") {
                htmlQuantity = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
                quantity = parseInt(htmlQuantity.value);
                console.log(quantity);
            }

            else if (entry[0] == "Comment") {
                htmlComment = <HTMLTextAreaElement>document.querySelector("[name='" + entry[0] + "']");
                comment = htmlComment.value;
                console.log(comment);
            }
        } */
        let buy = formData.get("buyNext")?.toString();
        L04_shoppingList.product = formData.get("Product")?.toString();
        L04_shoppingList.quantity = Number(formData.get("Quantity"));
        L04_shoppingList.comment = formData.get("Comment")?.toString();
        if (buy != "true") {
            L04_shoppingList.buyNext = false;
        }
        else if (buy == "true") {
            L04_shoppingList.buyNext = true;
        }
        console.log(L04_shoppingList.product);
        console.log(L04_shoppingList.quantity);
        console.log(L04_shoppingList.buyNext);
        console.log(L04_shoppingList.comment);
    }
    function handleButton(_event) {
        //console.log("Button clicked!");
        let checked = document.querySelector("#check");
        if (checked.value == "") {
            L04_shoppingList.inputs.push({ product: L04_shoppingList.product, quantity: L04_shoppingList.quantity, buyNext: L04_shoppingList.buyNext, isDone: L04_shoppingList.isDone, comment: L04_shoppingList.comment, lastPurchase: L04_shoppingList.lastPurchase });
            console.log(L04_shoppingList.inputs);
        }
        else if (checked.value != "") {
            let element = parseInt(checked.value);
            L04_shoppingList.inputs[element] = { product: L04_shoppingList.product, quantity: L04_shoppingList.quantity, buyNext: L04_shoppingList.buyNext, isDone: L04_shoppingList.isDone, comment: L04_shoppingList.comment, lastPurchase: L04_shoppingList.lastPurchase };
        }
        L04_shoppingList.product = "";
        L04_shoppingList.quantity = 0;
        L04_shoppingList.buyNext = false;
        L04_shoppingList.isDone = false;
        L04_shoppingList.comment = "";
        L04_shoppingList.lastPurchase = "";
        let check = document.querySelector("#check");
        check.value = "";
        L04_shoppingList.htmlProduct = document.querySelector("#product");
        L04_shoppingList.htmlProduct.value = L04_shoppingList.product;
        L04_shoppingList.htmlQuantity = document.querySelector("#quantity");
        L04_shoppingList.htmlQuantity.value = L04_shoppingList.quantity.toString();
        L04_shoppingList.htmlBuyNext = document.querySelector("#buyNext");
        L04_shoppingList.htmlBuyNext.checked = L04_shoppingList.buyNext;
        L04_shoppingList.htmlComment = document.querySelector("#comment");
        L04_shoppingList.htmlComment.value = L04_shoppingList.comment;
        writeList();
    }
    function writeList() {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < L04_shoppingList.inputs.length; index++) {
            let checked = L04_shoppingList.inputs[index].isDone ? "done" : "open";
            let buyNext = L04_shoppingList.inputs[index].buyNext ? "buy" : "dontbuy";
            if (L04_shoppingList.inputs[index].lastPurchase != undefined) {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + L04_shoppingList.inputs[index].product + ", " + L04_shoppingList.inputs[index].quantity + ", " + L04_shoppingList.inputs[index].comment + ", " + L04_shoppingList.inputs[index].lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
            else {
                list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + L04_shoppingList.inputs[index].product + ", " + L04_shoppingList.inputs[index].quantity + ", " + L04_shoppingList.inputs[index].comment + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            }
        }
        for (let index = 0; index < L04_shoppingList.inputs.length; index++) {
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
            //console.log("Element " + newID + " is about to change");
            editElement(newID);
        }
    }
    function clickList(_bought) {
        L04_shoppingList.inputs[_bought].isDone = !L04_shoppingList.inputs[_bought].isDone;
        console.log(L04_shoppingList.inputs[_bought].isDone);
        /* let date: number = 0;
        date = Date.now(); */
        let date = new Date();
        L04_shoppingList.inputs[_bought].lastPurchase = date.toString();
        console.log(L04_shoppingList.inputs[_bought].lastPurchase);
        writeList();
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
    function deleteElement(_element) {
        L04_shoppingList.inputs.splice(_element, 1);
        writeList();
    }
    function editElement(_element) {
        L04_shoppingList.product = L04_shoppingList.inputs[_element].product;
        L04_shoppingList.quantity = L04_shoppingList.inputs[_element].quantity;
        L04_shoppingList.buyNext = L04_shoppingList.inputs[_element].buyNext;
        L04_shoppingList.comment = L04_shoppingList.inputs[_element].comment;
        let check = document.querySelector("#check");
        check.value = (_element).toString();
        L04_shoppingList.htmlProduct = document.querySelector("#product");
        L04_shoppingList.htmlProduct.value = L04_shoppingList.product;
        L04_shoppingList.htmlQuantity = document.querySelector("#quantity");
        L04_shoppingList.htmlQuantity.value = L04_shoppingList.quantity.toString();
        L04_shoppingList.htmlBuyNext = document.querySelector("#buyNext");
        L04_shoppingList.htmlBuyNext.checked = L04_shoppingList.buyNext;
        L04_shoppingList.htmlComment = document.querySelector("#comment");
        L04_shoppingList.htmlComment.value = L04_shoppingList.comment;
        L04_shoppingList.lastPurchase = L04_shoppingList.inputs[_element].lastPurchase;
    }
})(L04_shoppingList || (L04_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map