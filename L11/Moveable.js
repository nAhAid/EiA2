"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    class Moveable {
        position;
        velocity;
        update;
        expendable = false;
        constructor(_position, _velocity) {
            this.position = _position.copy();
            if (_velocity)
                this.velocity = _velocity.copy();
            else
                this.velocity = new L11_Birdhouse.Vector(0, 0);
            this.update = true;
        }
    }
    L11_Birdhouse.Moveable = Moveable;
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=Moveable.js.map