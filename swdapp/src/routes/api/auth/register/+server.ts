import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

import { userExists, addUser } from '$lib/server/services/userService.js';

interface RegistrationRequest {
    username: string,
    password: string
};

interface FailResponse {
    failType: "error" | "exists",
    message: string,
    err?: any
}

interface RegistrationResponse {
    success: boolean,
    response: string | FailResponse
};

export async function POST({request}): Promise<Response> {
    try {
        const body: RegistrationRequest = await request.json();
    
        console.log("[SERVER] POST /api/auth/register recieved: ", body);
    
        if(await userExists(body.username)) {
            return json({
                success: false,
                response: {
                    failType: 'exists',
                    message: `${body.username} is already registered`
                }
            } as RegistrationResponse, {status: 500});
        }

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(body.password, salt);
        let newUser = await addUser(body.username, hashedPass);

        console.log("[SERVER] new user registered:", newUser);
    
        return json({
            success: true,
            response: `Succesfully registered ${body.username}`
        } as RegistrationResponse, {status: 201});
        
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/register", error);

        return json({
            success: false,
            response: {
                failType: 'error',
                message: "Request failed due to error",
                err: error
            }
        } as RegistrationResponse, {status: 500});
    }
}