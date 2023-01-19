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

    export let golden: number = 0.62;
    export let horizon: number = cc2.canvas.height * golden;
    export let imgData: ImageData;
    export let posSnowflakes: Vector = new Vector(400, 175);


    let moveables: Moveable[] = [];

    function handleLoad(_event: Event): void {



        drawStatic();
        imgData = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
        drawSnowflakes(50, posSnowflakes);
        drawBirds(10);

        window.setInterval(update, 20);
        canvas.addEventListener("mouseup", clickCanvas);
        //window.setInterval(updateBird, 500);


    }

    function clickCanvas(_event: MouseEvent) {
        console.log("Shoot Laser");
        let hotspot: Vector = new Vector(_event.clientX - cc2.canvas.offsetLeft, _event.clientY - cc2.canvas.offsetTop);
        let birdHit: SitBird | null = getBirdHit(hotspot);
        if (birdHit)
            killBird(birdHit);
        else {
            createBird(hotspot);
        }

    }

    function createBird(_hotspot: Vector): void {
        let randomColor: number = Math.floor(Math.random() * color.length);
        let randomBeakColor: number = Math.floor(Math.random() * beakColor.length);
        let bird: SitBird = new SitBird(_hotspot, color[randomColor], beakColor[randomBeakColor]);
        moveables.push(bird);

    }



    function getBirdHit(_hotspot: Vector): SitBird | null {
        for (let moveable of moveables) {
            if (moveable instanceof SitBird && moveable.isHit(_hotspot))
                return moveable;
        }

        return null;
    }


    function killBird(_bird: SitBird): void {
        _bird.expendable = true;
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
                let sittingBird: SitBird = new SitBird(birdPos, color[randomColor], beakColor[randomBeakColor]);
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
        deleteExpandables();
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

                moveable.checkState();
                if (moveable.checkTargetDistance() == true) {
                    let check: Boolean | void = moveable.checkUpdate();
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
                else {
                    let check: Boolean | void = moveable.checkUpdate();
                    if (moveable.isFlying == true) {
                        moveable.fly(1 / 100);
                        moveable.draw();
                        cc2.setTransform(transform);
                    }
                    else {
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
        }
    }

    function deleteExpandables(): void {
        for (let i: number = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expendable)
                moveables.splice(i, 1);
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