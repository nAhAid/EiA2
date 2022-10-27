namespace L03_shoppingList {
    window.addEventListener("load", handleLoad);

    function handleLoad () {
        let input: HTMLDivElement = <HTMLDivElement>document.getElementById("input");
        input.addEventListener("change", handleInputChange);

        let display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
        display.addEventListener("change", handleListChange);
    }

    function handleInputChange (_event: Event) {
        console.log(_event.target);
    }

    function handleListChange (_event: Event) {
        console.log(_event.target);
    }
}