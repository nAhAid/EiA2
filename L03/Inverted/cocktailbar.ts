namespace L03_CocktailBar {
    window.addEventListener("load", handleLoad);

    function handleLoad() {
        let form: HTMLElement = <HTMLElement>document.getElementById("form");
        form.addEventListener("change", handleChange);

        let slider: HTMLElement = <HTMLElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
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

        let formData: FormData = new FormData(document.forms[0]);
        //console.log(formData);
        for (let entry of formData) {
            console.log(entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            let price: number = Number(item.getAttribute("price"));
            console.log(price);
        }
    }


}