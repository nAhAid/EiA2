"use strict";
var L06_CocktailBar;
(function (L06_CocktailBar) {
    function generateContent(_data) {
        console.log(_data);
        for (let category in _data) {
            //console.log(category);
            let items = _data[category];
            let group = null;
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
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }
    L06_CocktailBar.generateContent = generateContent;
    function createSelect(_items) {
        let group = document.createElement("select");
        group.name = "Drink";
        group.id = "drink";
        for (let item of _items) {
            let select = document.createElement("option");
            select.value = item.name;
            select.setAttribute("price", item.price.toFixed(2));
            select.id = item.name;
            select.textContent = item.name;
            group.appendChild(select);
        }
        return group;
    }
    function createSingle(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            console.log(item.name);
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = _category;
            radio.value = item.name;
            radio.setAttribute("price", item.price.toFixed(2));
            radio.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }
    function createMultiple(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.name;
            checkbox.name = _category;
            checkbox.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
})(L06_CocktailBar || (L06_CocktailBar = {}));
//# sourceMappingURL=GenerateContent.js.map