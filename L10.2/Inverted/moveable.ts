namespace L10_Asteroids {
    export class Moveable {
        position: Vector;
        velocitiy: Vector;
        expendable: boolean = false;


        constructor(_position?: Vector) {
            if (_position)
                this.position = _position.copy();
            
            else 
                this.position = new Vector(0, 0);
            
            this.velocitiy = new Vector(0, 0);
        }

        move(_timeslice: number): void {
            /* this.position.x = this.velocitiy.x * _timeslice;
            this.position.y = this.velocitiy.y * _timeslice; */

            let offset: Vector = this.velocitiy.copy();
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.x += cc2.canvas.width;
            if (this.position.y < 0)
                this.position.y += cc2.canvas.height;
            if (this.position.x > cc2.canvas.width)
                this.position.x -= cc2.canvas.width;
            if (this.position.y > cc2.canvas.height)
                this.position.y -= cc2.canvas.height;
        }

        draw(): void {
            console.log("");
        }
    }
}