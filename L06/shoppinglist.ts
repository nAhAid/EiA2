/*
Aufgabe: <L04_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <17.11.2022>
Quellen: <Ich>
*/

namespace L06_shoppingList {
    export interface Input {
        product: string;
        quantity: number;
        buyNext: boolean;
        isDone: boolean;
        comment: string;
        lastPurchase: string;
    }

    let product: string = "";
    let quantity: number;
    let buyNext: boolean;
    let isDone: boolean;
    let comment: string = "";
    let lastPurchase: string = "";

    let htmlProduct: HTMLInputElement;
    let htmlQuantity: HTMLInputElement;
    let htmlBuyNext: HTMLInputElement;
    let htmlComment: HTMLTextAreaElement;

    let inputs: Input[];

    window.addEventListener("load", handleLoad);



    async function handleLoad() {
        let input: HTMLDivElement = <HTMLDivElement>document.getElementById("input");
        input.addEventListener("change", handleInputChange);

        let button: HTMLButtonElement = <HTMLButtonElement>document.getElementById("commit");
        button.addEventListener("click", handleButton);

        await requestList();


    }

    async function requestList() {
        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~haiderna/Datenbank/?command=find&collection=data");
        let list: string = await response.text();
        inputs = JSON.parse(list);
        writeList(inputs);
    }

    async function sendListElement(_element: number, _command: string): Promise<void> {
        let sendInputs: string = JSON.stringify(inputs);

        let query: URLSearchParams = new URLSearchParams(<any>sendInputs);
        await fetch("https://webuser.hs-furtwangen.de/~haiderna/Datenbank/?command=" + _command + "&collection=data&id=" + _element + "&" + query.toString());
        alert("List Send!!");

        requestList();

    }

    function handleInputChange(_event: Event) {

        let formData: FormData = new FormData(document.forms[0]);

        console.log(formData);
        let buy: string | undefined = formData.get("buyNext")?.toString();
        product = formData.get("Product")?.toString()!;
        quantity = Number(formData.get("Quantity")!);
        comment = formData.get("Comment")?.toString()!;

        if (buy != "true") {
            buyNext = false;
        }

        else if (buy == "true") {
            buyNext = true;
        }

    }

    function handleButton(_event: MouseEvent) {

        if (product == "") {
            return;
        }

        else {
            let checked: HTMLInputElement = <HTMLInputElement>document.querySelector("#check");

            if (checked.value == "") {
                inputs.push({ product, quantity, buyNext, isDone, comment, lastPurchase });
                sendListElement(0, "insert");
            }

            else if (checked.value != "") {
                let element: number = parseInt(checked.value);

                inputs[element] = { product, quantity, buyNext, isDone, comment, lastPurchase };
                sendListElement(element, "update");
            }

            product = "";
            quantity = 0;
            buyNext = false;
            isDone = false;
            comment = "";
            lastPurchase = "";


            let check: HTMLInputElement = <HTMLInputElement>document.querySelector("#check");
            check.value = "";

            htmlProduct = <HTMLInputElement>document.querySelector("#product");
            htmlProduct.value = product;

            htmlQuantity = <HTMLInputElement>document.querySelector("#quantity");
            htmlQuantity.value = quantity.toString();

            htmlBuyNext = <HTMLInputElement>document.querySelector("#buyNext");
            htmlBuyNext.checked = buyNext;

            htmlComment = <HTMLTextAreaElement>document.querySelector("#comment");
            htmlComment.value = comment;

        }


    }


    function writeList(_inputs: Input[]): void {
        let list: HTMLElement = <HTMLElement>document.querySelector("#uList");
        list.innerHTML = "";

        for (let index: number = 0; index < _inputs.length; index++) {
            let checked: string = _inputs[index].isDone ? "done" : "open";
            let buyNext: string = _inputs[index].buyNext ? "buy" : "dontbuy";

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
        for (let index: number = 0; index < _inputs.length; index++) {
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
            deleteElement(newID);

        }

        else if (id.includes("editElement")) {
            let newID: number = cutID(id, 11);
            editElement(newID);

        }

        else if (id.includes("buyNextElement")) {
            let newID: number = cutID(id, 14);
            buyNexttime(newID);

        }

    }

    function clickList(_bought: number): void {

        inputs[_bought].isDone = !inputs[_bought].isDone;
        let date: Date = new Date();

        let day: number = date.getDate();
        let month: number = (new Date().getMonth() + 1);
        let year: number = date.getFullYear();

        inputs[_bought].lastPurchase = day.toString() + "." + month.toString() + "." + year.toString();

        sendListElement(_bought, "update");
    }

    function cutID(_id: string, _length: number) {
        let newId: string = _id.slice(_length);
        return parseInt(newId);
    }

    function deleteElement(_element: number) {
        inputs.splice(_element, 1);
        sendListElement(_element, "delete");

    }

    function buyNexttime(_element: number) {
        inputs[_element].buyNext = !inputs[_element].buyNext;
        sendListElement(_element, "update");
    }

    function editElement(_element: number) {
        product = inputs[_element].product;
        quantity = inputs[_element].quantity;
        buyNext = inputs[_element].buyNext;
        comment = inputs[_element].comment;

        let check: HTMLInputElement = <HTMLInputElement>document.querySelector("#check");
        check.value = (_element).toString();

        htmlProduct = <HTMLInputElement>document.querySelector("#product");
        htmlProduct.value = product;

        htmlQuantity = <HTMLInputElement>document.querySelector("#quantity");
        htmlQuantity.value = quantity.toString();

        htmlBuyNext = <HTMLInputElement>document.querySelector("#buyNext");
        htmlBuyNext.checked = buyNext;

        htmlComment = <HTMLTextAreaElement>document.querySelector("#comment");
        htmlComment.value = comment;

        lastPurchase = inputs[_element].lastPurchase;
    }

}