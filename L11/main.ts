/*
Aufgabe: <L10.2_Birdhouse>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <12.01.2023>
Quellen: </>
*/

namespace L11_Birdhouse {
    window.addEventListener("load", handleLoad);


    export let directions: string[] = ["x", "-x"];
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.querySelector("canvas");
    export let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D>canvas.getContext("2d");
    export let golden: number = 0.62;
    export let horizon: number = cc2.canvas.height * golden;
    export let imgData: ImageData;
    export let posSnowflakes: Vector = new Vector(400, 175);
    export let aviaryPos: Vector;

    let moveables: Moveable[] = [];

    function handleLoad(_event: Event): void {



        drawStatic();
        imgData = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        drawSnowflakes(50, posSnowflakes);
        drawBirds(10);

        window.setInterval(update, 20);
        //window.setInterval(updateBird, 500);


    }

    function drawBirds(_nBirds: number) {

        for (let drawn: number = 0; drawn < _nBirds; drawn++) {
            cc2.save();

            let randomColor: number = Math.floor(Math.random() * color.length);
            let randomBeakColor: number = Math.floor(Math.random() * beakColor.length);

            let maxWidth: number = 650;
            let minWidth: number = 100;
            let minHeight: number = 100;
            let maxHeight: number = 500;

            let x: number = randomBetween(minWidth, maxWidth);
            let y: number = randomBetween(minHeight, maxHeight);
            let birdPos: Vector = new Vector(x, y);
            //let flyBirdPos: Vector = new Vector(100, 200);

            if (y < horizon) {
                let velocity: Vector = new Vector(0, 0);
                velocity.random(100, 400, directions[Math.floor(Math.random() * directions.length)]);
                let sittingBird: SitBird = new SitBird(birdPos, color[randomColor], beakColor[randomBeakColor], velocity);
                moveables.push(sittingBird);
            
                cc2.save();
                sittingBird.draw();
                cc2.restore();
            }

            else {
                let sittingBird: SitBird = new SitBird(birdPos, color[randomColor], beakColor[randomBeakColor]);
                moveables.push(sittingBird);
              
                cc2.save();
                sittingBird.draw();
                cc2.restore();
            }
           
        }
    }

    function update(): void {
        console.log("Update");
        cc2.putImageData(imgData, 0, 0);

        updateMoveables();

    }

    function updateMoveables(): void {
        let transform: DOMMatrix = cc2.getTransform();

        for (let moveable of moveables) {
            if (moveable instanceof Snowflake) {
                moveable.letItSnow(1 / 100);
                moveable.draw();
                cc2.setTransform(transform);
            }
            if (moveable instanceof BirdOnFly) {
                moveable.fly(1 / 50);
                moveable.draw();
                cc2.setTransform(transform);
            }
            if (moveable instanceof SitBird) {
                let check: Boolean | void = moveable.checkUpdate();
                moveable.checkPosition();
                if (check == true) {
                    moveable.eat(1 / 100);
                    moveable.draw();
                    cc2.setTransform(transform);
                }

                if (check == false) {
                    moveable.draw();
                    cc2.setTransform(transform);
                }

            }

        }


    }

    function drawSnowflakes(_nFlakes: number, _position: Vector) {
        let transform: DOMMatrix = cc2.getTransform();

        for (let drawn: number = 0; drawn < _nFlakes; drawn++) {
            cc2.save();
            let pos: Vector = new Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size: Vector = new Vector(10, 10);

            let snowflake: Snowflake = new Snowflake(pos, size);
            snowflake.draw();
            moveables.push(snowflake);

            cc2.restore();

        }

        cc2.setTransform(transform);
    }

    export function randomBetween(_min: number, _max: number): number {
        let returnNumber: number = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }



}