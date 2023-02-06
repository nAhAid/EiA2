namespace Endabgabe_test {
    enum Test {
        circle = "Circle",
        star = "Star",
        cross = "Cross"
    }

    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    let background: ImageData;
    let index: number = 1;

    window.addEventListener("load", handleLoad);


    let test: Test = Test.circle;

    console.log(test);

    function handleLoad(): void {
        console.log("Load");
        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        drawCircle(250, 300, 1, 1);
        window.setInterval(update, 30);

    }

    function update(): void {
        cc2.putImageData(background, 0, 0);
        drawCircle(250, 300, index, 1);

        if (index >= 130) {
            index = 1;
        }
        else {
            index++;
        }
    }


    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }

    function drawCircle(_positionX: number, _positionY: number, _lifespan: number, _size: number): void {
        console.log("Draw Circle");
        let radiusParticle: number = 10 * _size;
        let radiusCircle: number = 1;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);
        let start: DOMMatrix = cc2.getTransform();
        cc2.translate(_positionX, _positionY);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        cc2.fillStyle = gradient;



        for (let index: number = 0; index < 80; index++) {
            let angle: number = (index / 10) * 360;
            let radius: number = radiusCircle * _lifespan;

            let xPosition: number = radius * Math.cos(angle);
            let yPosition: number = radius * Math.sin(angle);

            cc2.save();
            cc2.translate(xPosition, yPosition);
            cc2.fill(particle);
            cc2.restore();
        }

        cc2.setTransform(start);

    }
}