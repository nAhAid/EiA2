namespace L09_OldMcDonald {
    export class Food {
        type: string;
        total: number; 

        constructor(_type: string, _total: number) {
            this.type = _type;
            this.total = _total; 
        }

        eat(_foodAmount: number): void {
           let newTotal: number = this.total - _foodAmount;
           this.total = newTotal; 
           console.log(this.total); 
           this.print(_foodAmount); 
        }

        print(_foodAmount: number): void  {
            let type: HTMLElement = <HTMLElement>document.getElementById("type");
            type.innerHTML = this.type; 
            let eaten: HTMLElement = <HTMLElement>document.getElementById("eaten");
            eaten.innerHTML = _foodAmount.toString(); 
            let left: HTMLElement = <HTMLElement>document.getElementById("left");
            left.innerHTML = this.total.toString();
        }
    }
}