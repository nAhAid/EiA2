namespace L09_Asteroids {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        scale( _factor: number): void {
            this.x = this.x * _factor;
            this.y = this.y * _factor;
        }

        add (_addend: Vector): void {
            this.x = this.x + _addend.x;
            this.y = this.y + _addend.y;
        }
    }

}