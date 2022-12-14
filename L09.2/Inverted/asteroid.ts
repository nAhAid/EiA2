namespace L09_Asteroids {
    export class Asteroid {
        position: Vector;
        velocitiy: Vector;
        type: number;
        size: number;


        constructor(_size: number) {
            this.position.x = 0;
            this.position.y = 0;


            this.size = _size;
        }

        move(_timeslice: number): void {
            this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice;

        }

        draw() {

        };
    }
}