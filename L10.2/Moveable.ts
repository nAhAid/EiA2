namespace L10_Birdhouse {

    export class Moveable {
        position: Vector;
        velocity: Vector;
        update: Boolean;

        constructor(_position: Vector, _velocity?: Vector) {
            this.position = _position.copy();
            if (_velocity)
                this.velocity = _velocity.copy();

            else
                this.velocity = new Vector(0, 0);

            this.update = true;
        }


    }
}