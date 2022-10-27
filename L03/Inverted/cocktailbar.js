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
    function displayOrder() {
    }
})(CocktailBar || (CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map