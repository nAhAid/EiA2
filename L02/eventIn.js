"use strict";
var L02_EventInspector;
(function (L02_EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        let body = document.querySelector("body");
        let div = document.querySelector("div");
        body.addEventListener("click", logInfo);
        div.addEventListener("click", logInfo);
    }
    function setInfoBox(_event) {
        //console.log(_event);
    }
    function logInfo(_event) {
        console.log(_event);
    }
})(L02_EventInspector || (L02_EventInspector = {}));
//# sourceMappingURL=eventIn.js.map