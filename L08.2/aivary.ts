namespace L08_2_aivary {

    interface Vector {
        x: number;
        y: number;
    }

    let cc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");


        let horizon: number = cc2.canvas.height * golden;
        drawBackground();
        drawSun({ x: 75, y: 100 });
        drawMountains({ x: 0, y: horizon }, 50, 135, "#6B7A7D", "#E6FEFE");
        drawMountains({ x: 0, y: horizon }, 35, 85, "#7c8d8a", "#c5d8d5");
        drawCloud({ x: 550, y: 150 }, { x: 325, y: 125 }, 40, 60);
        drawTrees(5, { x: 0, y: horizon }, { x: 0.5, y: 0.5 });
        drawSnowman({ x: randomBetween(10, 740), y: 200 });


        drawSnowflakes(50, { x: 400, y: 175 });
    }

    function drawBackground(): void {
        let gradient: CanvasGradient = cc2.createLinearGradient(0, 0, 0, cc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSLA(122, 11%, 79%, 1)");

        cc2.fillStyle = gradient;
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
    }

    function drawSun(_position: Vector): void {
        console.log("Sun");

        let r1: number = 20;
        let r2: number = 150;
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, r1, 0, 0, r2);
        gradient.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
        gradient.addColorStop(1, "HSLA(60, 0%, 90%, 0)");

        cc2.save();

        cc2.translate(_position.x, _position.y);
        cc2.fillStyle = gradient;
        cc2.arc(0, 0, r2, 0, 2 * Math.PI);
        cc2.fill();

        cc2.restore();

    }

    function drawCloud(_position: Vector, _size: Vector, _nParticles: number, _radiusParticle: number): void {

        let radiusParticle: number = 40;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, _radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        cc2.save();
        cc2.translate(_position.x, _position.y);

        cc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < _nParticles; drawn++) {
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            cc2.save();
            cc2.translate(x, y);
            cc2.fill(particle);
            cc2.restore();
        }

        cc2.restore();
    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        let stepMin: number = 50;
        let stepMax: number = 150;
        let x: number = 0;

        cc2.save();

        cc2.translate(_position.x, _position.y);

        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(0, -_max);
        do {
            x += stepMin + randomBetween(stepMin, stepMax);
            let y: number = -_min - randomBetween(_min, _max);

            cc2.lineTo(x, y);

        } while (x < cc2.canvas.width);

        cc2.lineTo(x, 0);
        cc2.closePath();

        let gradient: CanvasGradient = cc2.createLinearGradient(0, 0, 0, -_max);
        gradient.addColorStop(0, _colorLow);
        gradient.addColorStop(0.7, _colorHigh);
        gradient.addColorStop(1, "#FFFFFF");

        cc2.fillStyle = gradient;
        cc2.fill();

        cc2.restore();
    }

    function randomBetween(_min: number, _max: number) {
        let returnNumber: number = Math.random() * (_max - _min);
        return returnNumber;
    }

    function drawTrees(_nTrees: number, _position: Vector, _maxScale: Vector): void {
        let transform: DOMMatrix = cc2.getTransform();


        cc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < _nTrees; drawn++) {
            let x: number = randomBetween(20, 750) + drawn * drawn;
            let y: number = randomBetween(1, 130);
            let scale: Vector = { x: _maxScale.x * (y / 115), y: _maxScale.y * (y / 115) };

            cc2.save();
            cc2.scale(scale.x, scale.y);
            cc2.translate(x, y);

            drawTree(0.2);
            cc2.restore();

        }
        cc2.setTransform(transform);
    }

    function drawTree(_snowPart: number) {
        let nBranches: number = 50;
        let maxRadius: number = 60;
        let whiteBranches = nBranches * _snowPart;
        let greenBranches = nBranches - whiteBranches;

        let branch: Path2D = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);

        cc2.fillStyle = "brown";
        cc2.fillRect(0, 0, 20, -200);

        cc2.save();
        cc2.translate(0, -120);


        for (let drawn: number = 0; drawn < greenBranches; drawn++) {
            let y: number = Math.random() * 350;
            let size: number = 1 - y / 700;
            let x: number = (Math.random() - 0.5) * 2 * maxRadius;

            cc2.save();
            cc2.translate(0, -y);
            cc2.scale(size, size);
            cc2.translate(x, 0);

            let colorAngle: number = randomBetween(35, 70);
            let color: string = "HSLA(122, 50%," + colorAngle + "%, 0.5)";

            cc2.fillStyle = color;
            cc2.fill(branch);

            cc2.restore();
        }

        for (let drawn: number = 0; drawn < whiteBranches; drawn++) {
            let y: number = Math.random() * 350;
            let size: number = 1 - y / 700;
            let x: number = (Math.random() - 0.5) * 2 * maxRadius;

            cc2.save();
            cc2.translate(0, -y);
            cc2.scale(size, size);
            cc2.translate(x, 0);


            let color: string = "HSLA(132, 50%, 100%, 0.7)";

            cc2.fillStyle = color;
            cc2.fill(branch);

            cc2.restore();
        }
        cc2.restore();
    }


    function drawSnowflakes(_nFlakes: number, _position: Vector) {
        let transform: DOMMatrix = cc2.getTransform();

        cc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < _nFlakes; drawn++) {
            cc2.save();
            let xPosition: number = randomBetween(0, 325);
            let yPosition: number = randomBetween(0, 250);

            drawCloud({ x: xPosition, y: yPosition }, { x: 10, y: 10 }, 1, 10);
            cc2.restore();

        }

        cc2.setTransform(transform);
    }

    function drawSnowman(_position: Vector) {
        let r1: number = 70;
        let r2: number = r1 / 3;
        let r3: number = r2 / 3;
        let r: number[] = [
            70, 50, 30
        ];

        //let x1: Vector = { x: 0, y: r1 };
        //let x2: Vector = { x: 0, y: r1 };
        //let x3: Vector = { x: 0, y: r2 };
        let x: Vector[] = [
            { x: 0, y: r1 },
            { x: 0, y: r2 },
            { x: 0, y: r3 }
        ];

        let color: string = "#FFF";
        let transform: DOMMatrix = cc2.getTransform();

        let branch: Path2D = new Path2D();

        cc2.save();
        cc2.translate(_position.x, _position.y);
        for (let index: number = 1; index < 4; index++) {
            cc2.translate(x[index - 1].x, x[index - 1].y);
            branch.arc(0, 0, r[index - 1], 0, 2 * Math.PI);
            cc2.fillStyle = color;
            cc2.fill(branch);
        }

        /*  cc2.translate(_position.x, _position.y);
         cc2.translate(x[index].x, x[index].y);
         branch.arc(0, 0, r[index], 0, 2 * Math.PI);
         cc2.fillStyle = color;
         cc2.fill(branch);
 
 
         cc2.translate(x2.x, x2.y);
         branch.arc(0, 0, r2, 0, 2 * Math.PI);
         cc2.fillStyle = color;
         cc2.fill(branch);
 
         cc2.translate(x3.x, x3.y);
         branch.arc(0, 0, r3, 0, 2 * Math.PI);
         cc2.fillStyle = color;
         cc2.fill(branch); */



        cc2.save();
        cc2.translate(r3 / 2, 0);
        branch.arc(0, 0, r3 / 4, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke();

        cc2.save();
        cc2.translate(-r3, 0);
        branch.arc(0, 0, r3 / 4, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke();

        cc2.restore();
        cc2.beginPath();
        cc2.moveTo(-r3, 0);
        cc2.bezierCurveTo(0, -r3 / 4, -r3 / 2, -r3 / 4, r3 / 4, 0);
        cc2.strokeStyle = "#000";
        //cc2.lineWidth = randomNumber(5);
        cc2.closePath();
        cc2.stroke();

        cc2.strokeStyle = "#FFF";
        cc2.setTransform(transform);


    }

}