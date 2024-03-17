import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

import type { LoginRequest, LoginResponse } from '../customTypes/authTypes';

export async function loginUser(requestBody: LoginRequest): Promise<Response> {
    try {
        
    } catch (error) {
        return json({}, {status: 500})
    }
    
    return json(null);
}