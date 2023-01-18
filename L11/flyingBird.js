"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    class BirdOnFly extends L11_Birdhouse.Moveable {
        velocity;
        scale;
        constructor(_position) {
            super(_position);
            this.velocity = new L11_Birdhouse.Vector(0, 0);
            this.velocity.random(50, 200, L11_Birdhouse.directions[Math.floor(Math.random() * L11_Birdhouse.directions.length)]);
            this.scale = new L11_Birdhouse.Vector(0, 0);
            this.scale.set(this.position.y / 225, this.position.y / 225);
        }
        draw() {
            let start = L11_Birdhouse.cc2.getTransform();
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L11_Birdhouse.cc2.scale(this.scale.x, this.scale.y);
            L11_Birdhouse.cc2.beginPath();
            L11_Birdhouse.cc2.moveTo(0, 0);
            L11_Birdhouse.cc2.bezierCurveTo(0, -10, -10, -10, -10, 0);
            L11_Birdhouse.cc2.moveTo(0, 0);
            L11_Birdhouse.cc2.strokeStyle = "#000";
            L11_Birdhouse.cc2.closePath();
            L11_Birdhouse.cc2.stroke();
            L11_Birdhouse.cc2.beginPath();
            L11_Birdhouse.cc2.moveTo(0, 0);
            L11_Birdhouse.cc2.bezierCurveTo(0, -10, 10, -10, 10, 0);
            L11_Birdhouse.cc2.moveTo(0, 0);
            L11_Birdhouse.cc2.strokeStyle = "#000";
            L11_Birdhouse.cc2.closePath();
            L11_Birdhouse.cc2.stroke();
            L11_Birdhouse.cc2.restore();
            L11_Birdhouse.cc2.setTransform(start);
        }
        fly(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x > L11_Birdhouse.cc2.canvas.width)
                this.position.x -= L11_Birdhouse.cc2.canvas.width;
            if (this.position.x < 0)
                this.position.x += L11_Birdhouse.cc2.canvas.width;
        }
    }
    L11_Birdhouse.BirdOnFly = BirdOnFly;
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=flyingBird.js.map