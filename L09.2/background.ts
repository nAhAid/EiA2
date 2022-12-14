namespace L09_Birdhouse {
    export class Background {
        position: Vector;

        constructor(_position: Vector) {
            this.position = _position;
    
        }


        draw(): void {
            let gradient: CanvasGradient = cc2.createLinearGradient(0, 0, 0, cc2.canvas.height);
            gradient.addColorStop(0, "lightblue");
            gradient.addColorStop(golden, "white");
            gradient.addColorStop(1, "HSLA(122, 11%, 79%, 1)");

            cc2.fillStyle = gradient;
            cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);


            let r1: number = 20;
            let r2: number = 150;
            let gradientSun: CanvasGradient = cc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
            gradientSun.addColorStop(1, "HSLA(60, 0%, 90%, 0)");

            cc2.save();
            cc2.translate(this.position.x, this.position.y);
            cc2.fillStyle = gradientSun;
            cc2.arc(0, 0, r2, 0, 2 * Math.PI);
            cc2.fill();
            cc2.restore();
        }
    }
}