namespace L10_Birdhouse {
    export class BirdOnFly {
        position: Vector;
        velocity: Vector;
        scale: Vector;

        constructor(_position: Vector) {
            this.position = _position;
            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 200, directions[Math.floor(Math.random() * directions.length)]);

            this.scale = new Vector(0, 0);
            this.scale.set(this.position.y / 225, this.position.y / 225);
        }

        draw(): void {
            cc2.save();
            cc2.translate(this.position.x, this.position.y);
            cc2.scale(this.scale.x, this.scale.y);

            cc2.beginPath();
            cc2.moveTo(0, 0);
            cc2.bezierCurveTo(0, -10, -10, -10, -10, 0);
            cc2.moveTo(0, 0);
            cc2.strokeStyle = "#000";
            cc2.closePath();
            cc2.stroke();

            cc2.beginPath();
            cc2.moveTo(0, 0);
            cc2.bezierCurveTo(0, -10, 10, -10, 10, 0);
            cc2.moveTo(0, 0);
            cc2.strokeStyle = "#000";
            cc2.closePath();
            cc2.stroke();

            cc2.restore();
        }

        fly(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x > cc2.canvas.width)
                this.position.x -= cc2.canvas.width;

            if (this.position.x < 0)
                this.position.x += cc2.canvas.width;
        }
    }
}