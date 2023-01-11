namespace L10_Asteroids {

    window.addEventListener("load", handleLoad);
    export let cc2: CanvasRenderingContext2D;
    export let linewidth: number = 2;

    let moveables: Moveable[] = [];

    function handleLoad(_event: Event): void {
        console.log("Load");

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        cc2.fillStyle = "black";
        cc2.strokeStyle = "white";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.lineWidth = linewidth;

        createPaths();
        createmoveables(5);

        let asteroid: Asteroid = new Asteroid(1);
        console.log(asteroid);
        asteroid.draw();
        asteroid.move(0.1);

        window.setInterval(update, 20);

        canvas.addEventListener("mouseup", shootLaser);
        canvas.addEventListener("mousedown", shootProjectile);


    }

    function shootProjectile(_event: MouseEvent) {
        let origin: Vector = new Vector(_event.clientX - cc2.canvas.offsetLeft, _event.clientY - cc2.canvas.offsetTop);
        let velocitiy: Vector = new Vector(0, 0);
        velocitiy.random(100, 100);
        let projectile: Projectile = new Projectile(origin, velocitiy);
        moveables.push(projectile);

    }

    function shootLaser(_event: MouseEvent) {
        console.log("Shoot Laser");
        let hotspot: Vector = new Vector(_event.clientX - cc2.canvas.offsetLeft, _event.clientY - cc2.canvas.offsetTop);
        let asteroidHit: Asteroid | null = getAsteroidHit(hotspot);
        if (asteroidHit)
            breakAsteroid(asteroidHit);

    }

    function getAsteroidHit(_hotspot: Vector): Asteroid | null {
        for (let moveable of moveables) {
            if (moveable instanceof Asteroid && moveable.isHit(_hotspot))
                return moveable;
        }

        return null;
    }

    function breakAsteroid(_asteroid: Asteroid): void {

        if (_asteroid.size > 0.3) {
            for (let index: number = 0; index < 2; index++) {
                let fragment: Asteroid = new Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocitiy.add(_asteroid.velocitiy);

                moveables.push(fragment);

            }
        }

        
        _asteroid.expendable = true;
    }


    function createmoveables(_nmoveables: number): void {
        console.log("Create moveables");
        for (let i: number = 0; i < _nmoveables; i++) {
            let asteroid: Asteroid = new Asteroid(1.0);
            moveables.push(asteroid);
        }
    }

    function update(): void {
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);

        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();

        }

        deleteExpandables();
        console.log(moveables.length);
    }

    function deleteExpandables(): void {
        for (let i: number = moveables.length - 1; i >= 0; i--) {
            if (moveables[i].expendable)
            moveables.splice(i, 1);
        }
    }

}