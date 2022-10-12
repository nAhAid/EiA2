"use strict";
var Content;
(function (Content) {
    let subjects = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates = ["benutzt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];
    for (let index = subjects.length; index >= 1; index--) {
        let verseReturn = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
    }
    function getVerse(_subjects, _predicates, _objects) {
        let holdVerse = [];
        let randomNumberSubjects = Math.floor(Math.random() * _subjects.length);
        let randomNumberObjects = Math.floor(Math.random() * _objects.length);
        let randomNumberPredicates = Math.floor(Math.random() * _predicates.length);
        let countArrayPoint = 0;
        holdVerse[countArrayPoint] = _subjects[randomNumberSubjects];
        _subjects.splice(randomNumberSubjects, 1);
        countArrayPoint++;
        holdVerse[countArrayPoint] = _predicates[randomNumberPredicates];
        _predicates.splice(randomNumberPredicates, 1);
        countArrayPoint++;
        holdVerse[countArrayPoint] = _objects[randomNumberObjects];
        _objects.splice(randomNumberObjects, 1);
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