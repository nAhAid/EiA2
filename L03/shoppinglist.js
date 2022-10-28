"use strict";
/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <28.10.2022>
Quellen: <Ich, StackOverflow>
*/
var L03_shoppingList;
(function (L03_shoppingList) {
    window.addEventListener("load", handleLoad);
    let formData = new FormData(document.forms[0]);
    let inputs = [
        {
            product: "Milk",
            quantity: 1,
            buyNext: true,
            isDone: false,
            comment: "Pack",
            lastPurchase: "17.10.2022"
        },
        {
            product: "Eggs",
            quantity: 6,
            buyNext: false,
            isDone: true,
            comment: "Pieces",
            lastPurchase: "06.10.2022"
        },
        {
            product: "Cheese",
            quantity: 1,
            buyNext: true,
            isDone: false,
            comment: "Pack",
            lastPurchase: "10.10.2022"
        }
    ];
    function handleLoad() {
        let input = document.getElementById("input");
        input.addEventListener("change", handleInputChange);
        let display = document.getElementById("display");
        display.addEventListener("change", handleListChange);
        let button = document.getElementById("commit");
        button.addEventListener("click", handleButton);
        writeList();
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
    function handleButton(_event) {
        console.log("Button clicked!");
    }
    function writeList() {
        let list = document.querySelector("#uList");
        list.innerHTML = "";
        for (let index = 0; index < inputs.length; index++) {
            let checked = inputs[index].isDone ? "done" : "open";
            let buyNext = inputs[index].buyNext ? "buy" : "dontbuy";
            list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].comment + ", " + inputs[index].lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
        }
        for (let index = 0; index < inputs.length; index++) {
            installListener(index);
        }
    }
    function installListener(index) {
        let listElement = document.querySelector("#listElement" + index);
        listElement.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        //console.log(_event.target);
        //console.log(_event.currentTarget);
        let id = _event.target.id;
        //console.log(id);
        if (id.includes("listElement")) {
            let newID = cutID(id, 11);
            clickList(newID);
        }
        else if (id.includes("removeElement")) {
            let newID = cutID(id, 13);
            console.log("Delete List Element " + newID);
        }
        else if (id.includes("editElement")) {
            let newID = cutID(id, 11);
            console.log("Element " + newID + " is about to change");
        }
    }
    function clickList(_bought) {
        inputs[_bought].isDone = !inputs[_bought].isDone;
        writeList();
    }
    function cutID(_id, _length) {
        let newId = _id.slice(_length);
        return parseInt(newId);
    }
})(L03_shoppingList || (L03_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map