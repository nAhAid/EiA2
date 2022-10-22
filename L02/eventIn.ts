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
    }

    function logInfo (_event: MouseEvent): void {
        console.log(_event);
    }
}