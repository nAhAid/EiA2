namespace L06_CocktailBar {
    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        //In den eckigen Klammern steht ein variabler Schlüssel, nur fürden der den Code liest
        [category: string]: Item[];
    }
   
    export function generateContent(_data: Data) {
        console.log(_data);

        for (let category in _data) {
            //console.log(category);

            let items: Item[] = _data[category];
            let group: HTMLElement | null = null;

            switch (category) {
                case "Drink":
                    group = createSelect(items);
                    break;
                case "Container":
                    group = createSingle(items, category);
                    break;
                case "Extras":
                    group = createMultiple(items, category);
                    break;

                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }

    function createSelect(_items: Item[]): HTMLElement | null {
        let group: HTMLSelectElement = document.createElement("select");
        group.name = "Drink";
        group.id = "drink";

        for (let item of _items) {
            let select: HTMLOptionElement = document.createElement("option");
            select.value = item.name;
            select.setAttribute("price", item.price.toFixed(2));
            select.id = item.name;
            select.textContent = item.name;

            group.appendChild(select);
        }
        return group;

    }

    function createSingle(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");

        for (let item of _items) {
            console.log(item.name);
            let radio: HTMLInputElement = document.createElement("input");
            radio.type = "radio";
            radio.name = _category;
            radio.value = item.name;
            radio.setAttribute("price", item.price.toFixed(2));
            radio.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;


            group.appendChild(radio);
            group.appendChild(label);
        }


        return group;
    }

    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");

        for (let item of _items) {
            let checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;    

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(checkbox);
            group.appendChild(label);

        }
        return group;

    }
}