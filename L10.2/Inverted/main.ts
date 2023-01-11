namespace L10_Asteroids {

    window.addEventListener("load", handleLoad);
    export let cc2: CanvasRenderingContext2D;

    let asteroids: Asteroid[] = [];

    function handleLoad(_event: Event): void {
        console.log("Load");

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        cc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        cc2.fillStyle = "black";
        cc2.strokeStyle = "white";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);

        createPaths();
        createAsteroids(5);

        let asteroid: Asteroid = new Asteroid(1);
        console.log(asteroid);
        asteroid.draw();
        asteroid.move(0.1);

        window.setInterval(update, 20);

        canvas.addEventListener("mouseup", shootLaser);

    }

    function shootLaser(_event: MouseEvent) {
        console.log("Shoot Laser");
        let hotspot: Vector = new Vector(_event.clientX - cc2.canvas.offsetLeft, _event.clientY - cc2.canvas.offsetTop);
        let asteroidHit: Asteroid | null = getAsteroidHit(hotspot);
        if (asteroidHit)
            breakAsteroid(asteroidHit);

    }

    function getAsteroidHit(_hotspot: Vector): Asteroid | null {
        for (let asteroid of asteroids) {
            if (asteroid.isHit(_hotspot))
                return asteroid;
        }

        return null;
    }

    function breakAsteroid(_asteroid: Asteroid): void {

        if (_asteroid.size > 0.3) {
            for (let index: number = 0; index < 2; index++) {
                let fragment: Asteroid = new Asteroid(_asteroid.size / 2, _asteroid.position);
                fragment.velocitiy.add(_asteroid.velocitiy);

                asteroids.push(fragment);
                
            }
        }

        let index: number = asteroids.indexOf(_asteroid);
        asteroids.splice(index, 1);
    }


    function createAsteroids(_nAsteroids: number): void {
        console.log("Create asteroids");
        for (let i: number = 0; i < _nAsteroids; i++) {
            let asteroid: Asteroid = new Asteroid(1.0);
            asteroids.push(asteroid);
        }
    }

    function update(): void {
        console.log("Update");
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);

        for (let asteroid of asteroids) {
            asteroid.move(1 / 50);
            asteroid.draw();

        }
    }

}