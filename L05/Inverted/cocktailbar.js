"use strict";
var L05_CocktailBar;
(function (L05_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        L05_CocktailBar.generateContent(L05_CocktailBar.data);
        let form = document.getElementById("form");
        form.addEventListener("change", handleChange);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        console.log("Start");
        L05_CocktailBar.communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
        console.log("End");
    }
    function handleChange(_event) {
        displayOrder();
    }
    function displayAmount(_event) {
        let progress = document.querySelector("progress");
        let amount = _event.target.value;
        progress.value = parseFloat(amount);
    }
    function displayOrder() {
        //let inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");
        //console.log(inputs);
        //console.log(inputs[1]);
        let order = document.getElementById("order_text");
        order.innerHTML = "";
        let total = 0;
        let totalOrder = document.getElementById("total");
        let formData = new FormData(document.forms[0]);
        //console.log(formData);
        for (let entry of formData) {
            console.log(entry);
            let item = document.querySelector("[value='" + entry[1] + "']");
            console.log(item);
            let price = Number(item.getAttribute("price"));
            if (item.name == undefined && entry[0] != "Amount") {
                let amount = parseFloat(checkAmount());
                let cocktailPrice = price * amount;
                order.innerHTML += item.value + "     " + cocktailPrice + " € <br>";
                total += cocktailPrice;
            }
            else if (entry[0] == "Amount") {
                console.log(item.value);
            }
            else if (item.name != "Amount") {
                order.innerHTML += item.value + "     " + price + " € <br>";
                total += price;
            }
        }
        total = round(total, 2);
        totalOrder.innerHTML = "<b>" + total + " €";
    }
    function checkAmount() {
        let amount = document.querySelector("input#amount").value;
        return (amount);
    }
    function round(num, fractionDigits) {
        return Number(num.toFixed(fractionDigits));
    }
})(L05_CocktailBar || (L05_CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map