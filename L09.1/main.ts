namespace L09_OldMcDonald {
    window.addEventListener("load", handleLoad);
    let interval: number;
    let index: number = 1;
    let animals: Animal[] = [];

    function handleLoad(): void {

        let foodElephant: Food = new Food("Leaves", 200);
        let elephant: Animal = new Animal("Benjamin Blümchen", "Elefant", foodElephant, 100, "TERÖÖÖ");
        animals.push(elephant);

        let foodHay: Food = new Food("Hay", 100);
        let cow: Animal = new Animal("Rüdiger the Cow", "Cow", foodHay, 10, "Moo");
        animals.push(cow);

        let fishFood: Food = new Food("Fish food", 50);
        let fish: Animal = new Animal("Nemo", "Fish", fishFood, 5, "Blub");
        animals.push(fish);

        let sheep: Animal = new Animal("Shaun the Sheep", "Sheep", foodHay, 5, "Määh");
        animals.push(sheep);

        let carrots: Food = new Food("Carrots", 30);
        let rabbit: Animal = new Animal("Judy Hops", "Rabbit", carrots, 5, "Pfff");
        animals.push(rabbit);



        startSing();
    }

    function startSing(): void {
        animals[0].sing();
        animals[0].eat();
        console.log(animals);

        interval = setInterval(makeLyrics, 10000);
    }

    function makeLyrics(): void {
        animals[index].sing();
        animals[index].eat();
        index++;
        if (index == 5) {
            clearInterval(interval);
            roleAgain();

        }
    }

    function roleAgain(): void {
        let div: HTMLElement = <HTMLElement>document.querySelector("div");
        let againButton: HTMLElement = document.createElement("button");
        againButton.setAttribute("type", "button");
        againButton.setAttribute("margin", "auto");
        againButton.innerHTML = "Next Day";
        div.appendChild(againButton);

        index = 1;
        againButton.addEventListener("click", restart);
    }

    function restart(): void {
        let div: HTMLElement = <HTMLElement>document.querySelector("div");
        let againButton: HTMLElement = <HTMLElement>document.querySelector("button");
        div.removeChild(againButton);
        startSing();
    }
}