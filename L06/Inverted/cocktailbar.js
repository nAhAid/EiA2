"use strict";
var L06_CocktailBar;
(function (L06_CocktailBar) {
    window.addEventListener("load", handleLoad);
    let form;
    let json = {};
    async function handleLoad() {
        let response = await fetch("https://webuser.hs-furtwangen.de/~haiderna/Database/Data.json");
        let offer = await response.text();
        let data = JSON.parse(offer);
        L06_CocktailBar.generateContent(data);
        form = document.getElementById("form");
        form.addEventListener("change", handleChange);
        let slider = document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);
        let submit = document.querySelector("button[type=button]");
        console.log(submit);
        submit.addEventListener("click", sendOrder);
        console.log("Start");
        L06_CocktailBar.communicate("https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt");
        console.log("End");
    }
    async function sendOrder(_event) {
        //console.log("Send order!");
        let formData = new FormData(form);
        for (let key of formData.keys())
            if (!json[key]) {
                let values = formData.getAll(key);
                json[key] = values.length > 1 ? values : values[0];
            }
        let query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", "Data");
        query.set("data", JSON.stringify(json));
        await fetch("cocktailbar.html?" + query.toString());
        alert("Order Send!!");
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
        let formData = new FormData(form);
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
})(L06_CocktailBar || (L06_CocktailBar = {}));
//# sourceMappingURL=cocktailbar.js.map