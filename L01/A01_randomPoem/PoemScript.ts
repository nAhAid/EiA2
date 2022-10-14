/*
Aufgabe: <A01_ Random Poem>
Name: <Natan Haider>
Matrikel: <271115>
Datum: <14.10.2022>
Quellen: <Ich>
*/


namespace Content {
    let subjects: string[] = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates: string[] = ["benutzt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects: string[] = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];

    for (let index: number  = subjects.length; index >= 1; index--) {
        let verseReturn: string = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
        
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]) {
        let holdVerse: string [] = [];
        let randomNumberSubjects: number = Math.floor(Math.random() * _subjects.length);
        let randomNumberObjects: number = Math.floor(Math.random() * _objects.length);
        let randomNumberPredicates: number = Math.floor(Math.random() * _predicates.length);
        
        let countArrayPoint: number = 0;

        holdVerse[countArrayPoint]  = _subjects[randomNumberSubjects];
        _subjects.splice(randomNumberSubjects, 1);
        
        countArrayPoint++;

        holdVerse[countArrayPoint] = _predicates[randomNumberPredicates];
        _predicates.splice(randomNumberPredicates, 1);

        countArrayPoint++;

        holdVerse[countArrayPoint] = _objects[randomNumberObjects];
        _objects.splice(randomNumberObjects, 1);
    
        let returnString: string = "";


        for (let index: number = 0; index <= holdVerse.length; index++) {
            
            if (index == 0) {
                returnString += holdVerse[index]; 
            } else if (index < holdVerse.length) {
                returnString += " "; 
                returnString += holdVerse[index];
                 
            } else {
                returnString += ".";
            }
           
            
        } 

        return(returnString);
    }
 
}
