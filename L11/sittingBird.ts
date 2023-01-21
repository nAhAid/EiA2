namespace L11_Birdhouse {
    export class SitBird extends Moveable {
        declare velocity: Vector;
        color: BirdColor;
        beakColor: string;
        scale: Vector;
        eating: boolean;
        frameIndex: number;
        hit: boolean = false;
        action: boolean;
        isFlying: boolean;
        target: Vector;
        distance: Vector = new Vector(0, 0);


        constructor(_position: Vector, _color: BirdColor, _beakColor: string) {

            super(_position);
            this.color = _color;
            this.beakColor = _beakColor;
            //this.scale = new Vector(0, 0);
            //this.scale.set(this.position.y / 500, this.position.y / 500);
            this.isFlying = this.checkPosition();
            this.frameIndex = randomBetween(0, 25);
            this.setFlying();
            //let values: boolean[] = [true, false];
            //this.action = values[Math.floor(Math.random() * values.length)];


        }

        isHit(_hotspot: Vector): boolean {
            let hitsize: number = 50;
            let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);

        }

        checkDistance(): void {
            let distanceX: number = this.target.x - this.position.x;
            let distanceY: number = this.target.y - this.position.y;
            let distance: Vector = new Vector(distanceX, distanceY);

            if (distanceX < this.distance.x && distanceY < this.distance.y) {
                this.velocity = this.newVelocity();
                this.distance = distance;

            }
            else {
                this.distance = distance;
            }

        }

        checkPosition(): boolean {
            let fly: boolean;
            //let values: boolean[] = [true, false];
            if (this.position.y >= horizon) {
                fly = false;
                //values[Math.floor(Math.random() * values.length)];
                return fly;
            }

            else {
                fly = true;
                return fly;
            }
        }

        setFlying(): void {
            if (this.isFlying == true) {
                this.target = this.getTarget();
                this.velocity = this.newVelocity();
            }

            else {
                let stop: Vector = new Vector(0, 0);
                this.velocity = stop.copy();
                this.target = stop.copy();
                let values: boolean[] = [true, false];
                this.eating = values[Math.floor(Math.random() * values.length)];
                this.waitForNewDestination();
            }
        }

        waitForNewDestination(): void {
            let time: number = randomBetween(5000, 10000);
            window.setTimeout(this.newDestination, time);
        }

        newDestination = (): void => {
            this.target = this.getTarget();
            this.velocity = this.newVelocity();
            this.isFlying = true;
        }

        handleReachTarget(): void {
            this.velocity = new Vector(0, 0);
            this.target = new Vector(0, 0);
            this.waitForNewDestination();
        }

        checkTargetDistance(): Boolean | void {
            let distanceX: number = this.target.x - this.position.x;
            let distanceY: number = this.target.y - this.position.y;

            if (distanceX < 5 && distanceY < 5) {
                this.isFlying = false;
                this.action = false;
                this.handleReachTarget();
                return true;
            }

            else {
                return false;
            }
        }

        newVelocity(): Vector {
            let x: number = this.target.x - this.position.x;
            let y: number = this.target.y - this.position.y;

            let newVelocity: Vector = new Vector(x, y);
            return newVelocity.copy();
        }

        getTarget(_position?: Vector): Vector {
            let target: Targetfield = targets[Math.floor(Math.random() * targets.length)];
            let targetVector: Vector = new Vector(randomBetween(target.minXValue, target.maxXValue), randomBetween(target.minYValue, target.maxYValue));

            return targetVector.copy();
        }



        checkState(): Boolean | void {
            if (!this.isFlying) {
                this.action = false;
            }

            else if (this.isFlying == true) {
                this.action = true;
                this.frameIndex = 25;
            }
        }

        checkUpdate(): Boolean | void {
            if (this.frameIndex < 25) {
                this.frameIndex++;
                return false;
            }
            if (this.frameIndex == 25) {
                this.frameIndex = 0;
                return true;
            }
        }

        draw(): void {
            let saveTransform: DOMMatrix = cc2.getTransform();
            if (this.action == false) {
                if (this.eating != true) {
                    let r1: number = 15;
                    let transform: DOMMatrix = cc2.getTransform();

                    //cc2.scale(this.scale.x, this.scale.y);

                    //Draw Feet
                    cc2.translate(this.position.x, this.position.y);
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
                    cc2.fillStyle = this.color.bColor;
                    cc2.fill(bCircle);

                    //drawHead
                    cc2.translate(0, -r1);
                    hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                    cc2.fillStyle = this.color.hColor;
                    cc2.fill(hCircle);
                    //drawEye
                    cc2.translate(-r1 / 2, -r1 * 0.1);
                    eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                    cc2.fillStyle = this.color.eyeColor;
                    cc2.fill(eye);
                    //drawEye
                    cc2.translate(r1, 0);
                    eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                    cc2.fillStyle = this.color.eyeColor;
                    cc2.fill(eye);

                    //drawBeak
                    cc2.setTransform(body);
                    cc2.beginPath();
                    cc2.moveTo(0, 0);
                    cc2.lineTo(-5, -r1 * 0.8);
                    cc2.lineTo(5, -r1 * 0.8);
                    cc2.fillStyle = this.beakColor;
                    cc2.closePath();
                    cc2.fill();

                    cc2.setTransform(transform);
                }

                if (this.eating == true) {
                    let r1: number = 15;
                    let transform: DOMMatrix = cc2.getTransform();

                    //cc2.scale(this.scale.x, this.scale.y);

                    //Draw Feet
                    cc2.translate(this.position.x, this.position.y);
                    let position: DOMMatrix = cc2.getTransform();

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

                    let bCircle: Path2D = new Path2D;
                    let hCircle: Path2D = new Path2D;

                    //drawBody
                    bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                    cc2.fillStyle = this.color.bColor;
                    cc2.fill(bCircle);

                    cc2.setTransform(position);
                    //drawBeak
                    cc2.translate(0, 5);
                    cc2.beginPath();
                    cc2.moveTo(0, 0);
                    cc2.lineTo(-5, -r1 * 0.8);
                    cc2.lineTo(5, -r1 * 0.8);
                    cc2.fillStyle = this.beakColor;
                    cc2.closePath();
                    cc2.fill();

                    cc2.setTransform(position);
                    cc2.translate(0, -25 / 2);

                    //drawHead
                    hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                    cc2.fillStyle = this.color.hColor;
                    cc2.fill(hCircle);

                    cc2.setTransform(transform);
                }
            }

            if (this.action == true && this.velocity.x > 0) {
                let r1: number = 15;
                let r2: number = r1 * 0.8;
                let bCircle: Path2D = new Path2D;
                let hCircle: Path2D = new Path2D;
                let eye: Path2D = new Path2D;

                let transform: DOMMatrix = cc2.getTransform();
                cc2.translate(this.position.x, this.position.y);
                let body: DOMMatrix = cc2.getTransform();
                cc2.translate(r1, -r1);
                cc2.save();

                //Draw Beak
                cc2.beginPath();
                cc2.save();
                cc2.translate(r2, 0);
                cc2.moveTo(0, 0);
                cc2.lineTo(r2 / 2, r2 * 0.8);
                cc2.lineTo(-r2, r2 * 0.7);
                cc2.fillStyle = this.beakColor;
                cc2.closePath();
                cc2.fill();

                cc2.restore();

                //Draw Body
                cc2.beginPath();
                cc2.setTransform(body);
                cc2.save();
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.bColor;
                cc2.fill(bCircle);
                cc2.closePath();

                //Draw Head
                cc2.beginPath();
                cc2.save();
                cc2.translate(r1, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.hColor;
                cc2.fill(hCircle);
                cc2.closePath();

                // Draw Eye
                cc2.save();
                cc2.translate(r2 / 3, -r2 / 4);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.eyeColor;
                cc2.fill(eye);

                //Draw Wing
                cc2.setTransform(body);
                cc2.save();
                cc2.scale(1.7, 1.7);
                cc2.beginPath();
                cc2.moveTo(0, 0);
                cc2.bezierCurveTo(r1 / 4, 0, r1 / 2, -r1 / 2, -r1 * 0.2, -r1 / 2);
                cc2.lineTo(-r1 * 1.5, -r1);
                cc2.bezierCurveTo(-r1, -r1 * 0.8, -r1 * 0.7, 0, 0, 0);
                cc2.fillStyle = this.color.hColor;
                cc2.closePath();
                cc2.fill();
                cc2.setTransform(transform);
            }

            if (this.action == true && this.velocity.x <= 0) {
                let r1: number = 15;
                let r2: number = r1 * 0.8;
                let bCircle: Path2D = new Path2D;
                let hCircle: Path2D = new Path2D;
                let eye: Path2D = new Path2D;

                let transform: DOMMatrix = cc2.getTransform();

                cc2.translate(this.position.x, this.position.y);
                cc2.scale(-1, 1);
                let body: DOMMatrix = cc2.getTransform();

                cc2.translate(r1, -r1);
                cc2.save();

                //Draw Beak
                cc2.beginPath();
                cc2.save();
                cc2.translate(r2, 0);
                cc2.moveTo(0, 0);
                cc2.lineTo(r2 / 2, r2 * 0.8);
                cc2.lineTo(-r2, r2 * 0.7);
                cc2.fillStyle = this.beakColor;
                cc2.closePath();
                cc2.fill();

                cc2.restore();

                //Draw Body
                cc2.beginPath();
                cc2.setTransform(body);
                cc2.save();
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.bColor;
                cc2.fill(bCircle);
                cc2.closePath();

                //Draw Head
                cc2.beginPath();
                cc2.save();
                cc2.translate(r1, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.hColor;
                cc2.fill(hCircle);
                cc2.closePath();

                // Draw Eye
                cc2.save();
                cc2.translate(r2 / 3, -r2 / 4);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                cc2.fillStyle = this.color.eyeColor;
                cc2.fill(eye);

                //Draw Wing
                cc2.setTransform(body);
                cc2.save();
                cc2.scale(1.7, 1.7);
                cc2.beginPath();
                cc2.moveTo(0, 0);
                cc2.bezierCurveTo(r1 / 4, 0, r1 / 2, -r1 / 2, -r1 * 0.2, -r1 / 2);
                cc2.lineTo(-r1 * 1.5, -r1);
                cc2.bezierCurveTo(-r1, -r1 * 0.8, -r1 * 0.7, 0, 0, 0);
                cc2.fillStyle = this.color.hColor;
                cc2.closePath();
                cc2.fill();
                cc2.setTransform(transform);
            }

            cc2.setTransform(saveTransform);

        }

        eat(_timeslice: number): void {

            this.eating = !this.eating;
        }

        fly(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
}