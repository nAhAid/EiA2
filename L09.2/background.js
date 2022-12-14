"use strict";
var L09_Birdhouse;
(function (L09_Birdhouse) {
    class Background {
        position;
        constructor(_position) {
            this.position = _position;
        }
        draw() {
            let gradient = L09_Birdhouse.cc2.createLinearGradient(0, 0, 0, L09_Birdhouse.cc2.canvas.height);
            gradient.addColorStop(0, "lightblue");
            gradient.addColorStop(L09_Birdhouse.golden, "white");
            gradient.addColorStop(1, "HSLA(122, 11%, 79%, 1)");
            L09_Birdhouse.cc2.fillStyle = gradient;
            L09_Birdhouse.cc2.fillRect(0, 0, L09_Birdhouse.cc2.canvas.width, L09_Birdhouse.cc2.canvas.height);
            let r1 = 20;
            let r2 = 150;
            let gradientSun = L09_Birdhouse.cc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradientSun.addColorStop(0, "HSLA(60, 100%, 90%, 1)");
            gradientSun.addColorStop(1, "HSLA(60, 0%, 90%, 0)");
            L09_Birdhouse.cc2.save();
            L09_Birdhouse.cc2.translate(this.position.x, this.position.y);
            L09_Birdhouse.cc2.fillStyle = gradientSun;
            L09_Birdhouse.cc2.arc(0, 0, r2, 0, 2 * Math.PI);
            L09_Birdhouse.cc2.fill();
            L09_Birdhouse.cc2.restore();
        }
    }
    L09_Birdhouse.Background = Background;
})(L09_Birdhouse || (L09_Birdhouse = {}));
//# sourceMappingURL=background.js.map