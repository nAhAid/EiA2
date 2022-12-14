"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    window.addEventListener("load", handleLoad);
    L09_Birdhouse.golden = 0.62;
    function handleLoad(_event) {
        console.log("load");
        let canvas = document.querySelector("canvas");
        L09_Birdhouse.cc2 = canvas.getContext("2d");
        let horizon = L09_Birdhouse.cc2.canvas.height * L09_Birdhouse.golden;
        let positionSun = new L09_Birdhouse.Vector(75, 100);
        let background = new L09_Birdhouse.Background(positionSun);
        background.draw();
        let positionMountain = new L09_Birdhouse.Vector(0, horizon);
        let mountainFar = new L09_Birdhouse.Mountain(positionMountain, "#6B7A7D", "#E6FEFE", 50, 135);
        let mountainNear = new L09_Birdhouse.Mountain(positionMountain, "#7c8d8a", "#c5d8d5", 35, 85);
        mountainFar.draw();
        mountainNear.draw();
    }
    function randomBetween(_min, _max) {
        let returnNumber = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }
    L09_Birdhouse.randomBetween = randomBetween;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=main.js.map