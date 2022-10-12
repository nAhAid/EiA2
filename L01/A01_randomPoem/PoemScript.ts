namespace Content {
    let subjects: string[] = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates: string[] = ["benutzt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects: string[] = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];


    for (let index = subjects.length; index >= 1; index--) {
        let verseReturn: string = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
        
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]) {
        let holdVerse: string [] = [];
        let randomNumberSubjects: number = Math.floor(Math.random() * _subjects.length);
        let randomNumberObjects: number = Math.floor(Math.random() * _subjects.length);
        let randomNumberPredicates: number = Math.floor(Math.random() * _subjects.length);
        

        let countArrayPoint: number = 0;

        holdVerse[countArrayPoint]  = _subjects[randomNumberSubjects];
        _subjects.splice(randomNumberSubjects, 1);
        
        countArrayPoint++;

        holdVerse[countArrayPoint] = _predicates[randomNumberPredicates];
        _predicates.splice(randomNumberPredicates, 1);

        countArrayPoint++;

        holdVerse[countArrayPoint] = _objects[randomNumberObjects];
        _objects.splice(randomNumberObjects, 1);
        
        //holdVerse.toString();
    
        let returnString: string = "";


        for (let index: number = 0; index <= holdVerse.length; index++) {
            
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

        return(returnString);
    }

    
}
