"use strict";
/*
Aufgabe: <L08.2_shoppingList>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <13.12.2022>
Quellen: <Ich, W3Schools, Daniel Meier>
*/
var L09_OldMcDonald;
(function (L09_OldMcDonald) {
    window.addEventListener("load", handleLoad);
    let interval;
    let index = 1;
    let animals = [];
    function handleLoad() {
        let foodElephant = new L09_OldMcDonald.Food("Leaves", 200);
        let elephant = new L09_OldMcDonald.Animal("Benjamin Blümchen", "Elefant", foodElephant, 100, "TERÖÖÖ");
        animals.push(elephant);
        let foodHay = new L09_OldMcDonald.Food("Hay", 100);
        let cow = new L09_OldMcDonald.Animal("Rüdiger the Cow", "Cow", foodHay, 10, "Moo");
        animals.push(cow);
        let fishFood = new L09_OldMcDonald.Food("Fish food", 50);
        let fish = new L09_OldMcDonald.Animal("Nemo", "Fish", fishFood, 5, "Blub");
        animals.push(fish);
        let sheep = new L09_OldMcDonald.Animal("Shaun the Sheep", "Sheep", foodHay, 5, "Määh");
        animals.push(sheep);
        let carrots = new L09_OldMcDonald.Food("Carrots", 30);
        let rabbit = new L09_OldMcDonald.Animal("Judy Hops", "Rabbit", carrots, 5, "Pfff");
        animals.push(rabbit);
        startSing();
    }
    function startSing() {
        animals[0].sing();
        animals[0].eat();
        interval = setInterval(makeLyrics, 10000);
    }
    function makeLyrics() {
        animals[index].sing();
        animals[index].eat();
        index++;
        if (index == 5) {
            clearInterval(interval);
            roleAgain();
        }
    }
    function roleAgain() {
        let div = document.querySelector("div");
        let againButton = document.createElement("button");
        againButton.setAttribute("type", "button");
        againButton.setAttribute("margin", "auto");
        againButton.innerHTML = "Next Day";
        div.appendChild(againButton);
        index = 1;
        againButton.addEventListener("click", restart);
    }
    function restart() {
        let div = document.querySelector("#overview");
        let againButton = document.querySelector("button");
        div.removeChild(againButton);
        startSing();
    }
})(L09_OldMcDonald || (L09_OldMcDonald = {}));
//# sourceMappingURL=main.js.map