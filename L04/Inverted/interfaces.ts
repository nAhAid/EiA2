namespace L04_CocktailBar {
    export interface Item {
        name: string;
        price: number;
    }

    export interface Data {
        //In den eckigen Klammern steht ein variabler Schlüssel, nur fürden der den Code liest
        [category: string]: Item[];
    }
}