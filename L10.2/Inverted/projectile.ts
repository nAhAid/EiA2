namespace L10_Asteroids {
    export class Projectile extends Moveable {
        lifetime: number = 2;


        constructor(_position: Vector, _velocity: Vector) {

            super(_position);

            this.velocitiy = _velocity.copy();
        }


        draw() {
            cc2.save();
            cc2.translate(this.position.x, this.position.y);
            cc2.strokeRect(-1, -1, 1, 1);
            cc2.restore();
        }

        move(_timeslice: number): void {
            super.move(_timeslice);
            this.lifetime -= _timeslice;
            if (this.lifetime < 0) {
                this.expendable = true;
            }

        }
    }
}