namespace L09_Birdhouse {

    export class Snowflake {
        position: Vector;
        size: Vector;
        velocity: Vector;
        radiusParticle: number;

        constructor(_position: Vector, _size: Vector) {
            this.position = _position;
            this.size = _size;
            this.radiusParticle = 10;
        }

        letItSnow(_timeslice: number) {
            console.log("Let it snow!");
        }

        draw() {
            let radiusParticle: number = 40;

            let particle: Path2D = new Path2D();
            let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, this.radiusParticle);

        
            particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
            gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
            gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

            cc2.save();
            cc2.translate(this.position.x, this.position.y);

            cc2.fillStyle = gradient;


            let x: number = (Math.random() - 0.5) * this.size.x;
            let y: number = - (Math.random() * this.size.y);
            cc2.save();
            cc2.translate(x, y);
            cc2.fill(particle);
            cc2.restore();


            cc2.restore();
        }
    }
}