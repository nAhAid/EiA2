namespace L11_Birdhouse {

    
    export function drawStatic(): void {
        

        let sunPosition: Vector = new Vector(75, 100);
        let positionMountain: Vector = new Vector(0, horizon);
        let cloudPos: Vector = new Vector(550, 150);
        let cloudSize: Vector = new Vector(325, 125);
        let treeMaxScale: Vector = new Vector(0.5, 0.5);
        let snowmanPos: Vector = new Vector(randomBetween(10, 325), 425);
        let aviaryPos: Vector = new Vector(randomBetween(335, 700), 450);

        drawBackground();
        drawSun(sunPosition);
        drawMountains(positionMountain, 50, 135, "#6B7A7D", "#E6FEFE");
        drawMountains(positionMountain, 35, 85, "#7c8d8a", "#c5d8d5");
        drawCloud(cloudPos, cloudSize, 40, 60);
        drawTrees(5, positionMountain, treeMaxScale);
        drawSnowman(snowmanPos);
        drawAviary(aviaryPos, 1);
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
    function drawTrees(_nTrees: number, _position: Vector, _maxScale: Vector): void {
        let transform: DOMMatrix = cc2.getTransform();


        cc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < _nTrees; drawn++) {
            let x: number = randomBetween(0, 750);
            let y: number = randomBetween(10, 30);
            let scale: Vector = new Vector(y / 50, y / 50);

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

    function drawSnowman(_position: Vector) {
        let r1: number = 60;
        let r2: number = r1 * 0.8;
        let r3: number = r2 * 0.8;

        let x1: Vector = new Vector(0, r1);
        let x2: Vector = new Vector(0, r1 * 0.75);
        let x3: Vector = new Vector(0, r2);

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
        let t1: Vector = new Vector(-45, 30);
        let t2: Vector = new Vector(0, -30);
        let t3: Vector = new Vector(45, 30);


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

        //let birdPosition: Vector = new Vector((t3.x / 2 + 25) * 0.75, 0);
        //drawSittingBird(birdPosition);

        cc2.setTransform(transform);
    }



}
