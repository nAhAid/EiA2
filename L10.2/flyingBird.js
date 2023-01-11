"use strict";
var L10_Birdhouse;
(function (L10_Birdhouse) {
    class BirdOnFly {
        position;
        velocity;
        scale;
        constructor(_position) {
            this.position = _position;
            this.velocity = new L10_Birdhouse.Vector(0, 0);
            this.velocity.random(50, 200, L10_Birdhouse.directions[Math.floor(Math.random() * L10_Birdhouse.directions.length)]);
            this.scale = new L10_Birdhouse.Vector(0, 0);
            this.scale.set(this.position.y / 225, this.position.y / 225);
        }
        draw() {
            L10_Birdhouse.cc2.save();
            L10_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L10_Birdhouse.cc2.scale(this.scale.x, this.scale.y);
            L10_Birdhouse.cc2.beginPath();
            L10_Birdhouse.cc2.moveTo(0, 0);
            L10_Birdhouse.cc2.bezierCurveTo(0, -10, -10, -10, -10, 0);
            L10_Birdhouse.cc2.moveTo(0, 0);
            L10_Birdhouse.cc2.strokeStyle = "#000";
            L10_Birdhouse.cc2.closePath();
            L10_Birdhouse.cc2.stroke();
            L10_Birdhouse.cc2.beginPath();
            L10_Birdhouse.cc2.moveTo(0, 0);
            L10_Birdhouse.cc2.bezierCurveTo(0, -10, 10, -10, 10, 0);
            L10_Birdhouse.cc2.moveTo(0, 0);
            L10_Birdhouse.cc2.strokeStyle = "#000";
            L10_Birdhouse.cc2.closePath();
            L10_Birdhouse.cc2.stroke();
            L10_Birdhouse.cc2.restore();
        }
        fly(_timeslice) {
            let offset = new L10_Birdhouse.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x > L10_Birdhouse.cc2.canvas.width)
                this.position.x -= L10_Birdhouse.cc2.canvas.width;
            if (this.position.x < 0)
                this.position.x += L10_Birdhouse.cc2.canvas.width;
        }
    }
    L10_Birdhouse.BirdOnFly = BirdOnFly;
})(L10_Birdhouse || (L10_Birdhouse = {}));
//# sourceMappingURL=flyingBird.js.map