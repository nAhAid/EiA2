"use strict";
/*
Aufgabe: <L10.2_Birdhouse>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <12.01.2023>
Quellen: </>
*/
var L11_Birdhouse;
(function (L11_Birdhouse) {
    window.addEventListener("load", handleLoad);
    L11_Birdhouse.directions = ["x", "-x"];
    L11_Birdhouse.golden = 0.62;
    L11_Birdhouse.horizon = L11_Birdhouse.cc2.canvas.height * L11_Birdhouse.golden;
    L11_Birdhouse.posSnowflakes = new L11_Birdhouse.Vector(400, 175);
    let moveables = [];
    function handleLoad(_event) {
        L11_Birdhouse.drawStatic();
        L11_Birdhouse.imgData = L11_Birdhouse.cc2.getImageData(0, 0, L11_Birdhouse.cc2.canvas.width, L11_Birdhouse.cc2.canvas.height);
        drawSnowflakes(50, L11_Birdhouse.posSnowflakes);
        drawBirds(10);
        window.setInterval(update, 20);
        L11_Birdhouse.canvas.addEventListener("mouseup", clickCanvas);
        //window.setInterval(updateBird, 500);
    }
    function clickCanvas(_event) {
        let hotspot = new L11_Birdhouse.Vector(_event.clientX - L11_Birdhouse.cc2.canvas.offsetLeft, _event.clientY - L11_Birdhouse.cc2.canvas.offsetTop);
        let birdHit = getBirdHit(hotspot);
        if (birdHit)
            killBird(birdHit);
        else {
            createBird(hotspot);
        }
    }
    function createBird(_hotspot) {
        let randomColor = Math.floor(Math.random() * L11_Birdhouse.color.length);
        let randomBeakColor = Math.floor(Math.random() * L11_Birdhouse.beakColor.length);
        let bird = new L11_Birdhouse.SitBird(_hotspot, L11_Birdhouse.color[randomColor], L11_Birdhouse.beakColor[randomBeakColor]);
        moveables.push(bird);
    }
    function getBirdHit(_hotspot) {
        for (let moveable of moveables) {
            if (moveable instanceof L11_Birdhouse.SitBird && moveable.isHit(_hotspot))
                return moveable;
        }
        return null;
    }
    function killBird(_bird) {
        _bird.expendable = true;
    }
    function drawBirds(_nBirds) {
        for (let drawn = 0; drawn < _nBirds; drawn++) {
            L11_Birdhouse.cc2.save();
            let randomColor = Math.floor(Math.random() * L11_Birdhouse.color.length);
            let randomBeakColor = Math.floor(Math.random() * L11_Birdhouse.beakColor.length);
            let maxWidth = 650;
            let minWidth = 100;
            let minHeight = 100;
            let maxHeight = 500;
            let x = randomBetween(minWidth, maxWidth);
            let y = randomBetween(minHeight, maxHeight);
            let birdPos = new L11_Birdhouse.Vector(x, y);
            //let flyBirdPos: Vector = new Vector(100, 200);
            /*
                        if (y < horizon) {
                            let velocity: Vector = new Vector(0, 0);
                            velocity.random(100, 400, directions[Math.floor(Math.random() * directions.length)]);
                            let sittingBird: SitBird = new SitBird(birdPos, color[randomColor], beakColor[randomBeakColor]);
                            moveables.push(sittingBird);
            
                            cc2.save();
                            sittingBird.draw();
                            cc2.restore();
                        } */
            let sittingBird = new L11_Birdhouse.SitBird(birdPos, L11_Birdhouse.color[randomColor], L11_Birdhouse.beakColor[randomBeakColor]);
            moveables.push(sittingBird);
            L11_Birdhouse.cc2.save();
            sittingBird.draw();
            L11_Birdhouse.cc2.restore();
        }
    }
    function update() {
        console.log("Update");
        L11_Birdhouse.cc2.putImageData(L11_Birdhouse.imgData, 0, 0);
        updateMoveables();
        deleteExpandables();
    }
    function updateMoveables() {
        let transform = L11_Birdhouse.cc2.getTransform();
        for (let moveable of moveables) {
            if (moveable instanceof L11_Birdhouse.Snowflake) {
                moveable.letItSnow(1 / 100);
                moveable.draw();
                L11_Birdhouse.cc2.setTransform(transform);
            }
            if (moveable instanceof L11_Birdhouse.SitBird) {
                moveable.checkState();
                let check = moveable.checkUpdate();
                if (moveable.isFlying == true) {
                    moveable.fly(1 / 100);
                    moveable.draw();
                    L11_Birdhouse.cc2.setTransform(transform);
                }
                else {
                    if (check == true) {
                        moveable.eat(1 / 100);
                        moveable.draw();
                        L11_Birdhouse.cc2.setTransform(transform);
                    }
                    if (check == false) {
                        moveable.draw();
                        L11_Birdhouse.cc2.setTransform(transform);
                    }
                }
                moveable.checkTargetDistance();
            }
        }
    }
    function deleteExpandables() {
        for (let i = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expendable)
                moveables.splice(i, 1);
        }
    }
    function drawSnowflakes(_nFlakes, _position) {
        let transform = L11_Birdhouse.cc2.getTransform();
        for (let drawn = 0; drawn < _nFlakes; drawn++) {
            L11_Birdhouse.cc2.save();
            let pos = new L11_Birdhouse.Vector(randomBetween(0, 325), randomBetween(0, 250));
            let size = new L11_Birdhouse.Vector(10, 10);
            let snowflake = new L11_Birdhouse.Snowflake(pos, size);
            snowflake.draw();
            moveables.push(snowflake);
            L11_Birdhouse.cc2.restore();
        }
        L11_Birdhouse.cc2.setTransform(transform);
    }
    function randomBetween(_min, _max) {
        let returnNumber = Math.floor(Math.random() * (_max - _min)) + _min;
        return returnNumber;
    }
    L11_Birdhouse.randomBetween = randomBetween;
})(L11_Birdhouse || (L11_Birdhouse = {}));
//# sourceMappingURL=main.js.map