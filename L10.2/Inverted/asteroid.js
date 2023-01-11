"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Asteroid extends L10_Asteroids.Moveable {
        position;
        velocitiy;
        type;
        size;
        constructor(_size, _position) {
            super(_position);
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Asteroids.Vector(0, 0);
            this.velocitiy = new L10_Asteroids.Vector(0, 0);
            this.velocitiy.random(100, 200);
            this.type = Math.floor(L10_Asteroids.shapesAsteroids.length * Math.random());
            this.size = _size;
        }
        draw() {
            L10_Asteroids.cc2.save();
            L10_Asteroids.cc2.translate(this.position.x, this.position.y);
            L10_Asteroids.cc2.scale(this.size, this.size);
            L10_Asteroids.cc2.translate(-50, -50);
            L10_Asteroids.cc2.lineWidth = L10_Asteroids.linewidth / this.size;
            L10_Asteroids.cc2.stroke(L10_Asteroids.asteroidPaths[this.type]);
            L10_Asteroids.cc2.restore();
        }
        isHit(_hotspot) {
            let hitsize = 50 * this.size;
            let difference = new L10_Asteroids.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L10_Asteroids.Asteroid = Asteroid;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=asteroid.js.map