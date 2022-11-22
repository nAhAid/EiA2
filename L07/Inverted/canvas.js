"use strict";
var L07_Inverted;
(function (L07_Inverted) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        let crc2 = canvas.getContext("2d");
        crc2.fillStyle = "#00FFA0";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        // right Eye
        crc2.beginPath();
        crc2.arc(100, 50, 20, 0, 1.5 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        //rigth Eye
        crc2.beginPath();
        crc2.arc(100, 55, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "#000";
        crc2.closePath();
        crc2.fill();
        //right Eye
        crc2.beginPath();
        crc2.arc(200, 50, 20, 1.5 * Math.PI, -1 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        //right Eye
        crc2.beginPath();
        crc2.arc(200, 55, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "#000";
        crc2.closePath();
        crc2.fill();
        //Mouth
        crc2.beginPath();
        crc2.arc(150, 110, 22, 0, 2 * Math.PI);
        crc2.closePath();
        crc2.stroke();
        //Nose
        crc2.beginPath();
        crc2.moveTo(140, 70);
        crc2.lineTo(150, 60);
        crc2.lineTo(160, 70);
        crc2.closePath();
        crc2.stroke();
    }
})(L07_Inverted || (L07_Inverted = {}));
//# sourceMappingURL=canvas.js.map