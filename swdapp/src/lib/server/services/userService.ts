import crypto from "crypto";
import { dummyUsersModel, dummyRefreshTokens, dummyCompanyModel } from "../dummyDatabase";

export async function userExists(username: string) {
    const foundUser = dummyUsersModel.find(user => user.username === username);

    return foundUser ? true: false;
}

export async function addUser(username: string, encryptedPass: string) {
    let userID = crypto.randomBytes(24 / 2).toString('hex');

    let newLen = dummyUsersModel.push({
        _id: userID,
        username: username,
        encryptedPassword: encryptedPass,
        isAdmin: false,
        profile: null
    });

    return dummyUsersModel[newLen - 1];
}

export async function getUserCredentials(username: string) {
    const foundUser = dummyUsersModel.find(user => user.username === username);

    return {
        username: foundUser!.username,
        encryptedPass: foundUser!.encryptedPassword
    }
}

export async function addUserRefreshSession(refreshToken: string) {
    dummyRefreshTokens.push(refreshToken);
}

export async function revokeRefreshToken(refreshToken: string) {
    const indexToDelete = dummyRefreshTokens.indexOf(refreshToken);

    if(indexToDelete !== -1)
        dummyRefreshTokens.splice(indexToDelete, 1);
}

export async function isRefreshTokenValid(refreshToken: string) {
    const foundToken = dummyRefreshTokens.find(token => token === refreshToken);
    return foundToken ? true : false;
}

export async function getProfile(username: string){
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile : null;
}

export async function getQuoteHistory(username: string){
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile?.quoteHistory : null;
    
}

export async function getPurchaseHistory(username: string){
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile?.purchaseHistory : null;
    
}

export async function generateQuote(username: string, gallonsRequested: number, deliveryDate: string, loc: string){
    const user = dummyUsersModel.find(user => user.username === username);
    const quoteHistory = user ? user.profile?.quoteHistory : null;

    //TODO: implement pricing module, for now it's a random constant
    const priceCalculated = Math.random();

    const quote = {
        _id: crypto.randomBytes(24 / 2).toString('hex'),
        generationDate: new Date(),
        gallonsRequested: gallonsRequested,
        priceCalculated: priceCalculated
    }

    quoteHistory?.push(quote);

    return quote;
}

export async function updateAccount(username: string, firstName?: string, middleName?: string, lastName?: string, location?: string){
    const user = dummyUsersModel.find(user => user.username === username);
    
    if (!user) {
        return;
    }
    
    let profile = user.profile;
    if (!profile) {
        profile = {
            _id: crypto.randomBytes(24 / 2).toString('hex'),
            firstName: '',
            middleName: '',
            lastName: '',
            location: '',
            quoteHistory: null,
            purchaseHistory: null,
            paymentInfo: null
        };
        user.profile = profile;
    }

    if (firstName !== undefined) {
        profile.firstName = firstName;
    }

    if (middleName !== undefined) {
        profile.middleName = middleName;
    }

    if (lastName !== undefined) {
        profile.lastName = lastName;
    }

    if (location !== undefined) {
        profile.location = location;
    }

    return profile;
}

export async function makePayment(username: string, price: number, companyName: string){
    const user = dummyUsersModel.find(user => user.username === username);
    const paymentInfo = user ? user.profile?.paymentInfo : null;

    if (!paymentInfo){
        return;
    }

    //beep beep credit card machine
    //imagine the credit card is being processed
    //$$$$$$$

    const company = dummyCompanyModel.find(cn => cn.name === companyName);

    if (!company){
        return;
    }
    
    company.revenue += price;

    return paymentInfo;
}