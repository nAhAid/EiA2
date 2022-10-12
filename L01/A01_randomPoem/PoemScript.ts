namespace Content {
    let subjects: string[] = ["Gandalf", "Bilbo", "Frodo", "Morgoth", "Sauron", "Sam"];
    let predicates: string[] = ["wohnt", "isst", "raucht", "zerstört", "braucht", "will"];
    let objects: string[] = ["den Ring", "Kuchen", "Stich", "Pfeifenkraut", "Isengart", "Beutelsend"];



    console.log(subjects);
    console.log(objects);
    console.log(predicates);

    for (let index = subjects.length; index >= 1; index--) {
        console.log(index);
        let verseReturn: string = getVerse(subjects, predicates, objects);
        console.log(verseReturn);
        
    }

    function getVerse(_subjects: string[], _predicates: string[], _objects: string[]) {
        return ("Alohomora");
    }

    
}
