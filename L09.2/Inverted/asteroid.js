"use strict";
var L09_Asteroids;
(function (L09_Asteroids) {
    class Asteroid {
        position;
        velocitiy;
        type;
        size;
        constructor(_size) {
            this.position.x = 0;
            this.position.y = 0;
            this.size = _size;
        }
        move(_timeslice) {
            this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice;
        }
        draw() {
        }
        ;
    }
    L09_Asteroids.Asteroid = Asteroid;
})(L09_Asteroids || (L09_Asteroids = {}));
//# sourceMappingURL=asteroid.js.map