import crypto from "crypto";
import { dummyUsersModel } from "../dummyDatabase";

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

export async function getProfile(username: string){
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile : null;
}

export async function getQuoteHistory(username: string){
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile?.quoteHistory : null;
    
}