"use strict";
var TestSpace;
(function (TestSpace) {
    let number = 1;
    function handleClick(_event) {
        console.log(number);
        number++;
    }
    document.querySelector("#text")?.addEventListener("click", (handleClick));
})(TestSpace || (TestSpace = {}));
//# sourceMappingURL=script.js.map