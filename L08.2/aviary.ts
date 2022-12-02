/*
Aufgabe: <L08.2_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <02.12.2022>
Quellen: <Ich, W3Schools>
*/

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
        drawSnowman({ x: randomBetween(10, 325), y: 425 });
        drawAviary({ x: randomBetween(335, 700), y: 450 }, 1);
        drawBirds(20);
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
        let returnNumber: number = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }

    function drawTrees(_nTrees: number, _position: Vector, _maxScale: Vector): void {
        let transform: DOMMatrix = cc2.getTransform();


        cc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < _nTrees; drawn++) {
            let x: number = randomBetween(0, 750);
            let y: number = randomBetween(10, 30);
            let scale: Vector = { x: (y / 50), y: (y / 50) };

            cc2.save();
            cc2.scale(scale.x, scale.y);
            cc2.translate(x, y);

            drawTree(randomBetween(0.2, 0.8));
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

            let colorAngle: number = randomBetween(10, 50);
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
        let r1: number = 60;
        let r2: number = r1 * 0.8;
        let r3: number = r2 * 0.8;

        let x1: Vector = { x: 0, y: r1 };
        let x2: Vector = { x: 0, y: r1 * 0.75 };
        let x3: Vector = { x: 0, y: r2 };


        let color: string = "#FFF";
        let transform: DOMMatrix = cc2.getTransform();

        let circle1: Path2D = new Path2D();
        let circle2: Path2D = new Path2D();
        let circle3: Path2D = new Path2D();
        let eye: Path2D = new Path2D();
        let pupil: Path2D = new Path2D();
        let cylinder: Path2D = new Path2D();

        cc2.save();
        cc2.translate(_position.x, _position.y);

        cc2.translate(x1.x, -x1.y);
        circle1.arc(0, 0, r1, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle1);

        cc2.translate(x2.x, -x2.y);
        circle2.arc(0, 0, r2, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle2);

        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);

        cc2.save();
        cc2.translate(x2.x, x2.y);
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);

        cc2.restore();

        cc2.translate(x3.x, -x3.y);
        let head: DOMMatrix = cc2.getTransform();
        circle3.arc(0, 0, r3, 0, 2 * Math.PI);
        cc2.fillStyle = color;
        cc2.fill(circle3);

        //draw Eye
        cc2.save();
        cc2.translate(r3 / 2, - r3 / 4);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);

        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);

        //draw Eye
        cc2.translate(-r3, 0);
        eye.arc(0, 0, r3 / 6, 0, 2 * Math.PI);
        cc2.strokeStyle = "#000";
        cc2.stroke(eye);
        //draw Pupil
        pupil.arc(0, 0, r3 / 15, 0, 2 * Math.PI);
        cc2.fillStyle = "#000";
        cc2.fill(pupil);

        cc2.restore();

        //draw Mouth
        cc2.setTransform(head);
        cc2.beginPath();
        cc2.moveTo(-r3 / 2, r3 / 10);
        cc2.bezierCurveTo(-r3 / 2, r3 * golden, r3 / 2, r3 * golden, r3 / 2, r3 / 10);
        cc2.moveTo(-r3, 0);
        cc2.strokeStyle = "#FF0000";
        cc2.lineWidth = 2;
        cc2.closePath();
        cc2.stroke();


        //draw Cylinder
        cc2.setTransform(head);
        cc2.translate(0, -(r3 * 0.8));
        let cWidth: number = r3 * 1.2;
        let cHeight: number = r3 * 1.1;
        cylinder.moveTo(-(cWidth / 2), 0);
        cylinder.lineTo(-(cWidth / 2), - cHeight);
        cylinder.lineTo(cWidth / 2, - cHeight);
        cylinder.lineTo(cWidth / 2, 0);
        cc2.fillStyle = "#000";
        cc2.fill(cylinder);

        cc2.beginPath();
        cc2.moveTo(-r3, 0);
        cc2.lineTo(r3, 0);
        cc2.lineWidth = 10;
        cc2.strokeStyle = "#000";
        cc2.closePath();
        cc2.stroke();



        cc2.strokeStyle = "#FFF";
        cc2.setTransform(transform);
    }

    function drawAviary(_position: Vector, _nBirds: number) {
        console.log("Aviary");

        let transform: DOMMatrix = cc2.getTransform();
        cc2.translate(_position.x, _position.y);
        let colorFill: string = "#883607";
        let colorStroke: string = "#532a13";
        let t1: Vector = { x: -45, y: 30 };
        let t2: Vector = { x: 0, y: -30 };
        let t3: Vector = { x: 45, y: 30 };

        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(0, -120);
        cc2.strokeStyle = colorFill;
        cc2.lineWidth = 8;
        cc2.closePath();
        cc2.stroke();

        cc2.translate(0, -150);
        cc2.beginPath();
        cc2.moveTo(t1.x, t1.y);
        cc2.lineTo(t1.x / 2, 0);
        cc2.lineTo(t3.x / 2, 0);
        cc2.lineTo(t3.x, t3.y);
        cc2.fillStyle = colorFill;
        cc2.strokeStyle = colorStroke;
        cc2.lineWidth = 8;
        cc2.closePath();
        cc2.stroke();
        cc2.fill();

        cc2.beginPath();
        cc2.moveTo(t1.x / 2, 0);
        cc2.lineTo(t2.x, t2.y);
        cc2.lineTo(t3.x / 2, 0);
        cc2.closePath();
        cc2.stroke();

        cc2.beginPath();
        cc2.moveTo(t3.x / 2, 0);
        cc2.lineTo(t3.x / 2 + 25, 0);
        cc2.lineWidth = 5;
        cc2.closePath();
        cc2.stroke();

        let birdPosition: Vector = { x: (t3.x / 2 + 25) * 0.75, y: 0 };
        drawSittingBird(birdPosition);

        cc2.setTransform(transform);
    }

    function drawSittingBird(_position: Vector) {
        console.log("Sitting Bird");

        interface birdColor {
            bColor: string;
            hColor: string;
            eyeColor: string;
        }

        let color: birdColor[] = [
            {
                bColor: "#9e5124",
                hColor: "#9e4624",
                eyeColor: "#000"
            },
            {
                bColor: "#000",
                hColor: "#000",
                eyeColor: "#FFF"
            },
            {
                bColor: "#7e2c15",
                hColor: "#c5452b",
                eyeColor: "#FFF"
            },
            {
                bColor: "#7e2c15",
                hColor: "#c5452b",
                eyeColor: "#000"
            },
            {
                bColor: "#4cf000",
                hColor: "#277a00",
                eyeColor: "#000"
            },
            {
                bColor: "#6179ff",
                hColor: "#0023eb",
                eyeColor: "#000"
            },
            {
                bColor: "#c547ff",
                hColor: "#a400f0",
                eyeColor: "#000"
            },
            {
                bColor: "#9800a3",
                hColor: "#e400f5",
                eyeColor: "#000"
            },
            {
                bColor: "#ff6524",
                hColor: "#ffe733",
                eyeColor: "#000"
            },
            {
                bColor: "#41ff33",
                hColor: "#33ffa7",
                eyeColor: "#000"
            },
            {
                bColor: "#38f",
                hColor: "#33e0ff",
                eyeColor: "#000"
            },
            {
                bColor: "#da33ff",
                hColor: "#ff33f5",
                eyeColor: "#000"
            }
        ];
        let beakColor: string[] = ["#f2da21", "#f2a221", "#f26321", "#f41f1f", "#8f1d00", "#a84600", "#ffd11a"];
        let r1: number = 15;
        let randomColor: number = Math.floor(Math.random() * color.length);


        let transform: DOMMatrix = cc2.getTransform();
        //Draw Feet
        cc2.translate(_position.x, _position.y);
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
        cc2.fillStyle = color[randomColor].bColor;
        cc2.fill(bCircle);

        //drawHead
        cc2.translate(0, -r1);
        hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].hColor;
        cc2.fill(hCircle);
        //drawEye
        cc2.translate(-r1 / 2, -r1 * 0.1);
        eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].eyeColor;
        cc2.fill(eye);
        //drawEye
        cc2.translate(r1, 0);
        eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
        cc2.fillStyle = color[randomColor].eyeColor;
        cc2.fill(eye);

        //drawBeak
        cc2.setTransform(body);
        cc2.beginPath();
        cc2.moveTo(0, 0);
        cc2.lineTo(-5, -r1 * 0.8);
        cc2.lineTo(5, -r1 * 0.8);
        cc2.fillStyle = beakColor[Math.floor(Math.random() * beakColor.length)];
        cc2.closePath();
        cc2.fill();

        cc2.setTransform(transform);
    }

    function drawBirds(_nBirds: number) {
        console.log("draw BIRDS!");

        let ratio: number = Math.random();
        let nSitting: number = Math.floor(_nBirds * ratio);
        let nFlying: number = _nBirds - nSitting;

        for (let drawn: number = 0; drawn < nSitting; drawn++) {
            cc2.save();

            let maxWidth: number = 650;
            let minWidth: number = 100;
            let minHeight: number = 400;
            let maxHeight: number = 500;

            let x: number = randomBetween(minWidth, maxWidth);
            let y: number = randomBetween(minHeight, maxHeight);
            let scale: Vector = { x: (y / maxHeight), y: (y / maxHeight) };

            cc2.translate(x, y);
            cc2.scale(scale.x, scale.y);

            drawSittingBird({ x: 0, y: 0 });

            cc2.restore();

        }

        for (let drawn: number = 0; drawn < nFlying; drawn++) {
            cc2.save();

            let maxWidth: number = 740;
            let minWidth: number = 10;
            let minHeight: number = 0;
            let maxHeight: number = 225;

            let x: number = randomBetween(minWidth, maxWidth);
            let y: number = randomBetween(minHeight, maxHeight);
            let scale: Vector = { x: (y / maxHeight), y: (y / maxHeight) };

            cc2.translate(x, y);
            cc2.scale(scale.x, scale.y);

            drawFlyingBird({ x: 0, y: 0 });

            cc2.restore();

        }
    }

    function drawFlyingBird(_position: Vector) {
        console.log("Flying Bird");

        cc2.save();
        cc2.translate(_position.x, _position.y);

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

}