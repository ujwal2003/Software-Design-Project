import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';

import { userExists, getUserCredentials, addUserRefreshSession, isRefreshTokenValid } from '../services/userService';
import type { LoginFailure, LoginRequest, LoginResponse, LoginSuccess } from '../customTypes/authTypes';
import type { GeneralAPIResponse } from '../customTypes/generalTypes';

export function generateAccessToken(user: string) {
    return jwt.sign({username: user}, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

export function isAccessTokenValid(token: string) {
    try {
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        return {
            valid: true,
            payload: decoded
        }
    } catch (error) {
        return {
            valid: false
        }
    }
}

export async function accessTokenStatus(requestBody: {accessToken: string}): Promise<Response> {
    try {
        let status = isAccessTokenValid(requestBody.accessToken);

        if(status.valid) {
            return json({
                success: true,
                valid: true,
                message: 'token is still valid',
                payload: status.payload
            }, {status: 200})
        }
        
        return json({
            success: true,
            valid: false,
            message: 'token has expired'
        }, {status: 200});
    } catch (error) {
        console.log("[SERVER] access token verification controller error", error)
        return json({
            success: false,
            message: "failed to verify token due to internal server error"
        } as GeneralAPIResponse, {status: 500});
    }
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

export async function authorizeUser(requestBody: {username: string, refreshToken: string}): Promise<Response> {
    try {
        if(!requestBody.refreshToken) {
            return json({
                success: false,
                message: 'no token provided'
            } as GeneralAPIResponse, {status: 401});
        }

        if(!isRefreshTokenValid(requestBody.refreshToken)) {
            return json({
                success: false,
                message: 'invalid token provided'
            } as GeneralAPIResponse, {status: 403});
        }

        try {
            const decoded = jwt.verify(requestBody.refreshToken, REFRESH_TOKEN_SECRET);

            return json({
                success: true,
                payload: decoded,
                newAccessToken: generateAccessToken(requestBody.username)
            }, {status: 200});

        } catch (error) {
            return json({
                success: false,
                message: 'failed to verify token'
            } as GeneralAPIResponse, {status: 403});
        }
    } catch (error) {
        return json({
            success: false,
            message: "failed to authorize due to internal server error"
        } as GeneralAPIResponse, {status: 500});
    }
}

