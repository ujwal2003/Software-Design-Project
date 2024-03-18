import crypto from "crypto";
import { dummyUsersModel, dummyRefreshTokens } from "../dummyDatabase";

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