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
        let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        console.log(inputs);
        console.log(inputs[1]);
    }


}