/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <29.10.2022>
Quellen: <Ich, StackOverflow>
*/

namespace L04_shoppingList {
    window.addEventListener("load", handleLoad);

    let formData: FormData = new FormData(document.forms[0]);


    function handleLoad() {
        let input: HTMLDivElement = <HTMLDivElement>document.getElementById("input");
        input.addEventListener("change", handleInputChange);

        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("commit");
        button.addEventListener("click", handleButton);

        writeList();

        console.log(formData);
    }

    function handleInputChange(_event: Event) {

        for (let entry of formData) {
            console.log(entry);

            if (entry[0] == "Radiogroup") {
                let item: HTMLInputElement = <HTMLInputElement>document.querySelector("#" + entry[1]);
                console.log(item.value);
            }

            else if (entry[0] != "Radiogroup") {
                let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
                console.log(item.value);
            }
        }
    }

    function handleButton(_event: MouseEvent) {
        console.log("Button clicked!");


    }


    function writeList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uList");
        list.innerHTML = "";

        for (let index: number = 0; index < inputs.length; index++) {
            let checked: string = inputs[index].isDone ? "done" : "open";
            let buyNext: string = inputs[index].buyNext ? "buy" : "dontbuy";

            list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + checked + " " + buyNext + "\" >" + inputs[index].product + ", " + inputs[index].quantity + ", " + inputs[index].comment + ", " + inputs[index].lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";

        }
        for (let index: number = 0; index < inputs.length; index++) {
            let listElement: HTMLElement = <HTMLElement>document.querySelector("#listElement" + index);
            listElement.addEventListener("click", handleClick);

        }
    }

    function handleClick(_event: MouseEvent): void {

        let id: string = (_event.target as Element).id;

        if (id.includes("listElement")) {
            let newID: number = cutID(id, 11);
            clickList(newID);

        }

        else if (id.includes("removeElement")) {
            let newID: number = cutID(id, 13);
            console.log("Delete List Element " + newID);

            deleteElement(newID);

        }

        else if (id.includes("editElement")) {
            let newID: number = cutID(id, 11);
            console.log("Element " + newID + " is about to change");
        }
    }

    function clickList(_bought: number): void {

        inputs[_bought].isDone = !inputs[_bought].isDone;
        console.log(inputs[_bought].isDone);
        let date: number = 0;

        date = Date.now();
        inputs[_bought].lastPurchase = date.toString();

        writeList();
    }

    function cutID(_id: string, _length: number) {
        let newId: string = _id.slice(_length);
        return parseInt(newId);
    }

    function deleteElement (_element: number) {
        inputs.splice(_element, 1);
        writeList();
    }

}