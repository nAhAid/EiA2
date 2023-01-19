"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    class SitBird extends L11_Birdhouse.Moveable {
        color;
        beakColor;
        scale;
        eating;
        frameIndex;
        hit = false;
        action;
        isFlying;
        target;
        constructor(_position, _color, _beakColor) {
            super(_position);
            this.color = _color;
            this.beakColor = _beakColor;
            //this.scale = new Vector(0, 0);
            //this.scale.set(this.position.y / 500, this.position.y / 500);
            this.isFlying = this.checkPosition();
            this.frameIndex = L11_Birdhouse.randomBetween(0, 25);
            this.setFlying();
        }
        isHit(_hotspot) {
            let hitsize = 50;
            let difference = new L11_Birdhouse.Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
        checkPosition() {
            let fly;
            //let values: boolean[] = [true, false];
            if (this.position.y >= L11_Birdhouse.horizon) {
                fly = false;
                //values[Math.floor(Math.random() * values.length)];
                return fly;
            }
            else {
                fly = true;
                return fly;
            }
            return false;
        }
        setFlying() {
            if (this.isFlying == true) {
                this.target = this.newTarget();
                this.velocity = this.newVelocity();
            }
            else {
                let stop = new L11_Birdhouse.Vector(0, 0);
                this.velocity = stop.copy();
                this.target = stop.copy();
                let values = [true, false];
                this.eating = values[Math.floor(Math.random() * values.length)];
            }
        }
        waitForNewDestination() {
            let intervall = L11_Birdhouse.randomBetween(500000, 10000000);
            window.setInterval(this.newDestination, intervall);
        }
        newDestination() {
            this.target = this.newTarget();
            this.velocity = this.newVelocity();
            this.isFlying = true;
        }
        handleReachTarget() {
            this.velocity = new L11_Birdhouse.Vector(0, 0);
            this.target = new L11_Birdhouse.Vector(0, 0);
            this.action = false;
            this.waitForNewDestination();
        }
        checkTargetDistance() {
            let distanceX = this.target.x - this.position.x;
            let distanceY = this.target.y - this.position.y;
            if (distanceX < 20 && distanceY < 20) {
                this.isFlying = false;
                this.handleReachTarget();
                return true;
            }
            else {
                return false;
            }
        }
        newVelocity() {
            let x = this.target.x - this.position.x;
            let y = this.target.y - this.position.y;
            let newVelocity = new L11_Birdhouse.Vector(x, y);
            return newVelocity;
        }
        newTarget() {
            let target = L11_Birdhouse.targets[Math.floor(Math.random() * L11_Birdhouse.targets.length)];
            let targetVector = new L11_Birdhouse.Vector(L11_Birdhouse.randomBetween(target.minXValue, target.maxXValue), L11_Birdhouse.randomBetween(target.minYValue, target.maxYValue));
            return targetVector;
        }
        checkState() {
            if (!this.isFlying) {
                this.action = false;
            }
            else if (this.isFlying == true) {
                this.action = true;
                this.frameIndex = 25;
            }
        }
        checkUpdate() {
            if (this.frameIndex < 25) {
                this.frameIndex++;
                return false;
            }
            if (this.frameIndex == 25) {
                this.frameIndex = 0;
                return true;
            }
        }
        draw() {
            let saveTransform = L11_Birdhouse.cc2.getTransform();
            if (this.action == false) {
                if (this.eating != true) {
                    let r1 = 15;
                    let transform = L11_Birdhouse.cc2.getTransform();
                    //cc2.scale(this.scale.x, this.scale.y);
                    //Draw Feet
                    L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
                    L11_Birdhouse.cc2.beginPath();
                    L11_Birdhouse.cc2.moveTo(-10, 10);
                    L11_Birdhouse.cc2.lineTo(-5, 0);
                    L11_Birdhouse.cc2.lineTo(0, 10);
                    L11_Birdhouse.cc2.lineTo(5, 0);
                    L11_Birdhouse.cc2.lineTo(10, 10);
                    L11_Birdhouse.cc2.moveTo(0, 10);
                    L11_Birdhouse.cc2.strokeStyle = "#000";
                    L11_Birdhouse.cc2.lineWidth = 2;
                    L11_Birdhouse.cc2.closePath();
                    L11_Birdhouse.cc2.stroke();
                    //Draw Legs
                    let leg = new Path2D();
                    leg.moveTo(0, 0);
                    leg.lineTo(0, -20);
                    L11_Birdhouse.cc2.save();
                    L11_Birdhouse.cc2.translate(-5, 0);
                    L11_Birdhouse.cc2.stroke(leg);
                    L11_Birdhouse.cc2.translate(10, 0);
                    L11_Birdhouse.cc2.stroke(leg);
                    L11_Birdhouse.cc2.restore();
                    L11_Birdhouse.cc2.translate(0, -25);
                    let body = L11_Birdhouse.cc2.getTransform();
                    let bCircle = new Path2D;
                    let hCircle = new Path2D;
                    let eye = new Path2D;
                    //drawBody
                    bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.bColor;
                    L11_Birdhouse.cc2.fill(bCircle);
                    //drawHead
                    L11_Birdhouse.cc2.translate(0, -r1);
                    hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                    L11_Birdhouse.cc2.fill(hCircle);
                    //drawEye
                    L11_Birdhouse.cc2.translate(-r1 / 2, -r1 * 0.1);
                    eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                    L11_Birdhouse.cc2.fill(eye);
                    //drawEye
                    L11_Birdhouse.cc2.translate(r1, 0);
                    eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                    L11_Birdhouse.cc2.fill(eye);
                    //drawBeak
                    L11_Birdhouse.cc2.setTransform(body);
                    L11_Birdhouse.cc2.beginPath();
                    L11_Birdhouse.cc2.moveTo(0, 0);
                    L11_Birdhouse.cc2.lineTo(-5, -r1 * 0.8);
                    L11_Birdhouse.cc2.lineTo(5, -r1 * 0.8);
                    L11_Birdhouse.cc2.fillStyle = this.beakColor;
                    L11_Birdhouse.cc2.closePath();
                    L11_Birdhouse.cc2.fill();
                    L11_Birdhouse.cc2.setTransform(transform);
                }
                if (this.eating == true) {
                    let r1 = 15;
                    let transform = L11_Birdhouse.cc2.getTransform();
                    //cc2.scale(this.scale.x, this.scale.y);
                    //Draw Feet
                    L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
                    let position = L11_Birdhouse.cc2.getTransform();
                    L11_Birdhouse.cc2.beginPath();
                    L11_Birdhouse.cc2.moveTo(-10, 10);
                    L11_Birdhouse.cc2.lineTo(-5, 0);
                    L11_Birdhouse.cc2.lineTo(0, 10);
                    L11_Birdhouse.cc2.lineTo(5, 0);
                    L11_Birdhouse.cc2.lineTo(10, 10);
                    L11_Birdhouse.cc2.moveTo(0, 10);
                    L11_Birdhouse.cc2.strokeStyle = "#000";
                    L11_Birdhouse.cc2.lineWidth = 2;
                    L11_Birdhouse.cc2.closePath();
                    L11_Birdhouse.cc2.stroke();
                    //Draw Legs
                    let leg = new Path2D();
                    leg.moveTo(0, 0);
                    leg.lineTo(0, -20);
                    L11_Birdhouse.cc2.save();
                    L11_Birdhouse.cc2.translate(-5, 0);
                    L11_Birdhouse.cc2.stroke(leg);
                    L11_Birdhouse.cc2.translate(10, 0);
                    L11_Birdhouse.cc2.stroke(leg);
                    L11_Birdhouse.cc2.restore();
                    L11_Birdhouse.cc2.translate(0, -25);
                    let bCircle = new Path2D;
                    let hCircle = new Path2D;
                    //drawBody
                    bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.bColor;
                    L11_Birdhouse.cc2.fill(bCircle);
                    L11_Birdhouse.cc2.setTransform(position);
                    //drawBeak
                    L11_Birdhouse.cc2.translate(0, 5);
                    L11_Birdhouse.cc2.beginPath();
                    L11_Birdhouse.cc2.moveTo(0, 0);
                    L11_Birdhouse.cc2.lineTo(-5, -r1 * 0.8);
                    L11_Birdhouse.cc2.lineTo(5, -r1 * 0.8);
                    L11_Birdhouse.cc2.fillStyle = this.beakColor;
                    L11_Birdhouse.cc2.closePath();
                    L11_Birdhouse.cc2.fill();
                    L11_Birdhouse.cc2.setTransform(position);
                    L11_Birdhouse.cc2.translate(0, -25 / 2);
                    //drawHead
                    hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                    L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                    L11_Birdhouse.cc2.fill(hCircle);
                    L11_Birdhouse.cc2.setTransform(transform);
                }
            }
            if (this.action == true && this.velocity.x > 0) {
                let r1 = 15;
                let r2 = r1 * 0.8;
                let bCircle = new Path2D;
                let hCircle = new Path2D;
                let eye = new Path2D;
                let transform = L11_Birdhouse.cc2.getTransform();
                L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
                let body = L11_Birdhouse.cc2.getTransform();
                L11_Birdhouse.cc2.translate(r1, -r1);
                L11_Birdhouse.cc2.save();
                //Draw Beak
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r2, 0);
                L11_Birdhouse.cc2.moveTo(0, 0);
                L11_Birdhouse.cc2.lineTo(r2 / 2, r2 * 0.8);
                L11_Birdhouse.cc2.lineTo(-r2, r2 * 0.7);
                L11_Birdhouse.cc2.fillStyle = this.beakColor;
                L11_Birdhouse.cc2.closePath();
                L11_Birdhouse.cc2.fill();
                L11_Birdhouse.cc2.restore();
                //Draw Body
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.setTransform(body);
                L11_Birdhouse.cc2.save();
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.bColor;
                L11_Birdhouse.cc2.fill(bCircle);
                L11_Birdhouse.cc2.closePath();
                //Draw Head
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r1, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                L11_Birdhouse.cc2.fill(hCircle);
                L11_Birdhouse.cc2.closePath();
                // Draw Eye
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r2 / 3, -r2 / 4);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                L11_Birdhouse.cc2.fill(eye);
                //Draw Wing
                L11_Birdhouse.cc2.setTransform(body);
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.scale(1.7, 1.7);
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.moveTo(0, 0);
                L11_Birdhouse.cc2.bezierCurveTo(r1 / 4, 0, r1 / 2, -r1 / 2, -r1 * 0.2, -r1 / 2);
                L11_Birdhouse.cc2.lineTo(-r1 * 1.5, -r1);
                L11_Birdhouse.cc2.bezierCurveTo(-r1, -r1 * 0.8, -r1 * 0.7, 0, 0, 0);
                L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                L11_Birdhouse.cc2.closePath();
                L11_Birdhouse.cc2.fill();
                L11_Birdhouse.cc2.setTransform(transform);
            }
            if (this.action == true && this.velocity.x <= 0) {
                let r1 = 15;
                let r2 = r1 * 0.8;
                let bCircle = new Path2D;
                let hCircle = new Path2D;
                let eye = new Path2D;
                let transform = L11_Birdhouse.cc2.getTransform();
                L11_Birdhouse.cc2.translate(this.position.x, this.position.y);
                L11_Birdhouse.cc2.rotate(180 * Math.PI / 180);
                let body = L11_Birdhouse.cc2.getTransform();
                L11_Birdhouse.cc2.translate(r1, -r1);
                L11_Birdhouse.cc2.save();
                //Draw Beak
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r2, 0);
                L11_Birdhouse.cc2.moveTo(0, 0);
                L11_Birdhouse.cc2.lineTo(r2 / 2, r2 * 0.8);
                L11_Birdhouse.cc2.lineTo(-r2, r2 * 0.7);
                L11_Birdhouse.cc2.fillStyle = this.beakColor;
                L11_Birdhouse.cc2.closePath();
                L11_Birdhouse.cc2.fill();
                L11_Birdhouse.cc2.restore();
                //Draw Body
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.setTransform(body);
                L11_Birdhouse.cc2.save();
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.bColor;
                L11_Birdhouse.cc2.fill(bCircle);
                L11_Birdhouse.cc2.closePath();
                //Draw Head
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r1, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                L11_Birdhouse.cc2.fill(hCircle);
                L11_Birdhouse.cc2.closePath();
                // Draw Eye
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.translate(r2 / 3, -r2 / 4);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                L11_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                L11_Birdhouse.cc2.fill(eye);
                //Draw Wing
                L11_Birdhouse.cc2.setTransform(body);
                L11_Birdhouse.cc2.save();
                L11_Birdhouse.cc2.scale(1.7, 1.7);
                L11_Birdhouse.cc2.beginPath();
                L11_Birdhouse.cc2.moveTo(0, 0);
                L11_Birdhouse.cc2.bezierCurveTo(r1 / 4, 0, r1 / 2, -r1 / 2, -r1 * 0.2, -r1 / 2);
                L11_Birdhouse.cc2.lineTo(-r1 * 1.5, -r1);
                L11_Birdhouse.cc2.bezierCurveTo(-r1, -r1 * 0.8, -r1 * 0.7, 0, 0, 0);
                L11_Birdhouse.cc2.fillStyle = this.color.hColor;
                L11_Birdhouse.cc2.closePath();
                L11_Birdhouse.cc2.fill();
                L11_Birdhouse.cc2.setTransform(transform);
            }
            L11_Birdhouse.cc2.setTransform(saveTransform);
        }
        eat(_timeslice) {
            this.eating = !this.eating;
        }
        fly(_timeslice) {
            let offset = new L11_Birdhouse.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    L11_Birdhouse.SitBird = SitBird;
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=sittingBird.js.map