/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <28.10.2022>
Quellen: <Ich, StackOverflow>
*/

namespace L03_shoppingList {
    window.addEventListener("load", handleLoad);

    let formData: FormData = new FormData(document.forms[0]);

    interface Input {
        product: string;
        quantity: number;
        buyNext: boolean;
        comment: string;
        lastPurchase: string;
    }

    let inputs: Input[] = [
        {
            product: "Milk",
            quantity: 1,
            buyNext: true,
            comment: "Pack",
            lastPurchase: "17.10.2022"
        },
        {
            product: "Eggs",
            quantity: 6,
            buyNext: false,
            comment: "Pieces",
            lastPurchase: "06.10.2022"
        }

    ];


    function handleLoad() {
        let input: HTMLDivElement = <HTMLDivElement>document.getElementById("input");
        input.addEventListener("change", handleInputChange);

        let display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
        display.addEventListener("change", handleListChange);
        
        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("commit");
        button.addEventListener("click", handleButton);

        writeList();
    }

    function handleInputChange(_event: Event) {

        for (let entry of formData) {
            //console.log(entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
            console.log(item.value);
        }
    }

    function handleListChange(_event: Event) {
        let checked: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log(checked.checked);
    }

    function handleButton (_event: MouseEvent) {
        console.log("Button geclickt!");
    }


    function writeList(): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uList");
        list.innerHTML = "";

        inputs.forEach((value, index) => {
            let classes: string = value.buyNext ? "done" : "open";
            list.innerHTML += "<li id=\"listElement" + index + "\" class=\"" + classes + "\">" + value.product + ", " + value.quantity + ", " + value.comment + ", " + value.lastPurchase + " <img id=\"removeElement" + index + "\" class=\"trash\" src=\"assets/trash.png\"><img id=\"editElement" + index + "\" class=\"trash\" src=\"assets/edit.png\"></li>";
            let listElement: HTMLElement = <HTMLElement>document.querySelector("#listElement" + index);
            listElement.addEventListener("click", handleClick);

            let removeElement: HTMLElement = <HTMLElement>document.querySelector("#removeElement" + index);
            //removeElement.addEventListener("click", removeList(index));
            let editElement: HTMLElement = <HTMLElement>document.querySelector("#editElement" + index);
            //editElement.addEventListener("click", editList);


        });


    }

    function handleClick(_event: MouseEvent): void {
        console.log(_event.target);
    }

    function clickList(toDoIndex: number): void {

        inputs[toDoIndex].buyNext = !inputs[toDoIndex].buyNext;
        writeList();
    }

    function removeList(_elementIndex: string) {
        console.log(_elementIndex);
    }

    function editList(_elementIndex: number) {
        console.log(_elementIndex);
    }



}