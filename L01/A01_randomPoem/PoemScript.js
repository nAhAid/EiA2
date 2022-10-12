"use strict";
var Content;
(function (Content) {
    let subjects = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates = ["wohnt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];
    console.log(subjects);
    console.log(objects);
    console.log(predicates);
    for (let index = subjects.length; index >= 1; index--) {
        console.log(index);
        let verseReturn = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
    }
    function getVerse(_subjects, _predicates, _objects) {
        return ("Alohomora");
    }
})(Content || (Content = {}));
//# sourceMappingURL=PoemScript.js.map