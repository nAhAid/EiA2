namespace L09_Birdhouse {
    window.addEventListener("load", handleLoad);

    export let cc2: CanvasRenderingContext2D;
    export let golden: number = 0.62;
    

    function handleLoad(_event: Event): void {
        console.log("load");

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        let horizon: number = cc2.canvas.height * golden;
    
        let positionSun: Vector = new Vector(75, 100);
        let background: Background = new Background(positionSun);
        background.draw();

        let positionMountain: Vector = new Vector(0, horizon);
        let mountainFar: Mountain = new Mountain(positionMountain, "#6B7A7D", "#E6FEFE", 50, 135);
        let mountainNear: Mountain = new Mountain(positionMountain, "#7c8d8a", "#c5d8d5", 35, 85);
        mountainFar.draw();
        mountainNear.draw();



    }

    export function randomBetween(_min: number, _max: number) {
        let returnNumber: number = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }

}