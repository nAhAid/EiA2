namespace L09_Birdhouse {
    export class SitBird {
        position: Vector;
        velocity: Vector;
        color: BirdColor;
        beakColor: string;
        scale: Vector;
        eating: boolean;

        constructor(_position: Vector, _color: BirdColor, _beakColor: string) {
            this.position = _position;
            this.color = _color;
            this.beakColor = _beakColor;
            this.scale = new Vector(0, 0);
            this.scale.set(this.position.y / 500, this.position.y / 500);
            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100, directions[Math.floor(Math.random() * directions.length)]);

            let values: boolean[] = [true, false];
            this.eating = values[Math.floor(Math.random() * values.length)];
        }

        draw(): void {

            if (this.eating != true) {
                let r1: number = 15;
                let transform: DOMMatrix = cc2.getTransform();

                cc2.scale(this.scale.x, this.scale.y);

                //Draw Feet
                cc2.translate(this.position.x, this.position.y);
                cc2.beginPath();
                cc2.moveTo(-10, 10);
                cc2.lineTo(-5, 0);
                cc2.lineTo(0, 10);
                cc2.lineTo(5, 0);
                cc2.lineTo(10, 10);
                cc2.moveTo(0, 10);
                cc2.strokeStyle = "#000";
                cc2.lineWidth = 2;
                cc2.closePath();
                cc2.stroke();

                //Draw Legs
                let leg: Path2D = new Path2D();
                leg.moveTo(0, 0);
                leg.lineTo(0, -20);
                cc2.save();
                cc2.translate(-5, 0);
                cc2.stroke(leg);
                cc2.translate(10, 0);
                cc2.stroke(leg);
                cc2.restore();

                cc2.translate(0, -25);
                let body: DOMMatrix = cc2.getTransform();


                let bCircle: Path2D = new Path2D;
                let hCircle: Path2D = new Path2D;
                let eye: Path2D = new Path2D;

                //drawBody
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.bColor;
                cc2.fill(bCircle);

                //drawHead
                cc2.translate(0, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.hColor;
                cc2.fill(hCircle);
                //drawEye
                cc2.translate(-r1 / 2, -r1 * 0.1);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.eyeColor;
                cc2.fill(eye);
                //drawEye
                cc2.translate(r1, 0);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.eyeColor;
                cc2.fill(eye);

                //drawBeak
                cc2.setTransform(body);
                cc2.beginPath();
                cc2.moveTo(0, 0);
                cc2.lineTo(-5, -r1 * 0.8);
                cc2.lineTo(5, -r1 * 0.8);
                cc2.fillStyle = this.beakColor;
                cc2.closePath();
                cc2.fill();

                cc2.setTransform(transform);
            }

            if (this.eating == true) {
                let r1: number = 15;
                let transform: DOMMatrix = cc2.getTransform();

                cc2.scale(this.scale.x, this.scale.y);

                //Draw Feet
                cc2.translate(this.position.x, this.position.y);
                let position: DOMMatrix = cc2.getTransform();

                cc2.beginPath();
                cc2.moveTo(-10, 10);
                cc2.lineTo(-5, 0);
                cc2.lineTo(0, 10);
                cc2.lineTo(5, 0);
                cc2.lineTo(10, 10);
                cc2.moveTo(0, 10);
                cc2.strokeStyle = "#000";
                cc2.lineWidth = 2;
                cc2.closePath();
                cc2.stroke();

                //Draw Legs
                let leg: Path2D = new Path2D();
                leg.moveTo(0, 0);
                leg.lineTo(0, -20);
                cc2.save();
                cc2.translate(-5, 0);
                cc2.stroke(leg);
                cc2.translate(10, 0);
                cc2.stroke(leg);
                cc2.restore();

                cc2.translate(0, -25);
                let body: DOMMatrix = cc2.getTransform();


                let bCircle: Path2D = new Path2D;
                let hCircle: Path2D = new Path2D;

                //drawBody
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.bColor;
                cc2.fill(bCircle);

                cc2.setTransform(position);
                //drawBeak
                cc2.translate(0, 5);
                cc2.beginPath();
                cc2.moveTo(0, 0);
                cc2.lineTo(-5, -r1 * 0.8);
                cc2.lineTo(5, -r1 * 0.8);
                cc2.fillStyle = this.beakColor;
                cc2.closePath();
                cc2.fill();

                cc2.setTransform(position);
                cc2.translate(0, -25 / 2);
                
                //drawHead
                
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.hColor;
                cc2.fill(hCircle);

                cc2.setTransform(transform);
            }

        }

        eat(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            this.eating = !this.eating;

            if (this.position.x > cc2.canvas.width)
                this.position.x -= cc2.canvas.width;

            if (this.position.x < 0)
                this.position.x += cc2.canvas.width;
        }
    }
}