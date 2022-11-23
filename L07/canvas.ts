namespace L08_generativeArt {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");



    let colors: string[] = [
        "red", "blue", "green", "magenta", "aquamarine", "brown", "white", "orange", "yellow", "pink", "violet", "turquoise", "gold", "silver"
    ]


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        cc2.fillStyle = "#000000";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);

        generateRandomArt();
    }

    function generateRandomArt(): void {
        generatePattern(1);
        for (let index: number = 0; index < 5 + randomNumber(100); index++) {

            generateCircle(index);
            generateLines(index);
            generateTriangles(index);
            generateRectangles(index);

        }
    }

    function generatePattern(_index: number): void {
        let pattern: CanvasRenderingContext2D = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d");
        pattern.canvas.width = 40;
        pattern.canvas.height = 20;

        pattern.fillStyle = "#000";
        pattern.strokeStyle = randomColor();
        pattern.fillRect(0, 0, pattern.canvas.width, pattern.canvas.height);
        pattern.moveTo(0, 10);
        pattern.lineJoin = "bevel";
        pattern.lineTo(10, randomNumber(10));
        pattern.lineTo(randomNumber(20), 0);
        pattern.lineTo(randomNumber(30), 0);
        pattern.lineTo(40, randomNumber(10));
        pattern.lineTo(randomNumber(30), 20);
        pattern.lineTo(20, randomNumber(10));
        pattern.lineTo(randomNumber(10), 10);
        pattern.stroke();

        cc2.fillStyle = <CanvasPattern>cc2.createPattern(pattern.canvas, "repeat");
        cc2.fillRect(0, 0, canvas.width, canvas.height);


    }

    function generateRectangles(_index: number): void {
        let grd: CanvasGradient = cc2.createRadialGradient(75, 50, 5, 90, 60, 5);
        grd.addColorStop(0, colors[randomNumber(colors.length)]);
        grd.addColorStop(0.5, colors[randomNumber(colors.length)]);
        grd.addColorStop(1, colors[randomNumber(colors.length)]);

        cc2.translate(randomNumber(333), randomNumber(666));
        cc2.scale(randomNumber(30), randomNumber(20));

        cc2.fillStyle = grd;
        cc2.fillRect(0, 0, randomNumber(_index + 20), randomNumber(_index + 20));

        cc2.resetTransform();


    }

    function generateTriangles(_index: number): void {
        let x: number = randomNumber(_index);
        let y: number = randomNumber(_index * x);

        cc2.translate(randomNumber(111) * 10, randomNumber(randomNumber(222)) * 5);

        let grd: CanvasGradient = cc2.createRadialGradient(75, 50, 5, 90, 60, 100);
        grd.addColorStop(0, colors[randomNumber(colors.length)]);
        grd.addColorStop(0.5, colors[randomNumber(colors.length)]);
        grd.addColorStop(1, colors[randomNumber(colors.length)]);

        cc2.beginPath();
        cc2.moveTo(x, y);
        cc2.lineJoin = "bevel";
        cc2.lineTo(x, 20);
        cc2.lineTo(30, y);
        cc2.fillStyle = grd;
        cc2.closePath();
        cc2.fill();
        cc2.stroke();

        cc2.resetTransform();
    }


    function generateLines(_position: number): void {
        let lines: Path2D = new Path2D();

        let startX: number = randomNumber(10);
        let startY: number = randomNumber(10);
        let endX: number = randomNumber(90);
        let endY: number = randomNumber(90);

        lines.moveTo(startX, startY);
        cc2.lineCap = "round";
        cc2.lineJoin = "round";
        lines.lineTo(randomNumber(30), randomNumber(30));
        lines.lineTo(endX, endY);

        cc2.translate(randomNumber(333), randomNumber(666));
        cc2.scale(randomNumber(30), randomNumber(20));

        let gradient: CanvasGradient = cc2.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, colors[randomNumber(colors.length)]);
        gradient.addColorStop(0.5, colors[randomNumber(colors.length)]);
        gradient.addColorStop(1, colors[randomNumber(colors.length)]);
        cc2.strokeStyle = gradient;

        cc2.stroke(lines);
        cc2.resetTransform();

        cc2.strokeStyle = "white";
        cc2.lineCap = "butt";
        cc2.lineJoin = "miter";

    }

    function generateCircle(_position: number) {
       
        cc2.translate(randomNumber(10), randomNumber(20));

        let randomPosition: number = randomNumber(_position);
        let x: number = randomNumber(100 * randomPosition * randomNumber(_position));
        let r: number = randomNumber(100);
        cc2.beginPath();
        cc2.arc(x + _position * randomNumber(_position), 100, r, 0, 2 * Math.PI);
        cc2.strokeStyle = randomColor();
        cc2.closePath();
        cc2.stroke();

        cc2.resetTransform();

    }



    function randomColor() {
        let R: number = (Math.floor(Math.random() * 255));
        let G: number = (Math.floor(Math.random() * 255));
        let B: number = (Math.floor(Math.random() * 255));

        let randColor: string = "rgb(" + R + ", " + G + "," + B + ")";
        return randColor;
    }


    function randomNumber(_multiplicator: number) {
        let random: number = Math.floor(Math.random() * _multiplicator);
        return Math.floor(Math.random() * random);
    }


}