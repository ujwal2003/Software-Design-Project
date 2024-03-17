import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';

import { userExists, getUserCredentials, addUserRefreshSession } from '../services/userService';
import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from '../customTypes/authTypes';

export function generateAccessToken(user: string) {
    return jwt.sign({username: user}, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

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
            console.log(`[SERVER] ${requestBody.username} has succesfully authenticated`);

            const refreshToken = jwt.sign({username: requestBody.username}, REFRESH_TOKEN_SECRET);
            const accessToken = generateAccessToken(requestBody.username);

            addUserRefreshSession(refreshToken);

            return json({
                success: true,
                response: {
                    accessToken: accessToken,
                    refreshToken: refreshToken
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