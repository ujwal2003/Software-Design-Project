import * as bcrypt from 'bcrypt';
import { json } from '@sveltejs/kit';

interface RegistrationRequest {
    username: string,
    password: string
};

export async function POST({request}): Promise<Response> {
    try {
        const body: RegistrationRequest = await request.json();
    
        console.log("[SERVER] POST /api/auth/register recieved: ", body);
    
        //TODO: check if user already exists
    
        return json({
            success: true,
            response: `Succesfully registered ${body.username}`
        }, {status: 201});
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/register", error);

        return json({
            success: false,
            response: {
                message: "Request failed due to error",
                err: error
            }
        }, {status: 500});
    }
}