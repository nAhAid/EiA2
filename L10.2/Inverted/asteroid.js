"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Asteroid {
        position;
        velocitiy;
        type;
        size;
        constructor(_size, _position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Asteroids.Vector(0, 0);
            this.velocitiy = new L10_Asteroids.Vector(0, 0);
            this.velocitiy.random(100, 200);
            this.type = Math.floor(L10_Asteroids.shapesAsteroids.length * Math.random());
            this.size = _size;
        }
        move(_timeslice) {
            /* this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice; */
            let offset = new L10_Asteroids.Vector(this.velocitiy.x, this.velocitiy.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L10_Asteroids.cc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L10_Asteroids.cc2.canvas.height;
            if (this.position.x > L10_Asteroids.cc2.canvas.width)
                this.position.x -= L10_Asteroids.cc2.canvas.width;
            if (this.position.y > L10_Asteroids.cc2.canvas.height)
                this.position.y -= L10_Asteroids.cc2.canvas.height;
        }
        draw() {
            L10_Asteroids.cc2.save();
            L10_Asteroids.cc2.translate(this.position.x, this.position.y);
            L10_Asteroids.cc2.scale(this.size, this.size);
            L10_Asteroids.cc2.translate(-50, -50);
            L10_Asteroids.cc2.lineWidth = 1 / this.size;
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