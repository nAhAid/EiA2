namespace L09_OldMcDonald {

    export class Animal {
        name: string;
        species: string;
        food: Food;
        foodAmount: number;
        noise: string;

        constructor(_name: string, _species: string, _food: Food, _foodAmount: number, _noise: string) {
            this.name = _name;
            this.species = _species;
            this.food = _food;
            this.foodAmount = _foodAmount;
            this.noise = _noise;
        }

        public eat(): void {
            this.food.eat(this.foodAmount);
        }

        public sing(): void {
            let nameText: HTMLElement = <HTMLElement>document.getElementById("name");
            nameText.innerHTML = this.name;

            let speciesText: HTMLElement = <HTMLElement>document.getElementById("animal");
            speciesText.innerHTML = this.species + "s";

            for (let index: number = 0; index < 5; index++) {
                let noise: HTMLElement = <HTMLElement>document.getElementById("noise" + index);
                if (index == 0 || index == 1 || index == 4) {
                    noise.innerHTML = this.noise + " " + this.noise;
                }
                else {
                    noise.innerHTML = this.noise;
                }
            }
        }
    }
}