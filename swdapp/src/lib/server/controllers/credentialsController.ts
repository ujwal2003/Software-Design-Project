import { json } from "@sveltejs/kit";
import type { LoginFailure, LoginRequest, LoginResponse, UpdateUsernameRequest } from "../customTypes/authTypes";
import { updateUsername, userExists } from "../services/userService";
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