import { json } from '@sveltejs/kit';
import type { LogOutRequest, LogOutResponse } from '$lib/server/customTypes/authTypes.js';
import { logOutUser } from '$lib/server/controllers/authController.js';

export async function DELETE({request}): Promise<Response> {
    try {
        const body: LogOutRequest = await request.json();
        return await logOutUser(body);
        
    } catch (error) {
        console.log("[SERVER] error on DELETE /api/auth/logout route", error);

        return json({
            success: false,
            message: `failed to log out user due to internal server error`
        } as LogOutResponse, {status: 500});
    }
}