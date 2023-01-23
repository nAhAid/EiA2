"use strict";
var L12_test;
(function (L12_test) {
    let greets = [{ greet: "Hi" }, { greet: "Hallo" }, { greet: "Servus" }];
    try {
        let input = prompt("Lass dich grüßen!", "Gib hier eine Zahl ein");
        let greet = greets[Number(input)].greet;
        alert(greet);
    }
    catch (_error) {
        alert("Tschüss!");
        console.log(_error);
    }
    console.log("Done");
})(L12_test || (L12_test = {}));
//# sourceMappingURL=test.js.map