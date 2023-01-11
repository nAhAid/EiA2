namespace L10_Asteroids {
    export class Asteroid extends Moveable {
        position: Vector;
        velocitiy: Vector;
        type: number;
        size: number;


        constructor(_size: number, _position?: Vector) {
            
            super(_position);
            
            if (_position)
                this.position = _position.copy();
            
            else 
                this.position = new Vector(0, 0);
            
            this.velocitiy = new Vector(0, 0);
            this.velocitiy.random(100, 200);
            this.type = Math.floor(shapesAsteroids.length * Math.random());

            this.size = _size;
        }


        draw() {
            cc2.save();
            cc2.translate(this.position.x, this.position.y);
            cc2.scale(this.size, this.size);
            cc2.translate(-50, -50);
            cc2.lineWidth = linewidth / this.size;
            cc2.stroke(asteroidPaths[this.type]);
            cc2.restore();
        }

        isHit(_hotspot: Vector): boolean {
            let hitsize: number = 50 * this.size;
            let difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y);
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);

        }
    }
}