namespace CocktailBar {
    window.addEventListener("load", handleLoad);

    function handleLoad() {
        let form: HTMLElement = <HTMLElement>document.getElementById("form");
        form.addEventListener("change", handleChange);

        let slider: HTMLElement = <HTMLElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
    }

    function handleChange (_event: Event): void {
        displayOrder();
    }

    function displayOrder () {
        
    }
}