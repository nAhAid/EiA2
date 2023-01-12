"use strict";
var L10_Birdhouse;
(function (L10_Birdhouse) {
    class Moveable {
        position;
        velocity;
        update;
        constructor(_position, _velocity) {
            this.position = _position.copy();
            if (_velocity)
                this.velocity = _velocity.copy();
            else
                this.velocity = new L10_Birdhouse.Vector(0, 0);
            this.update = true;
        }
    }
    L10_Birdhouse.Moveable = Moveable;
})(L10_Birdhouse || (L10_Birdhouse = {}));
//# sourceMappingURL=Moveable.js.map