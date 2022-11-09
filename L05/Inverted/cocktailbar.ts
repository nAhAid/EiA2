

namespace L05_CocktailBar {
    window.addEventListener("load", handleLoad);

    function handleLoad() {
       
        generateContent(data);

        let form: HTMLElement = <HTMLElement>document.getElementById("form");
        form.addEventListener("change", handleChange);

        let slider: HTMLElement = <HTMLElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);

        console.log("Start");
        communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
        console.log("End");

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


        let formData: FormData = new FormData(document.forms[0]);
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