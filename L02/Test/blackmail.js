"use strict";
var L02_Blackmailer_Companion;
(function (L02_Blackmailer_Companion) {
    let choosenCharacter = "A";
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let mail = document.querySelector("div#mail");
        mail.addEventListener("click", placeLetter);
        document.addEventListener("keydown", chooseCharacter);
    }
    function placeLetter(_event) {
        //console.log(_event);
        let x = _event.offsetX;
        let y = _event.offsetY;
        let mail = _event.target;
        let letter = document.createElement("span");
        mail.appendChild(letter);
        letter.textContent = choosenCharacter;
        letter.style.left = x + "px";
        letter.style.top = y + "px";
        letter.addEventListener("click", deleteLetter);
    }
    function chooseCharacter(_event) {
        //console.log(_event);
        choosenCharacter = _event.key;
    }
    function deleteLetter(_event) {
        _event.stopPropagation();
        let target = _event.target;
        let parent = target.parentNode;
        parent.removeChild(target);
    }
})(L02_Blackmailer_Companion || (L02_Blackmailer_Companion = {}));
//# sourceMappingURL=blackmail.js.map