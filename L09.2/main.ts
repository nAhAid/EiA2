namespace L09_Birdhouse {
    window.addEventListener("load", handleLoad);

    export let cc2: CanvasRenderingContext2D;
    export let golden: number = 0.62;
    export let imgData: ImageData;
    let posSnowflakes: Vector = new Vector(400, 175);

    let snowflakes: Snowflake[] = [];

    function handleLoad(_event: Event): void {
        console.log("load");

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawStatic();
        imgData = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);


        drawSnowflakes(50, posSnowflakes);



    }

    function drawSnowflakes(_nFlakes: number, _position: Vector) {
        let transform: DOMMatrix = cc2.getTransform();

        cc2.translate(_position.x, _position.y);

        for (let drawn: number = 0; drawn < _nFlakes; drawn++) {
            cc2.save();
            let pos: Vector = new Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size: Vector = new Vector(10, 10);

            let snowflake: Snowflake = new Snowflake(pos, size);
            snowflake.draw();
            snowflakes.push(snowflake);

            cc2.restore();

        }

        cc2.setTransform(transform);
        console.log(snowflakes);
    }

    export function randomBetween(_min: number, _max: number): number {
        let returnNumber: number = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }

}