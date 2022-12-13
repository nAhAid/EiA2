"use strict";
/*
Aufgabe: <L08.2_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <02.12.2022>
Quellen: <Ich, W3Schools>
*/
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
        drawSnowman({ x: randomBetween(10, 325), y: 425 });
        drawAviary({ x: randomBetween(335, 700), y: 450 }, 1);
        drawBirds(20);
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
        let returnNumber = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }
    function drawTrees(_nTrees, _position, _maxScale) {
        let transform = cc2.getTransform();
        cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nTrees; drawn++) {
            let x = randomBetween(0, 750);
            let y = randomBetween(10, 30);
            let scale = { x: (y / 50), y: (y / 50) };
            cc2.save();
            cc2.scale(scale.x, scale.y);
            cc2.translate(x, y);
            drawTree(randomBetween(0.2, 0.8));
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
            let colorAngle = randomBetween(10, 50);
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
        let x1 = { x: 0, y: r1 };
        let x2 = { x: 0, y: r1 * 0.75 };
        let x3 = { x: 0, y: r2 };
        let color = "#FFF";
        let transform = cc2.getTransform();
        let circle1 = new Path2D();
        let circle2 = new Path2D();
        let circle3 = new Path2D();
        let eye = new Path2D();
        let pupil = new Path2D();
        let cylinder = new Path2D();
        cc2.save();
        cc2.translate(_position.x, _position.y);
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
        //draw Eye
        cc2.save();
        cc2.translate(r3 / 2, -r3 / 4);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);
        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        //draw Eye
        cc2.translate(-r3, 0);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);
        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);
        cc2.restore();
        //draw Mouth
        cc2.setTransform(head);
        cc2.beginPath();
        cc2.moveTo(-r3 / 2, r3 / 10);
        cc2.bezierCurveTo(-r3 / 2, r3 * golden, r3 / 2, r3 * golden, r3 / 2, r3 / 10);
        cc2.moveTo(-r3, 0);
        cc2.strokeStyle = "#FF0000";
        cc2.lineWidth = 2;
        cc2.closePath();
        cc2.stroke();
        //draw Cylinder
        cc2.setTransform(head);
        cc2.translate(0, -(r3 * 0.8));
        let cWidth = r3 * 1.2;
        let cHeight = r3 * 1.1;
        cylinder.moveTo(-(cWidth / 2), 0);
        cylinder.lineTo(-(cWidth / 2), -cHeight);
        cylinder.lineTo(cWidth / 2, -cHeight);
        cylinder.lineTo(cWidth / 2, 0);
        cc2.fillStyle = "#000";
        cc2.fill(cylinder);
        cc2.beginPath();
        cc2.moveTo(-r3, 0);
        cc2.lineTo(r3, 0);
        cc2.lineWidth = 10;
        cc2.strokeStyle = "#000";
        cc2.closePath();
        cc2.stroke();
        cc2.strokeStyle = "#FFF";
        cc2.setTransform(transform);
    }
    function drawAviary(_position, _nBirds) {
        console.log("Aviary");
        let transform = cc2.getTransform();
        cc2.translate(_position.x, _position.y);
        let colorFill = "#883607";
        let colorStroke = "#532a13";
        let t1 = { x: -45, y: 30 };
        let t2 = { x: 0, y: -30 };
        let t3 = { x: 45, y: 30 };
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(0, -120);
        cc2.strokeStyle = colorFill;
        cc2.lineWidth = 8;
        cc2.closePath();
        cc2.stroke();
        cc2.translate(0, -150);
        cc2.beginPath();
        cc2.moveTo(t1.x, t1.y);
        cc2.lineTo(t1.x / 2, 0);
        cc2.lineTo(t3.x / 2, 0);
        cc2.lineTo(t3.x, t3.y);
        cc2.fillStyle = colorFill;
        cc2.strokeStyle = colorStroke;
        cc2.lineWidth = 8;
        cc2.closePath();
        cc2.stroke();
        cc2.fill();
        cc2.beginPath();
        cc2.moveTo(t1.x / 2, 0);
        cc2.lineTo(t2.x, t2.y);
        cc2.lineTo(t3.x / 2, 0);
        cc2.closePath();
        cc2.stroke();
        cc2.beginPath();
        cc2.moveTo(t3.x / 2, 0);
        cc2.lineTo(t3.x / 2 + 25, 0);
        cc2.lineWidth = 5;
        cc2.closePath();
        cc2.stroke();
        let birdPosition = { x: (t3.x / 2 + 25) * 0.75, y: 0 };
        drawSittingBird(birdPosition);
        cc2.setTransform(transform);
    }
    function drawSittingBird(_position) {
        console.log("Sitting Bird");
        let color = [
            {
                bColor: "#9e5124",
                hColor: "#9e4624",
                eyeColor: "#000"
            },
            {
                bColor: "#000",
                hColor: "#000",
                eyeColor: "#FFF"
            },
            {
                bColor: "#7e2c15",
                hColor: "#c5452b",
                eyeColor: "#FFF"
            },
            {
                bColor: "#7e2c15",
                hColor: "#c5452b",
                eyeColor: "#000"
            },
            {
                bColor: "#4cf000",
                hColor: "#277a00",
                eyeColor: "#000"
            },
            {
                bColor: "#6179ff",
                hColor: "#0023eb",
                eyeColor: "#000"
            },
            {
                bColor: "#c547ff",
                hColor: "#a400f0",
                eyeColor: "#000"
            },
            {
                bColor: "#9800a3",
                hColor: "#e400f5",
                eyeColor: "#000"
            },
            {
                bColor: "#ff6524",
                hColor: "#ffe733",
                eyeColor: "#000"
            },
            {
                bColor: "#41ff33",
                hColor: "#33ffa7",
                eyeColor: "#000"
            },
            {
                bColor: "#38f",
                hColor: "#33e0ff",
                eyeColor: "#000"
            },
            {
                bColor: "#da33ff",
                hColor: "#ff33f5",
                eyeColor: "#000"
            }
        ];
        let beakColor = ["#f2da21", "#f2a221", "#f26321", "#f41f1f", "#8f1d00", "#a84600", "#ffd11a"];
        let r1 = 15;
        let randomColor = Math.floor(Math.random() * color.length);
        let transform = cc2.getTransform();
        //Draw Feet
        cc2.translate(_position.x, _position.y);
        cc2.beginPath();
        cc2.moveTo(-10, 10);
        cc2.lineTo(-5, 0);
        cc2.lineTo(0, 10);
        cc2.lineTo(5, 0);
        cc2.lineTo(10, 10);
        cc2.moveTo(0, 10);
        cc2.strokeStyle = "#000";
        cc2.lineWidth = 2;
        cc2.closePath();
        cc2.stroke();
        //Draw Legs
        let leg = new Path2D();
        leg.moveTo(0, 0);
        leg.lineTo(0, -20);
        cc2.save();
        cc2.translate(-5, 0);
        cc2.stroke(leg);
        cc2.translate(10, 0);
        cc2.stroke(leg);
        cc2.restore();
        cc2.translate(0, -25);
        let body = cc2.getTransform();
        let bCircle = new Path2D;
        let hCircle = new Path2D;
        let eye = new Path2D;
        //drawBody
        bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].bColor;
        cc2.fill(bCircle);
        //drawHead
        cc2.translate(0, -r1);
        hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].hColor;
        cc2.fill(hCircle);
        //drawEye
        cc2.translate(-r1 / 2, -r1 * 0.1);
        eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].eyeColor;
        cc2.fill(eye);
        //drawEye
        cc2.translate(r1, 0);
        eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].eyeColor;
        cc2.fill(eye);
        //drawBeak
        cc2.setTransform(body);
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(-5, -r1 * 0.8);
        cc2.lineTo(5, -r1 * 0.8);
        cc2.fillStyle = beakColor[Math.floor(Math.random() * beakColor.length)];
        cc2.closePath();
        cc2.fill();
        cc2.setTransform(transform);
    }
    function drawBirds(_nBirds) {
        console.log("draw BIRDS!");
        let ratio = Math.random();
        let nSitting = Math.floor(_nBirds * ratio);
        let nFlying = _nBirds - nSitting;
        for (let drawn = 0; drawn < nSitting; drawn++) {
            cc2.save();
            let maxWidth = 650;
            let minWidth = 100;
            let minHeight = 400;
            let maxHeight = 500;
            let x = randomBetween(minWidth, maxWidth);
            let y = randomBetween(minHeight, maxHeight);
            let scale = { x: (y / maxHeight), y: (y / maxHeight) };
            cc2.translate(x, y);
            cc2.scale(scale.x, scale.y);
            drawSittingBird({ x: 0, y: 0 });
            cc2.restore();
        }
        for (let drawn = 0; drawn < nFlying; drawn++) {
            cc2.save();
            let maxWidth = 740;
            let minWidth = 10;
            let minHeight = 0;
            let maxHeight = 225;
            let x = randomBetween(minWidth, maxWidth);
            let y = randomBetween(minHeight, maxHeight);
            let scale = { x: (y / maxHeight), y: (y / maxHeight) };
            cc2.translate(x, y);
            cc2.scale(scale.x, scale.y);
            drawFlyingBird({ x: 0, y: 0 });
            cc2.restore();
        }
    }
    function drawFlyingBird(_position) {
        console.log("Flying Bird");
        cc2.save();
        cc2.translate(_position.x, _position.y);
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.bezierCurveTo(0, -10, -10, -10, -10, 0);
        cc2.moveTo(0, 0);
        cc2.strokeStyle = "#000";
        cc2.closePath();
        cc2.stroke();
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.bezierCurveTo(0, -10, 10, -10, 10, 0);
        cc2.moveTo(0, 0);
        cc2.strokeStyle = "#000";
        cc2.closePath();
        cc2.stroke();
        cc2.restore();
    }
})(L08_2_aivary || (L08_2_aivary = {}));
//# sourceMappingURL=aviary.js.map