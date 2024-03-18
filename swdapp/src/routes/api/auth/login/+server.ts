import { json } from "@sveltejs/kit";
import { loginUser } from "$lib/server/controllers/authController";
import type { LoginFailure, LoginRequest, LoginResponse } from "$lib/server/customTypes/authTypes.js";

export async function POST({request}): Promise<Response> {
    try {
        const body: LoginRequest = await request.json();
        return await loginUser(body);
        
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/login", error);

        return json({
            success: false,
            response: {
                failType: "error",
                message: 'login failed due to internal server error'
            }
        } as LoginResponse<LoginFailure>, {status: 500});
    }
}