import { json } from '@sveltejs/kit';
import { registerUser } from '$lib/server/controllers/authController.js';
import type { RegistrationRequest, RegistrationResponse } from '$lib/server/customTypes/authTypes.js';

export async function POST({request}): Promise<Response> {
    try {
        const body: RegistrationRequest = await request.json();
        return await registerUser(body);
        
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