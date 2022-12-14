"use strict";
var L09_Asteroids;
(function (L09_Asteroids) {
    class Vector {
        x;
        y;
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x = this.x * _factor;
            this.y = this.y * _factor;
        }
        add(_addend) {
            this.x = this.x + _addend.x;
            this.y = this.y + _addend.y;
        }
    }
    L09_Asteroids.Vector = Vector;
})(L09_Asteroids || (L09_Asteroids = {}));
//# sourceMappingURL=vector.js.map