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
            minYValue: horizon + 30,
            maxXValue: 600,
            maxYValue: 500
        },
        {
            minXValue: 335,
            minYValue: 430,
            maxXValue: 400,
            maxYValue: 500
        },
        {
            minXValue: cc2.canvas.width,
            minYValue: cc2.canvas.height,
            maxXValue: cc2.canvas.width + 10,
            maxYValue: cc2.canvas.height + 10
        },
        {
            minXValue: -cc2.canvas.width,
            minYValue: cc2.canvas.height,
            maxXValue: -cc2.canvas.width -   10,
            maxYValue: cc2.canvas.height + 10
        }
    ];
}