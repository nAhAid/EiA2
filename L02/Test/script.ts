namespace TestSpace {
    let number: number = 1;

    function handleClick(_event: Event): void {
        console.log(number);
        number++;
    }

    document.querySelector("#text")?.addEventListener("click", handleClick);
}
namespace L02_Load {
    document.addEventListener("DOMContentLoaded", handleLoad);

    function handleLoad(_event: Event): void {
        console.log(_event);
    }
}


