namespace L02_Blackmailer_Companion {
let choosenCharacter: string = "A";

window.addEventListener("load", handleLoad);

function handleLoad(_event: Event): void {
    let mail: HTMLElement = <HTMLElement>document.querySelector("div#mail");
    mail.addEventListener("click", placeLetter);
    document.addEventListener("keydown", chooseCharacter);
}

function placeLetter(_event: MouseEvent): void {
    //console.log(_event);
    let x: number = _event.offsetX;
    let y: number = _event.offsetY;

    let mail: HTMLElement = <HTMLElement>_event.target;
    let letter: HTMLSpanElement = document.createElement("span");

    mail.appendChild(letter);

    letter.textContent = choosenCharacter;
    letter.style.left = x + "px";
    letter.style.top = y + "px";

    letter.addEventListener("click", deleteLetter);
}

function chooseCharacter(_event: KeyboardEvent): void {
    //console.log(_event);
    choosenCharacter = _event.key;
}

function deleteLetter(_event: MouseEvent): void {
    _event.stopPropagation();
    let target: Node = <Node>_event.target;
    let parent: Node = <Node>target.parentNode;
    parent.removeChild(target); 


}


}