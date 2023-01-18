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
            minXValue: aviaryPos.x - 50,
            minYValue: aviaryPos.y - 50,
            maxXValue: aviaryPos.x + 50,
            maxYValue: aviaryPos.y + 50
        },
        {
            minXValue: cc2.canvas.width,
            minYValue: cc2.canvas.height,
            maxXValue: cc2.canvas.width,
            maxYValue: cc2.canvas.height
        },
        {
            minXValue: -cc2.canvas.width + 10,
            minYValue: cc2.canvas.height + 10,
            maxXValue: -cc2.canvas.width + 30,
            maxYValue: cc2.canvas.height + 10
        }
    ];
}