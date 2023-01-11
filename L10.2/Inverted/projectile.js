"use strict";
var L10_Asteroids;
(function (L10_Asteroids) {
    class Projectile extends L10_Asteroids.Moveable {
        lifetime = 2;
        constructor(_position, _velocity) {
            super(_position);
            this.velocitiy = _velocity.copy();
        }
        draw() {
            L10_Asteroids.cc2.save();
            L10_Asteroids.cc2.translate(this.position.x, this.position.y);
            L10_Asteroids.cc2.strokeRect(-1, -1, 1, 1);
            L10_Asteroids.cc2.restore();
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.lifetime -= _timeslice;
            if (this.lifetime < 0) {
                this.expendable = true;
            }
        }
    }
    L10_Asteroids.Projectile = Projectile;
})(L10_Asteroids || (L10_Asteroids = {}));
//# sourceMappingURL=projectile.js.map