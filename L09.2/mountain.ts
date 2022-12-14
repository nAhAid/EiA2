namespace L09_Birdhouse {
    export class Mountain {
        position: Vector;
        colorLow: string;
        colorHigh: string;
        min: number;
        max: number;

        constructor(_postion: Vector, _colorLow: string, _colorHigh: string, _min: number, _max: number) {
            this.position = _postion;
            this.colorLow = _colorLow;
            this.colorHigh = _colorHigh;
            this.min = _min;
            this.max = _max;

        }

        draw() {
            let stepMin: number = 50;
            let stepMax: number = 150;
            let x: number = 0;

            console.log("Draw Mountain");

            cc2.save();

            cc2.translate(this.position.x, this.position.y);

            cc2.beginPath();
            cc2.moveTo(0, 0);
            cc2.lineTo(0, -this.max);
            do {
                x += stepMin + randomBetween(stepMin, stepMax);
                let y: number = -this.min - randomBetween(this.min, this.max);

                cc2.lineTo(x, y);

            } while (x < cc2.canvas.width);

            cc2.lineTo(x, 0);
            cc2.closePath();

            let gradient: CanvasGradient = cc2.createLinearGradient(0, 0, 0, -this.max);
            gradient.addColorStop(0, this.colorLow);
            gradient.addColorStop(0.7, this.colorHigh);
            gradient.addColorStop(1, "#FFFFFF");

            cc2.fillStyle = gradient;
            cc2.fill();

            cc2.restore();
        }
    }
}