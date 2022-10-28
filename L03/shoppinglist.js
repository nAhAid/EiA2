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
        /* inputs.forEach((value, index) => {
            let checked: string = value.buyNext ? "done" : "open";
            list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + "\">" + value.product + ", " + value.quantity + ", " + value.comment + ", " + value.lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            let listElement: HTMLElement = <HTMLElement>document.querySelector("#listElement" + index);
            listElement.addEventListener("click", handleClick);

            let removeElement: HTMLElement = <HTMLElement>document.querySelector("#removeElement" + index);
            //removeElement.addEventListener("click", removeList(index));
            let editElement: HTMLElement = <HTMLElement>document.querySelector("#editElement" + index);
            //editElement.addEventListener("click", editList);


        }); */
        for (let index = 0; index < inputs.length; index++) {
            let checked = inputs[index].isDone ? "done" : "open";
            let buyNext = inputs[index].buyNext ? "buy" : "dontbuy";
            list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].comment + ", " + inputs[index].lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            installListener(index);
            //let listElement: HTMLElement = <HTMLElement>document.querySelector("#listElement" + index);
            //listElement.addEventListener("click", handleClick);
        }
    }
    function installListener(index) {
        let listElement = document.querySelector("#listElement" + index);
        listElement.addEventListener("click", handleClick);
    }
    function handleClick(_event) {
        console.log(_event.target);
    }
    function clickList(toDoIndex) {
        inputs[toDoIndex].buyNext = !inputs[toDoIndex].buyNext;
        writeList();
    }
    function removeList(_elementIndex) {
        console.log(_elementIndex);
    }
    function editList(_elementIndex) {
        console.log(_elementIndex);
    }
})(L03_shoppingList || (L03_shoppingList = {}));
//# sourceMappingURL=shoppinglist.js.map