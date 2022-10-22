namespace TestSpace {
    let number: number = 1;

    function handleClick(_event: Event): void {
        console.log(number);
        number++;
    }

    document.querySelector("#text")?.addEventListener("click", (handleClick));
}

