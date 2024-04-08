import { dummyRefreshTokens, dummyUsersModel } from "../dummyDatabase";
import { AuthorizationModel } from "../database/models/authorizeModel";

export async function getUserCredentials(username: string) {
    //! Refactor this function when implementing user schema
    const foundUser = dummyUsersModel.find(user => user.username === username);

    return {
        username: foundUser!.username,
        encryptedPass: foundUser!.encryptedPassword
    };
}

export async function addUserRefreshSession(refreshToken: string) {
    const session = await AuthorizationModel.create({ refToken: refreshToken });
}

export async function revokeRefreshToken(refreshToken: string) {
    const revokeSession = await AuthorizationModel.deleteOne({ refToken: refreshToken });
}

export async function isRefreshTokenValid(refreshToken: string) {
    const validToken = await AuthorizationModel.findOne({ refToken: refreshToken }).exec();
    // console.log(validToken);
    
    if(validToken == null)
        return false;

    return true;
}
