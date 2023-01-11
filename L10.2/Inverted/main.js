"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    window.addEventListener("load", handleLoad);
    let asteroids = [];
    function handleLoad(_event) {
        console.log("Load");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Asteroids.cc2 = canvas.getContext("2d");
        L10_Asteroids.cc2.fillStyle = "black";
        L10_Asteroids.cc2.strokeStyle = "white";
        L10_Asteroids.cc2.fillRect(0, 0, L10_Asteroids.cc2.canvas.width, L10_Asteroids.cc2.canvas.height);
        L10_Asteroids.createPaths();
        createAsteroids(5);
        let asteroid = new L10_Asteroids.Asteroid(1);
        console.log(asteroid);
        asteroid.draw();
        asteroid.move(0.1);
        window.setInterval(update, 20);
        canvas.addEventListener("mouseup", shootLaser);
    }
    function shootLaser(_event) {
        console.log("Shoot Laser");
        let hotspot = new L10_Asteroids.Vector(_event.clientX - L10_Asteroids.cc2.canvas.offsetLeft, _event.clientY - L10_Asteroids.cc2.canvas.offsetTop);
        let asteroidHit = getAsteroidHit(hotspot);
        if (asteroidHit)
            breakAsteroid(asteroidHit);
    }
    function getAsteroidHit(_hotspot) {
        for (let asteroid of asteroids) {
            if (asteroid.isHit(_hotspot))
                return asteroid;
        }
        return null;
    }
    function breakAsteroid(_asteroid) {
        if (_asteroid.size > 0.3) {
            for (let index = 0; index < 2; index++) {
                let fragment = new L10_Asteroids.Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocitiy.add(_asteroid.velocitiy);
                asteroids.push(fragment);
            }
        }
        let index = asteroids.indexOf(_asteroid);
        asteroids.splice(index, 1);
    }
    function createAsteroids(_nAsteroids) {
        console.log("Create asteroids");
        for (let i = 0; i < _nAsteroids; i++) {
            let asteroid = new L10_Asteroids.Asteroid(1.0);
            asteroids.push(asteroid);
        }
    }
    function update() {
        console.log("Update");
        L10_Asteroids.cc2.fillRect(0, 0, L10_Asteroids.cc2.canvas.width, L10_Asteroids.cc2.canvas.height);
        for (let asteroid of asteroids) {
            asteroid.move(1 / 50);
            asteroid.draw();
        }
    }
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=main.js.map