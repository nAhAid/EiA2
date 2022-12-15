"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class SitBird {
        position;
        velocity;
        color;
        beakColor;
        scale;
        eating;
        constructor(_position, _color, _beakColor) {
            this.position = _position;
            this.color = _color;
            this.beakColor = _beakColor;
            this.scale = new L09_Birdhouse.Vector(0, 0);
            this.scale.set(this.position.y / 500, this.position.y / 500);
            this.velocity = new L09_Birdhouse.Vector(0, 0);
            this.velocity.random(50, 100, L09_Birdhouse.directions[Math.floor(Math.random() * L09_Birdhouse.directions.length)]);
            let values = [true, false];
            this.eating = values[Math.floor(Math.random() * values.length)];
        }
        draw() {
            if (this.eating != true) {
                let r1 = 15;
                let transform = L09_Birdhouse.cc2.getTransform();
                L09_Birdhouse.cc2.scale(this.scale.x, this.scale.y);
                //Draw Feet
                L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
                L09_Birdhouse.cc2.beginPath();
                L09_Birdhouse.cc2.moveTo(-10, 10);
                L09_Birdhouse.cc2.lineTo(-5, 0);
                L09_Birdhouse.cc2.lineTo(0, 10);
                L09_Birdhouse.cc2.lineTo(5, 0);
                L09_Birdhouse.cc2.lineTo(10, 10);
                L09_Birdhouse.cc2.moveTo(0, 10);
                L09_Birdhouse.cc2.strokeStyle = "#000";
                L09_Birdhouse.cc2.lineWidth = 2;
                L09_Birdhouse.cc2.closePath();
                L09_Birdhouse.cc2.stroke();
                //Draw Legs
                let leg = new Path2D();
                leg.moveTo(0, 0);
                leg.lineTo(0, -20);
                L09_Birdhouse.cc2.save();
                L09_Birdhouse.cc2.translate(-5, 0);
                L09_Birdhouse.cc2.stroke(leg);
                L09_Birdhouse.cc2.translate(10, 0);
                L09_Birdhouse.cc2.stroke(leg);
                L09_Birdhouse.cc2.restore();
                L09_Birdhouse.cc2.translate(0, -25);
                let body = L09_Birdhouse.cc2.getTransform();
                let bCircle = new Path2D;
                let hCircle = new Path2D;
                let eye = new Path2D;
                //drawBody
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.bColor;
                L09_Birdhouse.cc2.fill(bCircle);
                //drawHead
                L09_Birdhouse.cc2.translate(0, -r1);
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.hColor;
                L09_Birdhouse.cc2.fill(hCircle);
                //drawEye
                L09_Birdhouse.cc2.translate(-r1 / 2, -r1 * 0.1);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                L09_Birdhouse.cc2.fill(eye);
                //drawEye
                L09_Birdhouse.cc2.translate(r1, 0);
                eye.arc(0, 0, r1 * 0.1, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.eyeColor;
                L09_Birdhouse.cc2.fill(eye);
                //drawBeak
                L09_Birdhouse.cc2.setTransform(body);
                L09_Birdhouse.cc2.beginPath();
                L09_Birdhouse.cc2.moveTo(0, 0);
                L09_Birdhouse.cc2.lineTo(-5, -r1 * 0.8);
                L09_Birdhouse.cc2.lineTo(5, -r1 * 0.8);
                L09_Birdhouse.cc2.fillStyle = this.beakColor;
                L09_Birdhouse.cc2.closePath();
                L09_Birdhouse.cc2.fill();
                L09_Birdhouse.cc2.setTransform(transform);
            }
            if (this.eating == true) {
                let r1 = 15;
                let transform = L09_Birdhouse.cc2.getTransform();
                L09_Birdhouse.cc2.scale(this.scale.x, this.scale.y);
                //Draw Feet
                L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
                let position = L09_Birdhouse.cc2.getTransform();
                L09_Birdhouse.cc2.beginPath();
                L09_Birdhouse.cc2.moveTo(-10, 10);
                L09_Birdhouse.cc2.lineTo(-5, 0);
                L09_Birdhouse.cc2.lineTo(0, 10);
                L09_Birdhouse.cc2.lineTo(5, 0);
                L09_Birdhouse.cc2.lineTo(10, 10);
                L09_Birdhouse.cc2.moveTo(0, 10);
                L09_Birdhouse.cc2.strokeStyle = "#000";
                L09_Birdhouse.cc2.lineWidth = 2;
                L09_Birdhouse.cc2.closePath();
                L09_Birdhouse.cc2.stroke();
                //Draw Legs
                let leg = new Path2D();
                leg.moveTo(0, 0);
                leg.lineTo(0, -20);
                L09_Birdhouse.cc2.save();
                L09_Birdhouse.cc2.translate(-5, 0);
                L09_Birdhouse.cc2.stroke(leg);
                L09_Birdhouse.cc2.translate(10, 0);
                L09_Birdhouse.cc2.stroke(leg);
                L09_Birdhouse.cc2.restore();
                L09_Birdhouse.cc2.translate(0, -25);
                let body = L09_Birdhouse.cc2.getTransform();
                let bCircle = new Path2D;
                let hCircle = new Path2D;
                //drawBody
                bCircle.arc(0, 0, r1, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.bColor;
                L09_Birdhouse.cc2.fill(bCircle);
                L09_Birdhouse.cc2.setTransform(position);
                //drawBeak
                L09_Birdhouse.cc2.translate(0, 5);
                L09_Birdhouse.cc2.beginPath();
                L09_Birdhouse.cc2.moveTo(0, 0);
                L09_Birdhouse.cc2.lineTo(-5, -r1 * 0.8);
                L09_Birdhouse.cc2.lineTo(5, -r1 * 0.8);
                L09_Birdhouse.cc2.fillStyle = this.beakColor;
                L09_Birdhouse.cc2.closePath();
                L09_Birdhouse.cc2.fill();
                L09_Birdhouse.cc2.setTransform(position);
                L09_Birdhouse.cc2.translate(0, -25 / 2);
                //drawHead
                hCircle.arc(0, 0, r1 * 0.8, 0, 2 * Math.PI);
                L09_Birdhouse.cc2.fillStyle = this.color.hColor;
                L09_Birdhouse.cc2.fill(hCircle);
                L09_Birdhouse.cc2.setTransform(transform);
            }
        }
        eat(_timeslice) {
            let offset = new L09_Birdhouse.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            this.eating = !this.eating;
            if (this.position.x > L09_Birdhouse.cc2.canvas.width)
                this.position.x -= L09_Birdhouse.cc2.canvas.width;
            if (this.position.x < 0)
                this.position.x += L09_Birdhouse.cc2.canvas.width;
        }
    }
    L09_Birdhouse.SitBird = SitBird;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=sittingBird.js.map