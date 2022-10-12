"use strict";
var Content;
(function (Content) {
    let subjects = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates = ["wohnt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];
    for (let index = subjects.length; index >= 1; index--) {
        let verseReturn = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
    }
    function getVerse(_subjects, _predicates, _objects) {
        let holdVerse = [];
        let randomNumber = Math.floor(Math.random() * _subjects.length);
        let countArrayPoint = 0;
        holdVerse[countArrayPoint] = _subjects[randomNumber];
        _subjects.splice(randomNumber, 1);
        countArrayPoint++;
        holdVerse[countArrayPoint] = _predicates[randomNumber];
        _predicates.splice(randomNumber, 1);
        countArrayPoint++;
        holdVerse[countArrayPoint] = _objects[randomNumber];
        _objects.splice(randomNumber, 1);
        //holdVerse.toString();
        let returnString = "";
        for (let index = 0; index <= holdVerse.length; index++) {
            if (index == 0) {
                returnString += holdVerse[index];
            }
            else if (index < holdVerse.length) {
                returnString += " ";
                returnString += holdVerse[index];
            }
            else {
                returnString += ".";
            }
        }
        return (returnString);
    }
})(Content || (Content = {}));
//# sourceMappingURL=PoemScript.js.map