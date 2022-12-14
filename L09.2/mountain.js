"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class Mountain {
        position;
        colorLow;
        colorHigh;
        min;
        max;
        constructor(_postion, _colorLow, _colorHigh, _min, _max) {
            this.position = _postion;
            this.colorLow = _colorLow;
            this.colorHigh = _colorHigh;
            this.min = _min;
            this.max = _max;
        }
        draw() {
            let stepMin = 50;
            let stepMax = 150;
            let x = 0;
            console.log("Draw Mountain");
            L09_Birdhouse.cc2.save();
            L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L09_Birdhouse.cc2.beginPath();
            L09_Birdhouse.cc2.moveTo(0, 0);
            L09_Birdhouse.cc2.lineTo(0, -this.max);
            do {
                x += stepMin + L09_Birdhouse.randomBetween(stepMin, stepMax);
                let y = -this.min - L09_Birdhouse.randomBetween(this.min, this.max);
                L09_Birdhouse.cc2.lineTo(x, y);
            } while (x < L09_Birdhouse.cc2.canvas.width);
            L09_Birdhouse.cc2.lineTo(x, 0);
            L09_Birdhouse.cc2.closePath();
            let gradient = L09_Birdhouse.cc2.createLinearGradient(0, 0, 0, -this.max);
            gradient.addColorStop(0, this.colorLow);
            gradient.addColorStop(0.7, this.colorHigh);
            gradient.addColorStop(1, "#FFFFFF");
            L09_Birdhouse.cc2.fillStyle = gradient;
            L09_Birdhouse.cc2.fill();
            L09_Birdhouse.cc2.restore();
        }
    }
    L09_Birdhouse.Mountain = Mountain;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=mountain.js.map