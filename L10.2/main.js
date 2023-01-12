"use strict";
/*
Aufgabe: <L10.2_Birdhouse>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <12.01.2023>
Quellen: </>
*/
var L10_Birdhouse;
(function (L10_Birdhouse) {
    window.addEventListener("load", handleLoad);
    L10_Birdhouse.golden = 0.62;
    L10_Birdhouse.posSnowflakes = new L10_Birdhouse.Vector(400, 175);
    let moveables = [];
    function handleLoad(_event) {
        let canvas = document.querySelector("canvas");
        L10_Birdhouse.cc2 = canvas.getContext("2d");
        L10_Birdhouse.drawStatic();
        L10_Birdhouse.imgData = L10_Birdhouse.cc2.getImageData(0, 0, L10_Birdhouse.cc2.canvas.width, L10_Birdhouse.cc2.canvas.height);
        drawSnowflakes(50, L10_Birdhouse.posSnowflakes);
        drawBirds(20);
        window.setInterval(update, 20);
        //window.setInterval(updateBird, 500);
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
            moveables.push(sittingBird);
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
            moveables.push(flyingBird);
            flyingBird.draw();
            L10_Birdhouse.cc2.restore();
        }
    }
    function update() {
        console.log("Update");
        L10_Birdhouse.cc2.putImageData(L10_Birdhouse.imgData, 0, 0);
        updateMoveables();
    }
    function updateMoveables() {
        let transform = L10_Birdhouse.cc2.getTransform();
        for (let moveable of moveables) {
            if (moveable instanceof L10_Birdhouse.Snowflake) {
                moveable.letItSnow(1 / 100);
                moveable.draw();
            }
            if (moveable instanceof L10_Birdhouse.BirdOnFly) {
                moveable.fly(1 / 50);
                moveable.draw();
            }
            if (moveable instanceof L10_Birdhouse.SitBird) {
                let check = moveable.checkUpdate();
                if (check == true) {
                    moveable.eat(1 / 100);
                    moveable.draw();
                }
                if (check == false) {
                    moveable.draw();
                }
            }
        }
        L10_Birdhouse.cc2.setTransform(transform);
    }
    function drawSnowflakes(_nFlakes, _position) {
        let transform = L10_Birdhouse.cc2.getTransform();
        for (let drawn = 0; drawn < _nFlakes; drawn++) {
            L10_Birdhouse.cc2.save();
            let pos = new L10_Birdhouse.Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size = new L10_Birdhouse.Vector(10, 10);
            let snowflake = new L10_Birdhouse.Snowflake(pos, size);
            snowflake.draw();
            moveables.push(snowflake);
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