import crypto from "crypto";
import { dummyUsersModel } from "../dummyDatabase";
import { userExists } from "./userService";
import { UserModel } from "../database/models/userModel";


export async function getQuoteHistory(username: string) {
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    return user.profile.quoteHistory;
}

export async function generateQuote(username: string, gallonsRequested: number, deliveryDate: string, loc: string) {
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    // let quoteHistory = user ? user.profile?.quoteHistory : null;

    //TODO: implement pricing module, for now it's a random constant
    const priceCalculated = Math.random();

    const quote = {
        _id: crypto.randomBytes(24 / 2).toString('hex'),
        generationDate: new Date(),
        gallonsRequested: gallonsRequested,
        priceCalculated: priceCalculated
    };

    // if (!quoteHistory) {
    //     user.profile.quoteHistory = [];
    // }

    let newQuote = await UserModel.findOneAndUpdate({ username: username }, 
        {
            $push: {
                'profile.quoteHistory': quote
            }
        },
        { new: true }
    );
    
    // user?.profile?.quoteHistory?.push(quote);
    return quote;
}

