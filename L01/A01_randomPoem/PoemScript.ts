namespace Content {
    let subjects: string[] = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates: string[] = ["wohnt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects: string[] = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];


    for (let index = subjects.length; index >= 1; index--) {
        let verseReturn: string = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
        
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]) {
        let holdVerse: string [] = [];
        let randomNumber: number = Math.floor(Math.random() * _subjects.length);
        
        let countArrayPoint: number = 0;

        holdVerse[countArrayPoint]  = _subjects[randomNumber];
        _subjects.splice(randomNumber, 1);
        
        countArrayPoint++;

        holdVerse[countArrayPoint] = _predicates[randomNumber];
        _predicates.splice(randomNumber, 1);

        countArrayPoint++;

        holdVerse[countArrayPoint] = _objects[randomNumber];
        _objects.splice(randomNumber, 1);
        
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
