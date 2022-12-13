"use strict";
var L09_OldMcDonald;
(function (L09_OldMcDonald) {
    class Animal {
        name;
        species;
        food;
        foodAmount;
        noise;
        constructor(_name, _species, _food, _foodAmount, _noise) {
            this.name = _name;
            this.species = _species;
            this.food = _food;
            this.foodAmount = _foodAmount;
            this.noise = _noise;
        }
        eat() {
            this.food.eat(this.foodAmount);
        }
        sing() {
            let nameText = document.getElementById("name");
            nameText.innerHTML = this.name;
            let speciesText = document.getElementById("animal");
            speciesText.innerHTML = this.species + "s";
            for (let index = 0; index < 5; index++) {
                let noise = document.getElementById("noise" + index);
                if (index == 0 || index == 1 || index == 4) {
                    noise.innerHTML = this.noise + " " + this.noise;
                }
                else {
                    noise.innerHTML = this.noise;
                }
            }
        }
    }
    L09_OldMcDonald.Animal = Animal;
})(L09_OldMcDonald || (L09_OldMcDonald = {}));
//# sourceMappingURL=animals.js.map