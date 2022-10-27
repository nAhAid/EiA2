"use strict";
var CocktailBar;
(function (CocktailBar) {
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
    }
})(CocktailBar || (CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map