"use strict";
var L03_CocktailBar;
(function (L03_CocktailBar) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        let form = document.getElementById("form");
        form.addEventListener("change", handleChange);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
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
            let item = document.querySelector("[value='" + entry[1] + "']");
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
        console.log(total);
        totalOrder.innerHTML = "<b>" + total + " €";
    }
    function checkAmount() {
        let amount = document.querySelector("input#amount").value;
        return (amount);
    }
})(L03_CocktailBar || (L03_CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map