"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class Cloud {
        position;
        particleRadius;
        nParticles;
        size;
        constructor(_position, _nParticles) {
            this.position = _position;
            this.nParticles = _nParticles;
            this.particleRadius = 60;
            this.size = new L09_Birdhouse.Vector(325, 125);
        }
        draw() {
            let radiusParticle = 40;
            let particle = new Path2D();
            let gradient = L09_Birdhouse.cc2.createRadialGradient(0, 0, 0, 0, 0, this.particleRadius);
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");
            L09_Birdhouse.cc2.save();
            L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L09_Birdhouse.cc2.fillStyle = gradient;
            for (let drawn = 0; drawn < this.nParticles; drawn++) {
                let x = (Math.random() - 0.5) * this.size.x;
                let y = -(Math.random() * this.size.y);
                L09_Birdhouse.cc2.save();
                L09_Birdhouse.cc2.translate(x, y);
                L09_Birdhouse.cc2.fill(particle);
                L09_Birdhouse.cc2.restore();
            }
            L09_Birdhouse.cc2.restore();
        }
    }
    L09_Birdhouse.Cloud = Cloud;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=cloud.js.map