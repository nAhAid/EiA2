"use strict";
var L08_generativeArt;
(function (L08_generativeArt) {
    let canvas = document.querySelector("canvas");
    let cc2 = canvas.getContext("2d");
    let colors = [
        "red", "blue", "green", "magenta", "aquamarine", "brown", "white", "orange", "yellow", "pink", "violet", "turquoise", "gold", "silver"
    ];
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        cc2.fillStyle = "#000000";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        generateRandomArt();
    }
    function generateRandomArt() {
        generatePattern(1);
        for (let index = 0; index < 5 + randomNumber(100); index++) {
            generateCircle(index);
            generateLines(index);
            generateTriangles(index);
            generateRectangles(index);
            generateBezier(index);
        }
    }
    function generateBezier(_index) {
        let x = randomNumber(100);
        let y = randomNumber(100);
        let xTranslate = randomNumber(100) + randomNumber(50) + x;
        let yTranslate = randomNumber(100) - randomNumber(50) - y;
        cc2.translate(xTranslate, yTranslate);
        cc2.rotate(randomNumber(2) * Math.PI);
        let grd = cc2.createRadialGradient(75, x, 5, 90, y, 5);
        grd.addColorStop(0, colors[randomNumber(colors.length)]);
        grd.addColorStop(0.5, colors[randomNumber(colors.length)]);
        grd.addColorStop(1, colors[randomNumber(colors.length)]);
        cc2.beginPath();
        cc2.moveTo(x + 200, y);
        cc2.bezierCurveTo(x + y + x, x - y, x, y * x, y, x * (x + y));
        cc2.strokeStyle = colors[randomNumber(colors.length)];
        cc2.lineWidth = randomNumber(5);
        cc2.closePath();
        cc2.stroke();
        cc2.resetTransform();
    }
    function generatePattern(_index) {
        let pattern = document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;
        pattern.fillStyle = "#000";
        pattern.strokeStyle = randomColor();
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineJoin = "bevel";
        pattern.lineTo(10, randomNumber(10));
        pattern.lineTo(randomNumber(20), 0);
        pattern.lineTo(randomNumber(30), 0);
        pattern.lineTo(40, randomNumber(10));
        pattern.lineTo(randomNumber(30), 20);
        pattern.lineTo(20, randomNumber(10));
        pattern.lineTo(randomNumber(10), 10);
        pattern.stroke();
        cc2.fillStyle = cc2.createPattern(pattern.canvas, "repeat");
        cc2.fillRect(0, 0, canvas.width, canvas.height);
    }
    function generateRectangles(_index) {
        let grd = cc2.createRadialGradient(75, 50, 5, 90, 60, 5);
        grd.addColorStop(0, colors[randomNumber(colors.length)]);
        grd.addColorStop(0.5, colors[randomNumber(colors.length)]);
        grd.addColorStop(1, colors[randomNumber(colors.length)]);
        cc2.translate(randomNumber(333), randomNumber(666));
        cc2.scale(randomNumber(30), randomNumber(20));
        cc2.strokeStyle = grd;
        cc2.strokeRect(0, 0, randomNumber(10), randomNumber(11));
        cc2.resetTransform();
    }
    function generateTriangles(_index) {
        let x = randomNumber(_index);
        let y = randomNumber(_index * x);
        cc2.translate(randomNumber(111) * 10, randomNumber(randomNumber(222)) * 5);
        let grd = cc2.createRadialGradient(10, 50, 5, 90, 60, 100);
        grd.addColorStop(0, colors[randomNumber(colors.length)]);
        grd.addColorStop(0.5, colors[randomNumber(colors.length)]);
        grd.addColorStop(1, colors[randomNumber(colors.length)]);
        cc2.beginPath();
        cc2.moveTo(x, y);
        cc2.lineJoin = "bevel";
        cc2.lineTo(x, 20);
        cc2.lineTo(30, y);
        cc2.fillStyle = grd;
        cc2.closePath();
        cc2.fill();
        cc2.stroke();
        cc2.resetTransform();
    }
    function generateLines(_position) {
        let lines = new Path2D();
        let startX = randomNumber(10);
        let startY = randomNumber(10);
        let endX = randomNumber(90);
        let endY = randomNumber(90);
        lines.moveTo(startX, startY);
        cc2.lineCap = "round";
        cc2.lineJoin = "round";
        lines.lineTo(randomNumber(30), randomNumber(30));
        lines.lineTo(endX, endY);
        cc2.translate(randomNumber(333), randomNumber(666));
        cc2.scale(randomNumber(30), randomNumber(20));
        let gradient = cc2.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, colors[randomNumber(colors.length)]);
        gradient.addColorStop(0.5, colors[randomNumber(colors.length)]);
        gradient.addColorStop(1, colors[randomNumber(colors.length)]);
        cc2.strokeStyle = gradient;
        cc2.stroke(lines);
        cc2.resetTransform();
        cc2.strokeStyle = "white";
        cc2.lineCap = "butt";
        cc2.lineJoin = "miter";
    }
    function generateCircle(_position) {
        let randomPosition = randomNumber(_position);
        let x = randomNumber(100 * randomPosition * randomNumber(_position));
        let r = randomNumber(100);
        cc2.translate(randomNumber(10) * randomPosition, randomNumber(20));
        cc2.beginPath();
        cc2.arc(x + _position * randomNumber(_position), 100, r, 0, 2 * Math.PI);
        cc2.strokeStyle = randomColor();
        cc2.lineWidth = randomNumber(10);
        cc2.closePath();
        cc2.stroke();
        cc2.resetTransform();
        cc2.lineWidth = 1;
    }
    function randomColor() {
        let R = (Math.floor(Math.random() * 255));
        let G = (Math.floor(Math.random() * 255));
        let B = (Math.floor(Math.random() * 255));
        let randColor = "rgb(" + R + ", " + G + "," + B + ")";
        return randColor;
    }
    function randomNumber(_multiplicator) {
        return Math.floor(Math.random() * _multiplicator);
    }
})(L08_generativeArt || (L08_generativeArt = {}));
//# sourceMappingURL=canvas.js.map