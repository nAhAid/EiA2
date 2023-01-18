"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    class Snowflake extends L11_Birdhouse.Moveable {
        size;
        radiusParticle;
        xy;
        constructor(_position, _size) {
            super(_position);
            this.size = _size;
            this.radiusParticle = 10;
            this.velocity = new L11_Birdhouse.Vector(0, 0);
            this.velocity.random(50, 100, "y");
        }
        letItSnow(_timeslice) {
            let offset = new L11_Birdhouse.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.y > 250)
                this.position.y -= 250;
        }
        draw() {
            let radiusParticle = 40;
            let particle = new Path2D();
            let gradient = L11_Birdhouse.cc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);
            let start = L11_Birdhouse.cc2.getTransform();
            L11_Birdhouse.cc2.translate(L11_Birdhouse.posSnowflakes.x, L11_Birdhouse.posSnowflakes.y);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            L11_Birdhouse.cc2.save();
            L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L11_Birdhouse.cc2.fillStyle = gradient;
            if (this.xy == undefined) {
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                this.xy = new L11_Birdhouse.Vector(x, y);
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(x, y);
                L11_Birdhouse.cc2.fill(particle);
                L11_Birdhouse.cc2.restore();
            }
            else {
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(this.xy.x, this.xy.y);
                L11_Birdhouse.cc2.fill(particle);
                L11_Birdhouse.cc2.restore();
            }
            L11_Birdhouse.cc2.restore();
            L11_Birdhouse.cc2.setTransform(start);
        }
    }
    L11_Birdhouse.Snowflake = Snowflake;
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=snowflake.js.map