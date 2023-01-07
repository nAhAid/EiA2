"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class Snowflake {
        position;
        size;
        velocity;
        radiusParticle;
        xy;
        constructor(_position, _size) {
            this.position = _position;
            this.size = _size;
            this.radiusParticle = 10;
            this.velocity = new L09_Birdhouse.Vector(0, 0);
            this.velocity.random(50, 100, "y");
        }
        letItSnow(_timeslice) {
            let offset = new L09_Birdhouse.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.y > 250)
                this.position.y -= 250;
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
            if (this.xy == undefined) {
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                let pos = new L09_Birdhouse.Vector(x, y);
                this.xy = pos;
                L09_Birdhouse.cc2.save();
                L09_Birdhouse.cc2.translate(x, y);
                L09_Birdhouse.cc2.fill(particle);
                L09_Birdhouse.cc2.restore();
            }
            else {
                L09_Birdhouse.cc2.save();
                L09_Birdhouse.cc2.translate(this.xy.x, this.xy.y);
                L09_Birdhouse.cc2.fill(particle);
                L09_Birdhouse.cc2.restore();
            }
            L09_Birdhouse.cc2.restore();
        }
    }
    L09_Birdhouse.Snowflake = Snowflake;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=snowflake.js.map