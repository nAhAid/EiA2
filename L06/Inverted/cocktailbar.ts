namespace L06_CocktailBar {
    window.addEventListener("load", handleLoad);

    let form: HTMLFormElement;

    interface FormDataJSON {
        [key: string]: FormDataEntryValue | FormDataEntryValue[];
    }

   
    let json: FormDataJSON = {};


    async function handleLoad(): Promise<void> {

        let response: Response = await fetch("https://webuser.hs-furtwangen.de/~haiderna/Database/Data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);


        generateContent(data);

        form = <HTMLFormElement>document.getElementById("form");
        form.addEventListener("change", handleChange);

        let slider: HTMLElement = <HTMLElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        console.log(submit);

        submit.addEventListener("click", sendOrder);

        console.log("Start");
        communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
        console.log("End");

    }

    async function sendOrder(_event: Event): Promise<void> {
        //console.log("Send order!");

        let formData: FormData = new FormData(form);
    
        for (let key of formData.keys())
            if (!json[key]) {
                let values: FormDataEntryValue[] = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }

        let query: URLSearchParams = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Data");
        query.set("data", JSON.stringify(json));



        await fetch("cocktailbar.html?" + query.toString());
        alert("Order Send!!");

    }

    function handleChange(_event: Event): void {
        displayOrder();
    }

    function displayAmount(_event: Event): void {
        let progress: HTMLProgressElement = <HTMLProgressElement>document.querySelector("progress");
        let amount: string = (<HTMLInputElement>_event.target).value;
        progress.value = parseFloat(amount);

    }

    function displayOrder() {
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        //console.log(inputs);
        //console.log(inputs[1]);

        let order: HTMLDivElement = <HTMLDivElement>document.getElementById("order_text");
        order.innerHTML = "";
        let total: number = 0;
        let totalOrder: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("total");


        let formData: FormData = new FormData(form);
        //console.log(formData);
        for (let entry of formData) {
            console.log(entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            let price: number = Number(item.getAttribute("price"));

            if (item.name == undefined && entry[0] != "Amount") {
                let amount: number = parseFloat(checkAmount());
                let cocktailPrice: number = price * amount;
                order.innerHTML += item.value + "     " + cocktailPrice + " € <br>";
                total += cocktailPrice;
            }

            else if (entry[0] == "Amount") {
                console.log(item.value);
            }

            else if (item.name != "Amount") {
                order.innerHTML += item.value + "     " + price + " € <br>";
                total += price;
            }
        }

        total = round(total, 2);
        totalOrder.innerHTML = "<b>" + total + " €";

    }

    function checkAmount() {
        let amount: string = (<HTMLInputElement>document.querySelector("input#amount")).value;

        return (amount);
    }

    function round(num: number, fractionDigits: number): number {
        return Number(num.toFixed(fractionDigits));
    }

}