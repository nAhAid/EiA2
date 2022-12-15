"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class Snowflake {
        position;
        size;
        velocity;
        radiusParticle;
        constructor(_position, _size) {
            this.position = _position;
            this.size = _size;
            this.radiusParticle = 10;
        }
        letItSnow(_timeslice) {
            console.log("Let it snow!");
        }
        draw() {
            let radiusParticle = 40;
            let particle = new Path2D();
            let gradient = L09_Birdhouse.cc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            L09_Birdhouse.cc2.save();
            L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L09_Birdhouse.cc2.fillStyle = gradient;
            let x = (Math.random() - 0.5) * this.size.x;
            let y = -(Math.random() * this.size.y);
            L09_Birdhouse.cc2.save();
            L09_Birdhouse.cc2.translate(x, y);
            L09_Birdhouse.cc2.fill(particle);
            L09_Birdhouse.cc2.restore();
            L09_Birdhouse.cc2.restore();
        }
    }
    L09_Birdhouse.Snowflake = Snowflake;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=snowflake.js.map