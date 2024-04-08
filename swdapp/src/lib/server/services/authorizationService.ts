import { dummyRefreshTokens, dummyUsersModel } from "../dummyDatabase";
import { AuthorizationModel } from "../database/models/authorizeModel";

export async function getUserCredentials(username: string) {
    const foundUser = dummyUsersModel.find(user => user.username === username);

    return {
        username: foundUser!.username,
        encryptedPass: foundUser!.encryptedPassword
    };
}

export async function addUserRefreshSession(refreshToken: string) {
    dummyRefreshTokens.push(refreshToken); //! Remove this line after revoke function is implemented

    const session = await AuthorizationModel.create({ refToken: refreshToken });
}

export async function revokeRefreshToken(refreshToken: string) {
    //! Remove these lines after confirmation of db working
    const indexToDelete = dummyRefreshTokens.indexOf(refreshToken);
    if (indexToDelete !== -1)
        dummyRefreshTokens.splice(indexToDelete, 1);

    const revokeSession = await AuthorizationModel.deleteOne({ refToken: refreshToken });
}

export async function isRefreshTokenValid(refreshToken: string) {
    const foundToken = dummyRefreshTokens.find(token => token === refreshToken);
    return foundToken ? true : false;
}
