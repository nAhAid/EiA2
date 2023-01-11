"use strict";
/*
Aufgabe: <L09.2_Birdhouse>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <15.12.2022>
Quellen: <W3Schools>
*/
var L10_Birdhouse;
(function (L10_Birdhouse) {
    window.addEventListener("load", handleLoad);
    L10_Birdhouse.golden = 0.62;
    let posSnowflakes = new L10_Birdhouse.Vector(400, 175);
    let snowflakes = [];
    let flyingBirds = [];
    let sittingBirds = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        L10_Birdhouse.cc2 = canvas.getContext("2d");
        L10_Birdhouse.drawStatic();
        L10_Birdhouse.imgData = L10_Birdhouse.cc2.getImageData(0, 0, L10_Birdhouse.cc2.canvas.width, L10_Birdhouse.cc2.canvas.height);
        drawSnowflakes(50, posSnowflakes);
        drawBirds(20);
        window.setInterval(update, 20);
        window.setInterval(updateBird, 500);
    }
    function drawBirds(_nBirds) {
        let ratio = Math.random();
        let nSitting = Math.floor(_nBirds * ratio);
        let nFlying = _nBirds - nSitting;
        for (let drawn = 0; drawn < nSitting; drawn++) {
            L10_Birdhouse.cc2.save();
            let randomColor = Math.floor(Math.random() * L10_Birdhouse.color.length);
            let randomBeakColor = Math.floor(Math.random() * L10_Birdhouse.beakColor.length);
            let maxWidth = 650;
            let minWidth = 100;
            let minHeight = 400;
            let maxHeight = 500;
            let x = randomBetween(minWidth, maxWidth);
            let y = randomBetween(minHeight, maxHeight);
            let birdPos = new L10_Birdhouse.Vector(x, y);
            let sittingBird = new L10_Birdhouse.SitBird(birdPos, L10_Birdhouse.color[randomColor], L10_Birdhouse.beakColor[randomBeakColor]);
            sittingBirds.push(sittingBird);
            sittingBird.draw();
            L10_Birdhouse.cc2.restore();
        }
        for (let drawn = 0; drawn < nFlying; drawn++) {
            L10_Birdhouse.cc2.save();
            let maxWidth = 740;
            let minWidth = 10;
            let minHeight = 0;
            let maxHeight = 225;
            let x = randomBetween(minWidth, maxWidth);
            let y = randomBetween(minHeight, maxHeight);
            let birdPos = new L10_Birdhouse.Vector(x, y);
            let flyingBird = new L10_Birdhouse.BirdOnFly(birdPos);
            flyingBirds.push(flyingBird);
            flyingBird.draw();
            L10_Birdhouse.cc2.restore();
        }
    }
    function update() {
        console.log("Update");
        L10_Birdhouse.cc2.putImageData(L10_Birdhouse.imgData, 0, 0);
        updateSnowflakes(posSnowflakes);
        updateBirdsOnFly();
        updateSittingBird(false);
    }
    function updateBird() {
        updateSittingBird(true);
    }
    function updateSittingBird(_update) {
        if (_update == false) {
            for (let bird of sittingBirds) {
                bird.draw();
            }
        }
        if (_update == true) {
            for (let bird of sittingBirds) {
                bird.eat(1 / 100);
                bird.draw();
            }
        }
    }
    function updateBirdsOnFly() {
        for (let bird of flyingBirds) {
            L10_Birdhouse.cc2.save();
            bird.fly(1 / 50);
            bird.draw();
            L10_Birdhouse.cc2.restore();
        }
    }
    function updateSnowflakes(_position) {
        let transform = L10_Birdhouse.cc2.getTransform();
        L10_Birdhouse.cc2.translate(_position.x, _position.y);
        for (let snow of snowflakes) {
            snow.letItSnow(1 / 100);
            snow.draw();
        }
        L10_Birdhouse.cc2.setTransform(transform);
    }
    function drawSnowflakes(_nFlakes, _position) {
        let transform = L10_Birdhouse.cc2.getTransform();
        L10_Birdhouse.cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nFlakes; drawn++) {
            L10_Birdhouse.cc2.save();
            let pos = new L10_Birdhouse.Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size = new L10_Birdhouse.Vector(10, 10);
            let snowflake = new L10_Birdhouse.Snowflake(pos, size);
            snowflake.draw();
            snowflakes.push(snowflake);
            L10_Birdhouse.cc2.restore();
        }
        L10_Birdhouse.cc2.setTransform(transform);
    }
    function randomBetween(_min, _max) {
        let returnNumber = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }
    L10_Birdhouse.randomBetween = randomBetween;
    L10_Birdhouse.directions = ["x", "-x"];
})(L10_Birdhouse || (L10_Birdhouse = {}));
//# sourceMappingURL=main.js.map