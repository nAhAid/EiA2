namespace L02_EventInspector {
    window.addEventListener("load", handleLoad);

    let clicked: string = "Ich wurde geklickt!";

    function handleLoad (_event: Event): void {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        
        let body: HTMLElement = <HTMLElement>document.querySelector("body");
        let div: HTMLElement = <HTMLElement>document.querySelector("div");
        let button: HTMLElement = <HTMLElement>document.querySelector("#button");
        
 
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div.addEventListener("click", logInfo);
        div.addEventListener("keyup", logInfo);
        button.addEventListener("click", buttonHandler);
        document.addEventListener("tryOutSpecialType", logCustomEvent);
    }

    function setInfoBox (_event: MouseEvent): void {
        //console.log(_event);
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let target: HTMLElement = <HTMLElement>_event.target;
        let span: HTMLElement = <HTMLElement>document.getElementById("cursor");

        span.innerHTML = target + "<br>" + x + "<br>" + y;

        span.style.top = y + 30 + "px";
        span.style.left = x + 20 + "px";
    }


    function logInfo (_event: Event): void {
        console.log("Events-Type:");
        console.log(_event.type);
        console.log("Events-Target:");
        console.log(_event.target);
        console.log("Events-currentTarget:");
        console.log(_event.currentTarget);
        console.log("Whole Event Object:");
        console.log(_event);
    }

    


    function buttonHandler (_event: Event): void {
        let event: CustomEvent = new CustomEvent("tryOutSpecialType", {bubbles: true, detail: {button: clicked}});
        let button: HTMLElement = <HTMLElement>document.querySelector("#button");
        button.dispatchEvent(event);
    }

    function logCustomEvent (_event: Event): void {
        console.log(_event);
    }
}