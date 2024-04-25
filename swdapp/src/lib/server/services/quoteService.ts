import { getProfile, userExists } from "./userService";
import type { SaveQuoteRequest } from "../customTypes/quoteTypes";
import { QuotesModel } from "../database/models/quotesModel";


export async function getQuoteHistory(username: string) {
    let user = await userExists(username);

    if(!user)
        return null;

    let profile = await getProfile(username);

    if(!profile)
        return null;

    const quoteHistory = await QuotesModel.find({ username: username });
    
    return quoteHistory;
}

export async function generateQuote(username: string, gallonsRequested: number, deliveryDate: string, loc: string) {
    let user = await userExists(username);
    if(!user)
        return null;

    let profile = await getProfile(username);
    if(!profile)
        return null;

    const current_price = 1.50;
    let location_factor: number;
    let rate_history_factor: number;
    let gal_requested_factor: number;
    const company_profit_factor = 0.10;
    let state = profile.state;
    let hasQuotes: boolean;

    const quoteHistDB = await getQuoteHistory(username);
    hasQuotes = quoteHistDB ? true : false;

    if(!state)
        return null;
    state = state.toLocaleLowerCase();

    location_factor = (state == 'tx' || state == 'texas') ? 0.02 : 0.04;
    rate_history_factor = hasQuotes ? 0.01 : 0.00;
    gal_requested_factor = (gallonsRequested > 1000) ? 0.02 : 0.03;

    const margin = current_price * (location_factor - rate_history_factor + gal_requested_factor + company_profit_factor);
    const priceCalculated = current_price + margin;

    const quote = {
        // _id: crypto.randomBytes(24 / 2).toString('hex'),
        generationDate: new Date(),
        gallonsRequested: gallonsRequested,
        priceCalculated: priceCalculated,
        deliveryDate: new Date(deliveryDate)
    };
    
    return quote;
}

export async function saveQuote(username: string, quoteObj: Omit<SaveQuoteRequest, "username" | "accessToken">) {
    let newQuote = await QuotesModel.create({
        username: username,
        generationDate: quoteObj.generationDate,
        gallonsRequested: quoteObj.gallonsRequested,
        priceCalculated: quoteObj.priceCalculated,
        deliveryDate: quoteObj.deliveryDate,
        location: quoteObj.location
    });

    if(!newQuote)
        return false;

    return true;
}