namespace L02_EventInspector {
    window.addEventListener("load", handleLoad);

    function handleLoad (_event: Event) {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        let body: HTMLElement = <HTMLElement>document.querySelector("body");
        let div: HTMLElement = <HTMLElement>document.querySelector("div");

        
        body.addEventListener("click", logInfo);
        div.addEventListener("click", logInfo);

    
    }

    function setInfoBox (_event: MouseEvent): void {
        //console.log(_event);
        let x: number = _event.clientX;
        let y: number = _event.clientY;
        let target: HTMLElement = <HTMLElement>_event.target;
        let span: HTMLElement = <HTMLElement>document.getElementById("cursor");

        span.innerHTML = target + "<br>" + x + "<br>" + y;

        span.style.top = y + "px";
        span.style.left = x + "px";
        span.style.offset = "5px 5px";

        


    }

    function logInfo (_event: MouseEvent): void {
        console.log(_event);
    }
}