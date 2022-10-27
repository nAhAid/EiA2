"use strict";
var L03_CocktailBar;
(function (L03_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let form = document.getElementById("form");
        form.addEventListener("change", handleChange);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
    }
    function handleChange(_event) {
        displayOrder();
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
    function displayOrder() {
        let inputs = document.querySelectorAll("input");
        console.log(inputs);
        console.log(inputs[1]);
    }
})(L03_CocktailBar || (L03_CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map