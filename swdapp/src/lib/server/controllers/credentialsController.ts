import { json } from "@sveltejs/kit";
import * as bcrypt from 'bcrypt';
import type { LoginFailure, LoginRequest, LoginResponse, UpdatePasswordRequest, UpdateUsernameRequest } from "../customTypes/authTypes";
import { updateEncryptedPassword, updateUsername, userExists } from "../services/userService";
import { getUserCredentials } from "../services/authorizationService";
import type { GeneralAPIResponse } from "../customTypes/generalTypes";
import { isAccessTokenValid_simple } from "./authController";

export async function updateCredUsername(requestBody: UpdateUsernameRequest): Promise<Response> {
    try {
        if(!await isAccessTokenValid_simple(requestBody.accessToken)) {
            return json({
                success: false,
                message: "invalid access token"
            } as GeneralAPIResponse, {status: 500});
        }

        if(await userExists(requestBody.newUsername)) {
            return json({
                success: false,
                message: `${requestBody.newUsername} is an existing user, please choose a different username`
            } as GeneralAPIResponse, {status: 500});
        }

        let updatedUsername = await updateUsername(requestBody.currentUsername, requestBody.newUsername);
        if(!updatedUsername) {
            return json({
                success: false,
                message: `${requestBody.currentUsername} does not exist`
            } as GeneralAPIResponse, {status: 500});
        }
        
        return json({
            success: true,
            message: `succesfully updated username of ${requestBody.currentUsername} to ${requestBody.newUsername}`
        } as GeneralAPIResponse, {status: 200});
    } catch (error) {
        return json({
            success: false,
            message: `failed to update username of ${requestBody.currentUsername} to ${requestBody.newUsername} due to internal server error`
        } as GeneralAPIResponse, {status: 500});
    }
}

export async function updateCredPassword(requestBody: UpdatePasswordRequest): Promise<Response> {
    try {
        if(!await isAccessTokenValid_simple(requestBody.accessToken)) {
            return json({
                success: false,
                message: "invalid access token"
            } as GeneralAPIResponse, {status: 500});
        }

        if(!await userExists(requestBody.username)) {
            return json({
                success: false,
                message: `User ${requestBody.username} does not exist`
            } as GeneralAPIResponse, {status: 500});
        }

        let userCreds = await getUserCredentials(requestBody.username);
        if(userCreds && await bcrypt.compare(requestBody.currentPassword, userCreds.encryptedPass)) {
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(requestBody.newPassword, salt);
            let newPass = await updateEncryptedPassword(requestBody.username, hashedPass);

            if(!newPass) {
                return json({
                    success: false,
                    message: `User ${requestBody.username} not found`
                } as GeneralAPIResponse, {status: 500});
            }

            return json({
                success: true,
                message: `Succesfully updated password`
            } as GeneralAPIResponse, {status: 200});
        }
        
        return json({
            success: false,
            message: `current password of ${requestBody.username} is invalid`
        } as GeneralAPIResponse, {status: 500});
    } catch (error) {
        return json({
            success: false,
            message: `failed to update password of ${requestBody.username} due to internal server error`
        } as GeneralAPIResponse, {status: 500});
    }
}