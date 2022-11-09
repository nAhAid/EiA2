"use strict";
var L05_CocktailBar;
(function (L05_CocktailBar) {
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
        let display = (await (response.text())).toString();
        console.log(display);
    }
    L05_CocktailBar.communicate = communicate;
})(L05_CocktailBar || (L05_CocktailBar = {}));
//# sourceMappingURL=communicate.js.map