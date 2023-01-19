"use strict";
var L11_Birdhouse;
(function (L11_Birdhouse) {
    L11_Birdhouse.targets = [
        {
            minXValue: 100,
            minYValue: L11_Birdhouse.horizon,
            maxXValue: 600,
            maxYValue: 500
        },
        {
            minXValue: L11_Birdhouse.aviaryPos.x - 30,
            minYValue: L11_Birdhouse.aviaryPos.y - 30,
            maxXValue: L11_Birdhouse.aviaryPos.x + 30,
            maxYValue: L11_Birdhouse.aviaryPos.y + 30
        },
        {
            minXValue: L11_Birdhouse.cc2.canvas.width,
            minYValue: L11_Birdhouse.cc2.canvas.height,
            maxXValue: L11_Birdhouse.cc2.canvas.width,
            maxYValue: L11_Birdhouse.cc2.canvas.height
        },
        {
            minXValue: -L11_Birdhouse.cc2.canvas.width,
            minYValue: L11_Birdhouse.cc2.canvas.height,
            maxXValue: -L11_Birdhouse.cc2.canvas.width,
            maxYValue: L11_Birdhouse.cc2.canvas.height
        }
    ];
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=targets.js.map