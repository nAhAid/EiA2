namespace Firework {
    window.addEventListener("load", handleLoad);

    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
    let cc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
    let background: ImageData;

    function handleLoad(): void {
        console.log("start");
        drawBackground();
        background = cc2.getImageData(0, 0, cc2.canvas.width, cc2.canvas.height);
    }

    function drawBackground(): void {
        cc2.beginPath();
        cc2.fillStyle = "black";
        cc2.fillRect(0, 0, cc2.canvas.width, cc2.canvas.height);
        cc2.closePath();
    }
}