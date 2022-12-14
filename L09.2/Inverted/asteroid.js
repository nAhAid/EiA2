"use strict";
var L09_Asteroids;
(function (L09_Asteroids) {
    class Asteroid {
        position;
        velocitiy;
        type;
        size;
        constructor(_size, _position) {
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Asteroids.Vector(0, 0);
            this.velocitiy = new L09_Asteroids.Vector(0, 0);
            this.velocitiy.random(100, 200);
            this.type = Math.floor(L09_Asteroids.shapesAsteroids.length * Math.random());
            this.size = _size;
        }
        move(_timeslice) {
            /* this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice; */
            let offset = new L09_Asteroids.Vector(this.velocitiy.x, this.velocitiy.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.x += L09_Asteroids.cc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += L09_Asteroids.cc2.canvas.height;
            if (this.position.x > L09_Asteroids.cc2.canvas.width)
                this.position.x -= L09_Asteroids.cc2.canvas.width;
            if (this.position.y > L09_Asteroids.cc2.canvas.height)
                this.position.y -= L09_Asteroids.cc2.canvas.height;
        }
        draw() {
            L09_Asteroids.cc2.save();
            L09_Asteroids.cc2.translate(this.position.x, this.position.y);
            L09_Asteroids.cc2.scale(this.size, this.size);
            L09_Asteroids.cc2.translate(-50, -50);
            L09_Asteroids.cc2.stroke(L09_Asteroids.asteroidPaths[this.type]);
            L09_Asteroids.cc2.restore();
        }
        isHit(_hotspot) {
            let hitsize = 50 * this.size;
            let difference = new L09_Asteroids.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L09_Asteroids.Asteroid = Asteroid;
})(L09_Asteroids || (L09_Asteroids = {}));
//# sourceMappingURL=asteroid.js.map