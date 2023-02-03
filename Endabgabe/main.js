"use strict";
var Firework;
(function (Firework) {
    window.addEventListener("load", handleLoad);
    let canvas = document.querySelector("canvas");
    let cc2 = canvas.getContext("2d");
    let background;
    function handleLoad() {
        console.log("start");
        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
    }
    function drawBackground() {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
})(Firework || (Firework = {}));
//# sourceMappingURL=main.js.map