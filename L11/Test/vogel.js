"use strict";
var L11_test;
(function (L11_test) {
    let canvas = document.querySelector("canvas");
    let cc2 = canvas.getContext("2d");
    let r1 = 15;
    let r2 = r1 * 0.8;
    let bCircle = new Path2D;
    let hCircle = new Path2D;
    let eye = new Path2D;
    window.addEventListener("load", draw);
    function draw() {
        cc2.translate(cc2.canvas.width / 2, cc2.canvas.height / 2);
        let body = cc2.getTransform();
        cc2.translate(r1, -r1);
        cc2.save();
        //Draw Beak
        cc2.beginPath();
        cc2.save();
        cc2.translate(r2, 0);
        cc2.moveTo(0, 0);
        cc2.lineTo(r2 / 2, r2 * 0.8);
        cc2.lineTo(-r2, r2 * 0.7);
        cc2.fillStyle = "green";
        cc2.closePath();
        cc2.fill();
        cc2.restore();
        //Draw Body
        cc2.beginPath();
        cc2.setTransform(body);
        cc2.save();
        bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
        cc2.fillStyle = "black";
        cc2.fill(bCircle);
        cc2.closePath();
        //Draw Head
        cc2.beginPath();
        cc2.save();
        cc2.translate(r1, -r1);
        hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
        cc2.fillStyle = "grey";
        cc2.fill(hCircle);
        cc2.closePath();
        // Draw Eye
        cc2.save();
        cc2.translate(r2 / 3, -r2 / 4);
        eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
        cc2.fillStyle = "red";
        cc2.fill(eye);
        //Draw Wing
        cc2.setTransform(body);
        cc2.save();
        cc2.scale(1.7, 1.7);
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.bezierCurveTo(r1 / 4, 0, r1 / 2, -r1 / 2, -r1 * 0.2, -r1 / 2);
        cc2.lineTo(-r1 * 1.5, -r1);
        cc2.bezierCurveTo(-r1, -r1 * 0.8, -r1 * 0.7, 0, 0, 0);
        cc2.fillStyle = "orange";
        cc2.closePath();
        cc2.fill();
    }
})(L11_test || (L11_test = {}));
//# sourceMappingURL=vogel.js.map