namespace L05_CocktailBar {

    export async function communicate(_url: RequestInfo): Promise<void> {
        let response: Response = await fetch(_url);
        console.log("Response", response);
        let display: string = (await (response.text())).toString();
        console.log(display);
    }
}

