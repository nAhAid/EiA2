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
            minXValue: L11_Birdhouse.aviaryPos.x - 50,
            minYValue: L11_Birdhouse.aviaryPos.y - 50,
            maxXValue: L11_Birdhouse.aviaryPos.x + 50,
            maxYValue: L11_Birdhouse.aviaryPos.y + 50
        },
        {
            minXValue: L11_Birdhouse.cc2.canvas.width,
            minYValue: L11_Birdhouse.cc2.canvas.height,
            maxXValue: L11_Birdhouse.cc2.canvas.width,
            maxYValue: L11_Birdhouse.cc2.canvas.height
        },
        {
            minXValue: -L11_Birdhouse.cc2.canvas.width + 10,
            minYValue: L11_Birdhouse.cc2.canvas.height + 10,
            maxXValue: -L11_Birdhouse.cc2.canvas.width + 30,
            maxYValue: L11_Birdhouse.cc2.canvas.height + 10
        }
    ];
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=targets.js.map