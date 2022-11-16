"use strict";
var L06_CocktailBar;
(function (L06_CocktailBar) {
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
        let display = (await (response.text())).toString();
        console.log(display);
    }
    L06_CocktailBar.communicate = communicate;
})(L06_CocktailBar || (L06_CocktailBar = {}));
//# sourceMappingURL=communicate.js.map