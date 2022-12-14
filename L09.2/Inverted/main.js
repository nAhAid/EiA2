"use strict";
var L09_Asteroids;
(function (L09_Asteroids) {
    window.addEventListener("load", handleLoad);
    let asteroids = [];
    function handleLoad(_event) {
        console.log("Load");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L09_Asteroids.cc2 = canvas.getContext("2d");
        L09_Asteroids.cc2.fillStyle = "black";
        L09_Asteroids.cc2.strokeStyle = "white";
        L09_Asteroids.cc2.fillRect(0, 0, L09_Asteroids.cc2.canvas.width, L09_Asteroids.cc2.canvas.height);
        L09_Asteroids.createPaths();
        createAsteroids(5);
        let asteroid = new L09_Asteroids.Asteroid(1);
        console.log(asteroid);
        asteroid.draw();
        asteroid.move(0.1);
        window.setInterval(update, 20);
        canvas.addEventListener("mouseup", shootLaser);
    }
    function shootLaser(_event) {
        console.log("Shoot Laser");
        let hotspot = new L09_Asteroids.Vector(_event.clientX - L09_Asteroids.cc2.canvas.offsetLeft, _event.clientY - L09_Asteroids.cc2.canvas.offsetTop);
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
                let fragment = new L09_Asteroids.Asteroid(_asteroid.size / 2, _asteroid.position);
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
            let asteroid = new L09_Asteroids.Asteroid(1.0);
            asteroids.push(asteroid);
        }
    }
    function update() {
        console.log("Update");
        L09_Asteroids.cc2.fillRect(0, 0, L09_Asteroids.cc2.canvas.width, L09_Asteroids.cc2.canvas.height);
        for (let asteroid of asteroids) {
            asteroid.move(1 / 50);
            asteroid.draw();
        }
    }
})(L09_Asteroids || (L09_Asteroids = {}));
//# sourceMappingURL=main.js.map