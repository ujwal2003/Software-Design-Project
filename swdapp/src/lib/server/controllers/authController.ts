import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

import { userExists, addUser } from '../services/userService';
import type { RegistrationRequest, RegistrationResponse } from '../customTypes/authTypes';

export async function registerUser(requestBody: RegistrationRequest): Promise<Response> {
    try {
        console.log("[SERVER] POST /api/auth/register recieved (controller):", requestBody);
    
        if(await userExists(requestBody.username)) {
            return json({
                success: false,
                response: {
                    failType: 'exists',
                    message: `${requestBody.username} is already registered`
                }
            } as RegistrationResponse, {status: 500});
        }

        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(requestBody.password, salt);
        let newUser = await addUser(requestBody.username, hashedPass);

        console.log("[SERVER] new user registered (controller):", newUser);

        return json({
            success: true,
            response: `Succesfully registered ${requestBody.username}`
        } as RegistrationResponse, {status: 201});

    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/register (controller)", error);

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