"use strict";
let s = { "zahl": 7, "wahr": true, text: "Hallo" };
let a = { "wert1": true, "wert2": false };
let vector = { x: 12.4, y: -7.2, meaning: "Ortsvektor" };
// % -->	führt eine Divisionsoperation durch und gibt den Rest zurück
function isDivisible(dividend, divisor) {
    return (dividend % divisor == 0);
}
console.log(isDivisible(4, 2));
let v1 = 1;
let v2 = v1;
v1 = 3;
console.log(v1);
console.log(v2);
let s1 = [1, 2, 3];
let s2 = s1;
s1[0] = 0;
console.log(s1);
console.log(s2);
let s3 = [1, 2, 3];
let s4 = ["hallo"];
let s5 = [true, false];
//# sourceMappingURL=script.js.map