import crypto from "crypto";
import { userExists } from "./userService";
import { UserModel } from "../database/models/userModel";
import type { SaveQuoteRequest } from "../customTypes/quoteTypes";


export async function getQuoteHistory(username: string) {
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    return user.profile.quoteHistory;
}

export async function generateQuote(username: string, gallonsRequested: number, deliveryDate: string, loc: string) {
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    //TODO: implement pricing module, for now it's a random constant
    const priceCalculated = Math.random();

    const quote = {
        // _id: crypto.randomBytes(24 / 2).toString('hex'),
        generationDate: new Date(),
        gallonsRequested: gallonsRequested,
        priceCalculated: priceCalculated,
        deliveryDate: new Date(deliveryDate)
    };
    
    return quote;
}

export async function saveQuote(username: string, quoteObj: SaveQuoteRequest) {
    let newQuote = await UserModel.findOneAndUpdate({ username: username }, 
        {
            $push: {
                'profile.quoteHistory': quoteObj
            }
        },
        { new: true }
    );

    if(!newQuote)
        return false;

    return true;
}