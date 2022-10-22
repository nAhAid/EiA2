"use strict";
var TestSpace;
(function (TestSpace) {
    let number = 1;
    function handleClick(_event) {
        console.log(number);
        number++;
    }
    document.querySelector("#text")?.addEventListener("click", handleClick);
})(TestSpace || (TestSpace = {}));
var L02_Load;
(function (L02_Load) {
    document.addEventListener("DOMContentLoaded", handleLoad);
    function handleLoad(_event) {
        console.log(_event);
    }
})(L02_Load || (L02_Load = {}));
//# sourceMappingURL=script.js.map