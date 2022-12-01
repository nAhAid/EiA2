"use strict";
var L08_2_aivary;
(function (L08_2_aivary) {
    let cc2;
    let golden = 0.62;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        cc2 = canvas.getContext("2d");
        let horizon = cc2.canvas.height * golden;
        drawBackground();
        drawSun({ x: 75, y: 100 });
        drawMountains({ x: 0, y: horizon }, 50, 135, "#6B7A7D", "#E6FEFE");
        drawMountains({ x: 0, y: horizon }, 35, 85, "#7c8d8a", "#c5d8d5");
        drawCloud({ x: 550, y: 150 }, { x: 325, y: 125 }, 40, 60);
        drawTrees(5, { x: 0, y: horizon }, { x: 0.5, y: 0.5 });
        drawSnowman({ x: randomBetween(10, 740), y: 425 });
        drawSnowflakes(50, { x: 400, y: 175 });
    }
    function drawBackground() {
        let gradient = cc2.createLinearGradient(0, 0, 0, cc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSLA(122, 11%, 79%, 1)");
        cc2.fillStyle = gradient;
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun");
        let r1 = 20;
        let r2 = 150;
        let gradient = cc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 0%, 90%, 0)");
        cc2.save();
        cc2.translate(_position.x, _position.y);
        cc2.fillStyle = gradient;
        cc2.arc(0, 0, r2, 0, 2 * Math.PI);
        cc2.fill();
        cc2.restore();
    }
    function drawCloud(_position, _size, _nParticles, _radiusParticle) {
        let radiusParticle = 40;
        let particle = new Path2D();
        let gradient = cc2.createRadialGradient(0, 0, 0, 0, 0, _radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        cc2.save();
        cc2.translate(_position.x, _position.y);
        cc2.fillStyle = gradient;
        for (let drawn = 0; drawn < _nParticles; drawn++) {
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            cc2.save();
            cc2.translate(x, y);
            cc2.fill(particle);
            cc2.restore();
        }
        cc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        cc2.save();
        cc2.translate(_position.x, _position.y);
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(0, -_max);
        do {
            x += stepMin + randomBetween(stepMin, stepMax);
            let y = -_min - randomBetween(_min, _max);
            cc2.lineTo(x, y);
        } while (x < cc2.canvas.width);
        cc2.lineTo(x, 0);
        cc2.closePath();
        let gradient = cc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(1, "#FFFFFF");
        cc2.fillStyle = gradient;
        cc2.fill();
        cc2.restore();
    }
    function randomBetween(_min, _max) {
        let returnNumber = Math.random() * (_max - _min);
        return returnNumber;
    }
    function drawTrees(_nTrees, _position, _maxScale) {
        let transform = cc2.getTransform();
        cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nTrees; drawn++) {
            let x = randomBetween(20, 750) + drawn * drawn;
            let y = randomBetween(1, 130);
            let scale = { x: _maxScale.x * (y / 115), y: _maxScale.y * (y / 115) };
            cc2.save();
            cc2.scale(scale.x, scale.y);
            cc2.translate(x, y);
            drawTree(0.2);
            cc2.restore();
        }
        cc2.setTransform(transform);
    }
    function drawTree(_snowPart) {
        let nBranches = 50;
        let maxRadius = 60;
        let whiteBranches = nBranches * _snowPart;
        let greenBranches = nBranches - whiteBranches;
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        cc2.fillStyle = "brown";
        cc2.fillRect(0, 0, 20, -200);
        cc2.save();
        cc2.translate(0, -120);
        for (let drawn = 0; drawn < greenBranches; drawn++) {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            cc2.save();
            cc2.translate(0, -y);
            cc2.scale(size, size);
            cc2.translate(x, 0);
            let colorAngle = randomBetween(35, 70);
            let color = "HSLA(122, 50%," + colorAngle + "%, 0.5)";
            cc2.fillStyle = color;
            cc2.fill(branch);
            cc2.restore();
        }
        for (let drawn = 0; drawn < whiteBranches; drawn++) {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            cc2.save();
            cc2.translate(0, -y);
            cc2.scale(size, size);
            cc2.translate(x, 0);
            let color = "HSLA(132, 50%, 100%, 0.7)";
            cc2.fillStyle = color;
            cc2.fill(branch);
            cc2.restore();
        }
        cc2.restore();
    }
    function drawSnowflakes(_nFlakes, _position) {
        let transform = cc2.getTransform();
        cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nFlakes; drawn++) {
            cc2.save();
            let xPosition = randomBetween(0, 325);
            let yPosition = randomBetween(0, 250);
            drawCloud({ x: xPosition, y: yPosition }, { x: 10, y: 10 }, 1, 10);
            cc2.restore();
        }
        cc2.setTransform(transform);
    }
    function drawSnowman(_position) {
        let r1 = 60;
        let r2 = r1 * 0.8;
        let r3 = r2 * 0.8;
        let r = [
            70, 50, 30
        ];
        let x1 = { x: 0, y: r1 };
        let x2 = { x: 0, y: r1 * 0.75 };
        let x3 = { x: 0, y: r2 };
        let x = [
            { x: 0, y: 70 },
            { x: 0, y: 60 },
            { x: 0, y: 40 }
        ];
        let color = "#FFF";
        let transform = cc2.getTransform();
        let circle1 = new Path2D();
        let circle2 = new Path2D();
        let circle3 = new Path2D();
        let eye = new Path2D();
        let pupil = new Path2D();
        cc2.save();
        cc2.translate(_position.x, _position.y);
        /* for (let index: number = 1; index < 4; index++) {
            cc2.translate(x[index - 1].x, -x[index - 1].y);
            branch.arc(0, 0, r[index - 1], 0, 2 * Math.PI);
            cc2.fillStyle = color;
            cc2.fill(branch);
        } */
        cc2.translate(x1.x, -x1.y);
        circle1.arc(0, 0, r1, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle1);
        cc2.translate(x2.x, -x2.y);
        circle2.arc(0, 0, r2, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle2);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        cc2.save();
        cc2.translate(x2.x, x2.y);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        cc2.restore();
        cc2.translate(x3.x, -x3.y);
        let head = cc2.getTransform();
        circle3.arc(0, 0, r3, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle3);
        cc2.save();
        cc2.translate(r3 / 2, -r3 / 4);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        cc2.translate(-r3, 0);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        cc2.restore();
        cc2.setTransform(head);
        cc2.beginPath();
        cc2.moveTo(-r3 / 2, r3 / 10);
        cc2.bezierCurveTo(-r3 / 2, r3 * golden, r3 / 2, r3 * golden, r3 / 2, r3 / 10);
        cc2.moveTo(-r3, 0);
        cc2.strokeStyle = "#FF0000";
        cc2.lineWidth = 2;
        cc2.closePath();
        cc2.stroke();
        cc2.strokeStyle = "#FFF";
        cc2.setTransform(transform);
    }
})(L08_2_aivary || (L08_2_aivary = {}));
//# sourceMappingURL=aviary.js.map