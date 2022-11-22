"use strict";
var L08_generativeArt;
(function (L08_generativeArt) {
    let canvas = document.querySelector("canvas");
    let cc2 = canvas.getContext("2d");
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        cc2.fillStyle = "#000000";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        generateRandomArt();
    }
    function generateRandomArt() {
        for (let index = 0; index < 5 * randomNumber(100); index++) {
            generateCircle(index);
            generateLines(index);
        }
    }
    function generateLines(_position) {
        let lines = new Path2D();
        let startX = randomNumber(10);
        let startY = randomNumber(10);
        let endX = randomNumber(90);
        let endY = randomNumber(90);
        lines.moveTo(startX, startY);
        lines.lineTo(randomNumber(30), randomNumber(30));
        lines.lineTo(endX, endY);
        cc2.translate(randomNumber(333), randomNumber(666));
        let gradient = cc2.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1, "green");
        cc2.strokeStyle = gradient;
        cc2.stroke(lines);
        cc2.resetTransform();
        cc2.strokeStyle = "white";
    }
    function generateCircle(_position) {
        let randomPosition = randomNumber(_position);
        let x = randomNumber(100 * randomPosition * randomNumber(_position));
        let r = randomNumber(100);
        cc2.beginPath();
        cc2.arc(x + _position * randomNumber(_position), 100, r, 0, 2 * Math.PI);
        cc2.strokeStyle = randomColor();
        cc2.closePath();
        cc2.stroke();
    }
    function randomColor() {
        let R = (Math.floor(Math.random() * 255));
        let G = (Math.floor(Math.random() * 255));
        let B = (Math.floor(Math.random() * 255));
        let randColor = "rgb(" + R + ", " + G + "," + B + ")";
        return randColor;
    }
    function randomNumber(_multiplicator) {
        let random = Math.floor(Math.random() * _multiplicator);
        return Math.floor(Math.random() * random);
    }
})(L08_generativeArt || (L08_generativeArt = {}));
//# sourceMappingURL=canvas.js.map