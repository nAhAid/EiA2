"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    L11_Birdhouse.aviaryPos = new L11_Birdhouse.Vector(0, 0);
    L11_Birdhouse.canvas = document.querySelector("canvas");
    L11_Birdhouse.cc2 = L11_Birdhouse.canvas.getContext("2d");
    function drawStatic() {
        let sunPosition = new L11_Birdhouse.Vector(75, 100);
        let positionMountain = new L11_Birdhouse.Vector(0, L11_Birdhouse.horizon);
        let cloudPos = new L11_Birdhouse.Vector(550, 150);
        let cloudSize = new L11_Birdhouse.Vector(325, 125);
        let treeMaxScale = new L11_Birdhouse.Vector(0.5, 0.5);
        let snowmanPos = new L11_Birdhouse.Vector(L11_Birdhouse.randomBetween(10, 325), 425);
        L11_Birdhouse.aviaryPos = new L11_Birdhouse.Vector(L11_Birdhouse.randomBetween(335, 700), 450);
        drawBackground();
        drawSun(sunPosition);
        drawMountains(positionMountain, 50, 135, "#6B7A7D", "#E6FEFE");
        drawMountains(positionMountain, 35, 85, "#7c8d8a", "#c5d8d5");
        drawCloud(cloudPos, cloudSize, 40, 60);
        drawTrees(5, positionMountain, treeMaxScale);
        drawSnowman(snowmanPos);
        drawAviary(L11_Birdhouse.aviaryPos, 1);
    }
    L11_Birdhouse.drawStatic = drawStatic;
    function drawBackground() {
        let gradient = L11_Birdhouse.cc2.createLinearGradient(0, 0, 0, L11_Birdhouse.cc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(L11_Birdhouse.golden, "white");
        gradient.addColorStop(1, "HSLA(122, 11%, 79%, 1)");
        L11_Birdhouse.cc2.fillStyle = gradient;
        L11_Birdhouse.cc2.fillRect(0, 0, L11_Birdhouse.cc2.canvas.width, L11_Birdhouse.cc2.canvas.height);
    }
    function drawSun(_position) {
        console.log("Sun");
        let r1 = 20;
        let r2 = 150;
        let gradient = L11_Birdhouse.cc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 0%, 90%, 0)");
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        L11_Birdhouse.cc2.fillStyle = gradient;
        L11_Birdhouse.cc2.arc(0, 0, r2, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fill();
        L11_Birdhouse.cc2.restore();
    }
    function drawCloud(_position, _size, _nParticles, _radiusParticle) {
        let radiusParticle = 40;
        let particle = new Path2D();
        let gradient = L11_Birdhouse.cc2.createRadialGradient(0, 0, 0, 0, 0, _radiusParticle);
        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        L11_Birdhouse.cc2.fillStyle = gradient;
        for (let drawn = 0; drawn < _nParticles; drawn++) {
            let x = (Math.random() - 0.5) * _size.x;
            let y = -(Math.random() * _size.y);
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.translate(x, y);
            L11_Birdhouse.cc2.fill(particle);
            L11_Birdhouse.cc2.restore();
        }
        L11_Birdhouse.cc2.restore();
    }
    function drawMountains(_position, _min, _max, _colorLow, _colorHigh) {
        let stepMin = 50;
        let stepMax = 150;
        let x = 0;
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(0, 0);
        L11_Birdhouse.cc2.lineTo(0, -_max);
        do {
            x += stepMin + L11_Birdhouse.randomBetween(stepMin, stepMax);
            let y = -_min - L11_Birdhouse.randomBetween(_min, _max);
            L11_Birdhouse.cc2.lineTo(x, y);
        } while (x < L11_Birdhouse.cc2.canvas.width);
        L11_Birdhouse.cc2.lineTo(x, 0);
        L11_Birdhouse.cc2.closePath();
        let gradient = L11_Birdhouse.cc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(1, "#FFFFFF");
        L11_Birdhouse.cc2.fillStyle = gradient;
        L11_Birdhouse.cc2.fill();
        L11_Birdhouse.cc2.restore();
    }
    function drawTrees(_nTrees, _position, _maxScale) {
        let transform = L11_Birdhouse.cc2.getTransform();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nTrees; drawn++) {
            let x = L11_Birdhouse.randomBetween(0, 750);
            let y = L11_Birdhouse.randomBetween(10, 30);
            let scale = new L11_Birdhouse.Vector(y / 50, y / 50);
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.scale(scale.x, scale.y);
            L11_Birdhouse.cc2.translate(x, y);
            drawTree(L11_Birdhouse.randomBetween(0.2, 0.8));
            L11_Birdhouse.cc2.restore();
        }
        L11_Birdhouse.cc2.setTransform(transform);
    }
    function drawTree(_snowPart) {
        let nBranches = 50;
        let maxRadius = 60;
        let whiteBranches = nBranches * _snowPart;
        let greenBranches = nBranches - whiteBranches;
        let branch = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = "brown";
        L11_Birdhouse.cc2.fillRect(0, 0, 20, -200);
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(0, -120);
        for (let drawn = 0; drawn < greenBranches; drawn++) {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.translate(0, -y);
            L11_Birdhouse.cc2.scale(size, size);
            L11_Birdhouse.cc2.translate(x, 0);
            let colorAngle = L11_Birdhouse.randomBetween(10, 50);
            let color = "HSLA(122, 50%," + colorAngle + "%, 0.5)";
            L11_Birdhouse.cc2.fillStyle = color;
            L11_Birdhouse.cc2.fill(branch);
            L11_Birdhouse.cc2.restore();
        }
        for (let drawn = 0; drawn < whiteBranches; drawn++) {
            let y = Math.random() * 350;
            let size = 1 - y / 700;
            let x = (Math.random() - 0.5) * 2 * maxRadius;
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.translate(0, -y);
            L11_Birdhouse.cc2.scale(size, size);
            L11_Birdhouse.cc2.translate(x, 0);
            let color = "HSLA(132, 50%, 100%, 0.7)";
            L11_Birdhouse.cc2.fillStyle = color;
            L11_Birdhouse.cc2.fill(branch);
            L11_Birdhouse.cc2.restore();
        }
        L11_Birdhouse.cc2.restore();
    }
    function drawSnowman(_position) {
        let r1 = 60;
        let r2 = r1 * 0.8;
        let r3 = r2 * 0.8;
        let x1 = new L11_Birdhouse.Vector(0, r1);
        let x2 = new L11_Birdhouse.Vector(0, r1 * 0.75);
        let x3 = new L11_Birdhouse.Vector(0, r2);
        let color = "#FFF";
        let transform = L11_Birdhouse.cc2.getTransform();
        let circle1 = new Path2D();
        let circle2 = new Path2D();
        let circle3 = new Path2D();
        let eye = new Path2D();
        let pupil = new Path2D();
        let cylinder = new Path2D();
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        L11_Birdhouse.cc2.translate(x1.x, -x1.y);
        circle1.arc(0, 0, r1, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = color;
        L11_Birdhouse.cc2.fill(circle1);
        L11_Birdhouse.cc2.translate(x2.x, -x2.y);
        circle2.arc(0, 0, r2, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = color;
        L11_Birdhouse.cc2.fill(circle2);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = "#000";
        L11_Birdhouse.cc2.fill(pupil);
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(x2.x, x2.y);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = "#000";
        L11_Birdhouse.cc2.fill(pupil);
        L11_Birdhouse.cc2.restore();
        L11_Birdhouse.cc2.translate(x3.x, -x3.y);
        let head = L11_Birdhouse.cc2.getTransform();
        circle3.arc(0, 0, r3, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = color;
        L11_Birdhouse.cc2.fill(circle3);
        //draw Eye
        L11_Birdhouse.cc2.save();
        L11_Birdhouse.cc2.translate(r3 / 2, -r3 / 4);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.strokeStyle = "#000";
        L11_Birdhouse.cc2.stroke(eye);
        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = "#000";
        L11_Birdhouse.cc2.fill(pupil);
        //draw Eye
        L11_Birdhouse.cc2.translate(-r3, 0);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.strokeStyle = "#000";
        L11_Birdhouse.cc2.stroke(eye);
        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        L11_Birdhouse.cc2.fillStyle = "#000";
        L11_Birdhouse.cc2.fill(pupil);
        L11_Birdhouse.cc2.restore();
        //draw Mouth
        L11_Birdhouse.cc2.setTransform(head);
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(-r3 / 2, r3 / 10);
        L11_Birdhouse.cc2.bezierCurveTo(-r3 / 2, r3 * L11_Birdhouse.golden, r3 / 2, r3 * L11_Birdhouse.golden, r3 / 2, r3 / 10);
        L11_Birdhouse.cc2.moveTo(-r3, 0);
        L11_Birdhouse.cc2.strokeStyle = "#FF0000";
        L11_Birdhouse.cc2.lineWidth = 2;
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        //draw Cylinder
        L11_Birdhouse.cc2.setTransform(head);
        L11_Birdhouse.cc2.translate(0, -(r3 * 0.8));
        let cWidth = r3 * 1.2;
        let cHeight = r3 * 1.1;
        cylinder.moveTo(-(cWidth / 2), 0);
        cylinder.lineTo(-(cWidth / 2), -cHeight);
        cylinder.lineTo(cWidth / 2, -cHeight);
        cylinder.lineTo(cWidth / 2, 0);
        L11_Birdhouse.cc2.fillStyle = "#000";
        L11_Birdhouse.cc2.fill(cylinder);
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(-r3, 0);
        L11_Birdhouse.cc2.lineTo(r3, 0);
        L11_Birdhouse.cc2.lineWidth = 10;
        L11_Birdhouse.cc2.strokeStyle = "#000";
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        L11_Birdhouse.cc2.strokeStyle = "#FFF";
        L11_Birdhouse.cc2.setTransform(transform);
    }
    function drawAviary(_position, _nBirds) {
        console.log("Aviary");
        let transform = L11_Birdhouse.cc2.getTransform();
        L11_Birdhouse.cc2.translate(_position.x, _position.y);
        let colorFill = "#883607";
        let colorStroke = "#532a13";
        let t1 = new L11_Birdhouse.Vector(-45, 30);
        let t2 = new L11_Birdhouse.Vector(0, -30);
        let t3 = new L11_Birdhouse.Vector(45, 30);
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(0, 0);
        L11_Birdhouse.cc2.lineTo(0, -120);
        L11_Birdhouse.cc2.strokeStyle = colorFill;
        L11_Birdhouse.cc2.lineWidth = 8;
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        L11_Birdhouse.cc2.translate(0, -150);
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(t1.x, t1.y);
        L11_Birdhouse.cc2.lineTo(t1.x / 2, 0);
        L11_Birdhouse.cc2.lineTo(t3.x / 2, 0);
        L11_Birdhouse.cc2.lineTo(t3.x, t3.y);
        L11_Birdhouse.cc2.fillStyle = colorFill;
        L11_Birdhouse.cc2.strokeStyle = colorStroke;
        L11_Birdhouse.cc2.lineWidth = 8;
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        L11_Birdhouse.cc2.fill();
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(t1.x / 2, 0);
        L11_Birdhouse.cc2.lineTo(t2.x, t2.y);
        L11_Birdhouse.cc2.lineTo(t3.x / 2, 0);
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        L11_Birdhouse.cc2.beginPath();
        L11_Birdhouse.cc2.moveTo(t3.x / 2, 0);
        L11_Birdhouse.cc2.lineTo(t3.x / 2 + 25, 0);
        L11_Birdhouse.cc2.lineWidth = 5;
        L11_Birdhouse.cc2.closePath();
        L11_Birdhouse.cc2.stroke();
        //let birdPosition: Vector = new Vector((t3.x / 2 + 25) * 0.75, 0);
        //drawSittingBird(birdPosition);
        L11_Birdhouse.cc2.setTransform(transform);
    }
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=background.js.map