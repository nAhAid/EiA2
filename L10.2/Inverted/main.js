"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    window.addEventListener("load", handleLoad);
    L10_Asteroids.linewidth = 2;
    let moveables = [];
    function handleLoad(_event) {
        console.log("Load");
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        L10_Asteroids.cc2 = canvas.getContext("2d");
        L10_Asteroids.cc2.fillStyle = "black";
        L10_Asteroids.cc2.strokeStyle = "white";
        L10_Asteroids.cc2.fillRect(0, 0, L10_Asteroids.cc2.canvas.width, L10_Asteroids.cc2.canvas.height);
        L10_Asteroids.cc2.lineWidth = L10_Asteroids.linewidth;
        L10_Asteroids.createPaths();
        createmoveables(5);
        let asteroid = new L10_Asteroids.Asteroid(1);
        console.log(asteroid);
        asteroid.draw();
        asteroid.move(0.1);
        window.setInterval(update, 20);
        canvas.addEventListener("mouseup", shootLaser);
        canvas.addEventListener("mousedown", shootProjectile);
    }
    function shootProjectile(_event) {
        let origin = new L10_Asteroids.Vector(_event.clientX - L10_Asteroids.cc2.canvas.offsetLeft, _event.clientY - L10_Asteroids.cc2.canvas.offsetTop);
        let velocitiy = new L10_Asteroids.Vector(0, 0);
        velocitiy.random(100, 100);
        let projectile = new L10_Asteroids.Projectile(origin, velocitiy);
        moveables.push(projectile);
    }
    function shootLaser(_event) {
        console.log("Shoot Laser");
        let hotspot = new L10_Asteroids.Vector(_event.clientX - L10_Asteroids.cc2.canvas.offsetLeft, _event.clientY - L10_Asteroids.cc2.canvas.offsetTop);
        let asteroidHit = getAsteroidHit(hotspot);
        if (asteroidHit)
            breakAsteroid(asteroidHit);
    }
    function getAsteroidHit(_hotspot) {
        for (let moveable of moveables) {
            if (moveable instanceof L10_Asteroids.Asteroid && moveable.isHit(_hotspot))
                return moveable;
        }
        return null;
    }
    function breakAsteroid(_asteroid) {
        if (_asteroid.size > 0.3) {
            for (let index = 0; index < 2; index++) {
                let fragment = new L10_Asteroids.Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocitiy.add(_asteroid.velocitiy);
                moveables.push(fragment);
            }
        }
        _asteroid.expendable = true;
    }
    function createmoveables(_nmoveables) {
        console.log("Create moveables");
        for (let i = 0; i < _nmoveables; i++) {
            let asteroid = new L10_Asteroids.Asteroid(1.0);
            moveables.push(asteroid);
        }
    }
    function update() {
        L10_Asteroids.cc2.fillRect(0, 0, L10_Asteroids.cc2.canvas.width, L10_Asteroids.cc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        deleteExpandables();
        console.log(moveables.length);
    }
    function deleteExpandables() {
        for (let i = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expendable)
                moveables.splice(i, 1);
        }
    }
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=main.js.map