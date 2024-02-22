// place files you want to import through the `$lib` alias in this folder.
export const hello = 'Hello from $lib!';

// global dummy data
// dummy data get actual data and format it from database
interface DummyData {
    _id: string;
    quoteDate: string;
    quoteTime: string;
    loc: string;
    deliveryDate: string;
    gallons: number;
    price: number;
    tax: number;
}

export let dummyQuoteData: DummyData[] = [
    {_id:"da95101afa3ecfda46d1", quoteDate:"2/21/2024", quoteTime:"1:59pm", loc:"houston", deliveryDate:"2/24/2024", gallons:5, price:2.86, tax: 3.14},
    {_id:"09075d1659108ae43ea4", quoteDate:"2/20/2024", quoteTime:"11:35am", loc:"houston", deliveryDate:"2/23/2024", gallons:3, price:3.86, tax:1.59},
    {_id:"1042af652e115fc669f3", quoteDate:"2/18/2024", quoteTime:"4:30pm", loc:"houston", deliveryDate:"2/21/2024", gallons:10, price:5.86, tax:2.65},
    {_id:"c69380778bd5ed7be644", quoteDate:"2/17/2024", quoteTime:"9:30am", loc:"houston", deliveryDate:"2/18/2024", gallons:9, price:4.86, tax:3.58}
];