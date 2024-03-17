import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

import type { LoginFailure, LoginRequest, LoginResponse } from '../customTypes/authTypes';

export async function loginUser(requestBody: LoginRequest): Promise<Response> {
    try {
        
    } catch (error) {
        return json({
            success: false,
            response: {
                failType: 'error',
                message: 'login failed due to internal server error'
            }
        } as LoginResponse<LoginFailure>, {status: 500})
    }
    
    return json(null);
}