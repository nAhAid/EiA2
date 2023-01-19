namespace L11_Birdhouse {
    export interface Targetfield {
        minXValue: number;
        minYValue: number;
        maxXValue: number;
        maxYValue: number;
    }

    export let targets: Targetfield[] = [
        {
            minXValue: 100,
            minYValue: horizon,
            maxXValue: 600,
            maxYValue: 500
        },
        {
            minXValue: aviaryPos.x - 30,
            minYValue: aviaryPos.y - 30,
            maxXValue: aviaryPos.x + 30,
            maxYValue: aviaryPos.y + 30
        },
        {
            minXValue: cc2.canvas.width,
            minYValue: cc2.canvas.height,
            maxXValue: cc2.canvas.width,
            maxYValue: cc2.canvas.height
        },
        {
            minXValue: -cc2.canvas.width,
            minYValue: cc2.canvas.height,
            maxXValue: -cc2.canvas.width,
            maxYValue: cc2.canvas.height
        }
    ];
}