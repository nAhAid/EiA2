namespace L04_shoppingList {
    export interface Input {
        product: string;
        quantity: number;
        buyNext: boolean;
        isDone: boolean;
        comment: string;
        lastPurchase: string;
    }



    export let inputs: Input[] = [
        {
            product: "Milk",
            quantity: 1,
            buyNext: true,
            isDone: false,
            comment: "Pack",
            lastPurchase: "17.10.2022"
        },
        {
            product: "Eggs",
            quantity: 6,
            buyNext: false,
            isDone: true,
            comment: "Pieces",
            lastPurchase: "06.10.2022"
        },
        {
            product: "Cheese",
            quantity: 1,
            buyNext: true,
            isDone: false,
            comment: "Pack",
            lastPurchase: "10.10.2022"
        }

    ];


    export let product: string = "";
    export let quantity: number;
    export let buyNext: boolean;
    export let isDone: boolean;
    export let comment: string;
    export let lastPurchase: string;

    export let htmlProduct: HTMLInputElement;
    export let htmlQuantity: HTMLInputElement;
    export let htmlBuyNext: HTMLInputElement;
    export let htmlComment: HTMLTextAreaElement;
    
}