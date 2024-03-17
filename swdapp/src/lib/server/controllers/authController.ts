import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

import { userExists, getUserCredentials } from '../services/userService';
import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from '../customTypes/authTypes';

export async function loginUser(requestBody: LoginRequest): Promise<Response> {
    try {
        console.log("[SERVER] POST /api/auth/login recieved (controller):", requestBody);

        if(!await userExists(requestBody.username)) {
            return json({
                success: false,
                response: {
                    failType: 'invalid_user',
                    message: 'User not found'
                }
            } as LoginResponse<LoginFailure>, {status: 500});
        }

        let userCreds = await getUserCredentials(requestBody.username);
        if(await bcrypt.compare(requestBody.password, userCreds.encryptedPass)) {
            //TODO generate tokens
            return json({
                success: true,
                response: {
                    accessToken: 'succesfully logged in',
                    refreshToken: 'succesfully logged in'
                }
            } as LoginResponse<LoginSuccess>, {status: 200});
        }

        return json({
            success: false,
            response: {
                failType: 'invalid_pass',
                message: `invalid password for user ${requestBody.username}`
            }
        } as LoginResponse<LoginFailure>, {status: 500});
        
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/login (controller)", error);

        return json({
            success: false,
            response: {
                failType: 'error',
                message: 'login failed due to internal server error'
            }
        } as LoginResponse<LoginFailure>, {status: 500})
    }
}