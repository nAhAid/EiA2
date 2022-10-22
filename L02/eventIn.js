"use strict";
var L02_EventInspector;
(function (L02_EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        let body = document.querySelector("body");
        let div = document.querySelector("div");
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div.addEventListener("click", logInfo);
        div.addEventListener("keyup", logInfo);
    }
    function setInfoBox(_event) {
        //console.log(_event);
        let x = _event.clientX;
        let y = _event.clientY;
        let target = _event.target;
        let span = document.getElementById("cursor");
        span.innerHTML = target + "<br>" + x + "<br>" + y;
        span.style.top = y + 30 + "px";
        span.style.left = x + 20 + "px";
    }
    function logInfo(_event) {
        console.log("Events-Type: " + _event.type);
        console.log("Events-Target: " + _event.target);
        console.log("Events-currentTarget: " + _event.currentTarget);
        console.log("Whole Event Object: " + _event);
    }
})(L02_EventInspector || (L02_EventInspector = {}));
//# sourceMappingURL=eventIn.js.map