/*
Aufgabe: <L09.2_Birdhouse>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <15.12.2022>
Quellen: <W3Schools>
*/

namespace L10_Birdhouse {
    window.addEventListener("load", handleLoad);

    export let cc2: CanvasRenderingContext2D;
    export let golden: number = 0.62;
    export let imgData: ImageData;
    let posSnowflakes: Vector = new Vector(400, 175);



    let snowflakes: Snowflake[] = [];
    let flyingBirds: BirdOnFly[] = [];
    let sittingBirds: SitBird[] = [];

    function handleLoad(_event: Event): void {

        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawStatic();
        imgData = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);


        drawSnowflakes(50, posSnowflakes);
        drawBirds(20);

        window.setInterval(update, 20);
        window.setInterval(updateBird, 500);


    }

    function drawBirds(_nBirds: number) {

        let ratio: number = Math.random();
        let nSitting: number = Math.floor(_nBirds * ratio);
        let nFlying: number = _nBirds - nSitting;

        for (let drawn: number = 0; drawn < nSitting; drawn++) {
            cc2.save();

            let randomColor: number = Math.floor(Math.random() * color.length);
            let randomBeakColor: number = Math.floor(Math.random() * beakColor.length);

            let maxWidth: number = 650;
            let minWidth: number = 100;
            let minHeight: number = 400;
            let maxHeight: number = 500;

            let x: number = randomBetween(minWidth, maxWidth);
            let y: number = randomBetween(minHeight, maxHeight);
            let birdPos: Vector = new Vector(x, y);


            let sittingBird: SitBird = new SitBird(birdPos, color[randomColor], beakColor[randomBeakColor]);
            sittingBirds.push(sittingBird);
            sittingBird.draw();
            cc2.restore();

        }

        for (let drawn: number = 0; drawn < nFlying; drawn++) {
            cc2.save();

            let maxWidth: number = 740;
            let minWidth: number = 10;
            let minHeight: number = 0;
            let maxHeight: number = 225;

            let x: number = randomBetween(minWidth, maxWidth);
            let y: number = randomBetween(minHeight, maxHeight);
            let birdPos: Vector = new Vector(x, y);

            let flyingBird: BirdOnFly = new BirdOnFly(birdPos);
            flyingBirds.push(flyingBird);
            flyingBird.draw();

            cc2.restore();

        }
    }

    function update(): void {
        console.log("Update");
        cc2.putImageData(imgData, 0, 0);

        updateSnowflakes(posSnowflakes);
        updateBirdsOnFly();
        updateSittingBird(false);
    }

    function updateBird(): void {
        updateSittingBird(true);
    }

    function updateSittingBird(_update: boolean): void {
        if (_update == false) {
            for (let bird of sittingBirds) {
                bird.draw();
            }
        }
        if (_update == true) {
            for (let bird of sittingBirds) {
                bird.eat(1 / 100);
                bird.draw();
            }
        }

    }

    function updateBirdsOnFly(): void {
        for (let bird of flyingBirds) {
            cc2.save();

            bird.fly(1 / 50);
            bird.draw();
            cc2.restore();
        }
    }

    function updateSnowflakes(_position: Vector): void {
        let transform: DOMMatrix = cc2.getTransform();
        cc2.translate(_position.x, _position.y);

        for (let snow of snowflakes) {
            snow.letItSnow(1 / 100);
            snow.draw();

        }

        cc2.setTransform(transform);
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
    }

    export function randomBetween(_min: number, _max: number): number {
        let returnNumber: number = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }

    export let directions: string[] = ["x", "-x"];


}