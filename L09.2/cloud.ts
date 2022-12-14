namespace L09_Birdhouse {
    export class Cloud {

        position: Vector;
        particleRadius: number;
        nParticles: number;
        size: Vector;


        constructor(_position: Vector, _nParticles: number) {
            this.position = _position;
            this.nParticles = _nParticles;
            this.particleRadius = 60;
            this.size = new Vector(325, 125);
        }

        draw() {
            let radiusParticle: number = 40;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, this.particleRadius);

            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            cc2.save();
            cc2.translate(this.position.x, this.position.y);

            cc2.fillStyle = gradient;

            for (let drawn: number = 0; drawn < this.nParticles; drawn++) {
                let x: number = (Math.random() - 0.5) * this.size.x;
                let y: number = - (Math.random() * this.size.y);
                cc2.save();
                cc2.translate(x, y);
                cc2.fill(particle);
                cc2.restore();
            }

            cc2.restore();
        }
    }
}