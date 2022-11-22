namespace L08_generativeArt {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        cc2.fillStyle = "#000000";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);

        generateRandomArt();
    }

    function generateRandomArt(): void {
        for (let index: number = 0; index < 5 * randomNumber(100); index++) {
            generateCircle(index);
            generateLines(index);

        }
    }


    function generateLines(_position: number): void {
        let lines: Path2D = new Path2D();

        let startX: number = randomNumber(10);
        let startY: number = randomNumber(10);
        let endX: number = randomNumber(90);
        let endY: number = randomNumber(90);

        lines.moveTo(startX, startY);
        lines.lineTo(randomNumber(30), randomNumber(30));
        lines.lineTo(endX, endY);

        cc2.translate(randomNumber(333), randomNumber(666));

        let gradient: any = cc2.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, "red");
        gradient.addColorStop(0.5, "blue");
        gradient.addColorStop(1, "green");
        cc2.strokeStyle = gradient;

        cc2.stroke(lines);
        cc2.resetTransform();
       
        cc2.strokeStyle = "white";

    }

    function generateCircle(_position: number) {
        let randomPosition: number = randomNumber(_position);
        let x: number = randomNumber(100 * randomPosition * randomNumber(_position));
        let r: number = randomNumber(100);
        cc2.beginPath();
        cc2.arc(x + _position * randomNumber(_position), 100, r, 0, 2 * Math.PI);
        cc2.strokeStyle = randomColor();
        cc2.closePath();
        cc2.stroke();

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