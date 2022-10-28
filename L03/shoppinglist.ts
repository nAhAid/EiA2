/*
Aufgabe: <L03_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <27.10.2022>
Quellen: <Ich, StackOverflow>
*/

namespace L03_shoppingList {
    window.addEventListener("load", handleLoad);

    let formData: FormData = new FormData(document.forms[0]);

    function handleLoad () {
        let input: HTMLDivElement = <HTMLDivElement>document.getElementById("input");
        input.addEventListener("change", handleInputChange);

        let display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
        display.addEventListener("change", handleListChange);
    }

    function handleInputChange (_event: Event) {
        
        for (let entry of formData) {
            //console.log(entry);
            let item: HTMLInputElement = <HTMLInputElement>document.querySelector("[name='" + entry[0] + "']");
            console.log(item.value);
        }
    }

    function handleListChange (_event: Event) {
        let checked: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log(checked.checked);
    }

    function writeList (): void {
        
    }
}