

let s = { "zahl": 7, "wahr": true, text: "Hallo" };

//Assoziative Arrays stringenter strukturieren, durch Definieren der Datentypen für Schlüssel und Werte
interface MapStringToBoolean {
    [key: string]: boolean;
}
let a: MapStringToBoolean = {"wert1": true, "wert2": false};

interface VectorWithMeaning {
    x: number;
    y: number;
    meaning: string;
}
let vector: VectorWithMeaning = {x: 12.4, y: -7.2, meaning: "Ortsvektor"};




// % -->	führt eine Divisionsoperation durch und gibt den Rest zurück
function isDivisible(dividend: number, divisor: number) {
    return (dividend % divisor == 0);

}

console.log(isDivisible(4, 2));

let v1: number = 1;
let v2: number = v1;

v1 = 3;

console.log(v1);
console.log(v2);

interface ArrayMitZahlen  {
    0: number;
    1: number;
    2: number;
}

let s1: ArrayMitZahlen  = [1, 2, 3];
let s2: ArrayMitZahlen = s1;

s1[0] = 0;

console.log(s1);
console.log(s2);

let s3: number[] = [1, 2, 3];
let s4: string[] = ["hallo"];
let s5: boolean[] = [true, false];


