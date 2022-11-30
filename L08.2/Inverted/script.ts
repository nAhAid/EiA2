namespace L08_2_valley {
    interface Vector {
        x: number;
        y: number;
    }

    let cc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    window.addEventListener("load", handleLoad);

    function handleLoad() {
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = cc2.canvas.height * golden;
        let streetWidthBack: number = 100;
        let streetWidthFront: number = 600;
        let treesOffsetBack: number = 15;
        let treesOffsetFront: number = 100;
        let posStreet: Vector = { x: cc2.canvas.width / 2, y: horizon };
        
        let posTreesStart: Vector = { x: posStreet.x - streetWidthBack / 2 - treesOffsetBack, y: horizon };
        let posTreesEnd: Vector = { x: cc2.canvas.width / 2 - streetWidthFront / 2 - treesOffsetFront, y: cc2.canvas.height };

        drawBackground();
        drawSun({ x: 100, y: 75 });
        drawCloud({ x: 500, y: 125 }, { x: 250, y: 75 });
        drawStreet({ x: 400, y: 600 }, streetWidthBack, streetWidthFront);
        drawMountains({ x: 0, y: cc2.canvas.height * golden }, 80, 200, "#6B7A7D", "#E6FEFE");
        drawMountains({ x: 0, y: cc2.canvas.height * golden }, 50, 130, "#697F77", "#ACB2B2");
        drawMountains({ x: 0, y: cc2.canvas.height * golden }, 10, 80, "#4F6359", "#A0A5A5");
        drawTrees(8, posTreesStart, posTreesEnd, 0.1, 0.37, 1.4);
        posTreesStart.x = posStreet.x + streetWidthBack / 2 + treesOffsetBack;
        posTreesEnd.x = posTreesEnd.x + streetWidthFront + 2 * treesOffsetFront;
        drawTrees(8, posTreesStart, posTreesEnd, 0.1, 0.37, 1.4);

    }


    function drawBackground(): void {
        let gradient: CanvasGradient = cc2.createLinearGradient(0, 0, 0, cc2.canvas.height);
        gradient.addColorStop(0, "lightblue");
        gradient.addColorStop(golden, "white");
        gradient.addColorStop(1, "HSL(100, 80%, 30%)");

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

    function drawCloud(_position: Vector, _size: Vector): void {
        console.log("Cloud");

        let nParticles: number = 40;
        let radiusParticle: number = 40;

        let particle: Path2D = new Path2D();
        let gradient: CanvasGradient = cc2.createRadialGradient(0, 0, 0, 0, 0, radiusParticle);

        particle.arc(0, 0, radiusParticle, 0, 2 * Math.PI);
        gradient.addColorStop(0, "HSLA(0, 100%, 100%, 0.5)");
        gradient.addColorStop(1, "HSLA(0, 100%, 100%, 0)");

        cc2.save();
        cc2.translate(_position.x, _position.y);

        cc2.fillStyle = gradient;

        for (let drawn: number = 0; drawn < nParticles; drawn++) {
            let x: number = (Math.random() - 0.5) * _size.x;
            let y: number = - (Math.random() * _size.y);
            cc2.save();
            cc2.translate(x, y);
            cc2.fill(particle);
            cc2.restore();
        }

        cc2.restore();

    }

    function drawStreet(_position: Vector, _widthBack: number, _widthFront: number): void {
        cc2.resetTransform();

        let gradient: CanvasGradient = cc2.createLinearGradient(_position.x, _position.y, _position.x, cc2.canvas.height * golden);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(0.99, "darkgrey");
        gradient.addColorStop(1, "white");

        cc2.beginPath();
        cc2.moveTo(_position.x, _position.y);
        cc2.lineTo(_position.x - _widthFront / 2, _position.y);
        cc2.lineTo(_position.x - _widthBack / 2, (cc2.canvas.height * golden));
        cc2.lineTo(_position.x + _widthBack / 2, (cc2.canvas.height * golden));
        cc2.lineTo(_position.x + _widthFront / 2, _position.y);
        cc2.fillStyle = gradient;
        cc2.closePath();
        cc2.fill();

    }

    function drawMountains(_position: Vector, _min: number, _max: number, _colorLow: string, _colorHigh: string): void {
        console.log("Mountains");
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
            //Math.random() * (stepMax - stepMin);
            let y: number = -_min - randomBetween(_min, _max);
            //Math.random() * (_max - _min);

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


    function drawTrees(_nTrees: number, _posStart: Vector, _posEnd: Vector, _minScale: number, _stepPos: number, _stepScale: number): void {
        console.log("Trees", _posStart, _posEnd);
        let transform: DOMMatrix = cc2.getTransform();
        let step: Vector = {
            x: (_posEnd.x - _posStart.x) * _stepPos,
            y: (_posEnd.y - _posStart.y) * _stepPos
        };

        cc2.translate(_posStart.x, _posStart.y);
        cc2.scale(_minScale, _minScale);

        do {
            drawTree();

            cc2.translate(step.x, step.y);
            cc2.scale(_stepScale, _stepScale);

        } while (--_nTrees > 0);

        cc2.setTransform(transform);
    }

    function drawTree(): void {
        console.log("Tree");
        let nBranches: number = 50;
        let maxRadius: number = 60;
        let branch: Path2D = new Path2D();
        branch.arc(0, 0, maxRadius, 0, 2 * Math.PI);

        cc2.fillStyle = "brown";
        cc2.fillRect(0, 0, 20, -200);

        cc2.save();
        cc2.translate(0, -120);

        do {
            let y: number = Math.random() * 350;
            let size: number = 1 - y / 700;
            let x: number = (Math.random() - 0.5) * 2 * maxRadius;

            cc2.save();
            cc2.translate(0, -y);
            cc2.scale(size, size);
            cc2.translate(x, 0);

            let colorAngle: number = 120 - Math.random() * 60;
            let color: string = "HSLA(" + colorAngle + ", 50%, 30%, 0.5)";

            cc2.fillStyle = color;
            cc2.fill(branch);

            cc2.restore();
        } while (--nBranches > 0);
        cc2.restore();
    }

}