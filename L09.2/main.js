"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    window.addEventListener("load", handleLoad);
    L09_Birdhouse.golden = 0.62;
    let posSnowflakes = new L09_Birdhouse.Vector(400, 175);
    let snowflakes = [];
    function handleLoad(_event) {
        console.log("load");
        let canvas = document.querySelector("canvas");
        L09_Birdhouse.cc2 = canvas.getContext("2d");
        L09_Birdhouse.drawStatic();
        L09_Birdhouse.imgData = L09_Birdhouse.cc2.getImageData(0, 0, L09_Birdhouse.cc2.canvas.width, L09_Birdhouse.cc2.canvas.height);
        drawSnowflakes(50, posSnowflakes);
    }
    function drawSnowflakes(_nFlakes, _position) {
        let transform = L09_Birdhouse.cc2.getTransform();
        L09_Birdhouse.cc2.translate(_position.x, _position.y);
        for (let drawn = 0; drawn < _nFlakes; drawn++) {
            L09_Birdhouse.cc2.save();
            let pos = new L09_Birdhouse.Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size = new L09_Birdhouse.Vector(10, 10);
            let snowflake = new L09_Birdhouse.Snowflake(pos, size);
            snowflake.draw();
            snowflakes.push(snowflake);
            L09_Birdhouse.cc2.restore();
        }
        L09_Birdhouse.cc2.setTransform(transform);
        console.log(snowflakes);
    }
    function randomBetween(_min, _max) {
        let returnNumber = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }
    L09_Birdhouse.randomBetween = randomBetween;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=main.js.map