import crypto from "crypto";
import { dummyUsersModel } from "../dummyDatabase";


export async function getQuoteHistory(username: string) {
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile?.quoteHistory : null;

}

export async function generateQuote(username: string, gallonsRequested: number, deliveryDate: string, loc: string) {
    const user = dummyUsersModel.find(user => user.username === username);
    const quoteHistory = user ? user.profile?.quoteHistory : null;

    //TODO: implement pricing module, for now it's a random constant
    const priceCalculated = Math.random();

    const quote = {
        _id: crypto.randomBytes(24 / 2).toString('hex'),
        generationDate: new Date(),
        gallonsRequested: gallonsRequested,
        priceCalculated: priceCalculated
    };

    quoteHistory?.push(quote);

    return quote;
}

