"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Moveable {
        position;
        velocitiy;
        expendable = false;
        constructor(_position) {
            if (_position)
                this.position = _position.copy();
            else
                this.position = new L10_Asteroids.Vector(0, 0);
            this.velocitiy = new L10_Asteroids.Vector(0, 0);
        }
        move(_timeslice) {
            /* this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice; */
            let offset = this.velocitiy.copy();
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
            console.log("");
        }
    }
    L10_Asteroids.Moveable = Moveable;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=moveable.js.map