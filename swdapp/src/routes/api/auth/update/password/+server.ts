import { json } from "@sveltejs/kit";
import type { UpdatePasswordRequest } from "$lib/server/customTypes/authTypes.js";
import { updateCredPassword } from "$lib/server/controllers/credentialsController.js";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes.js";

export async function PATCH({request}): Promise<Response> {
    try {
        const body: UpdatePasswordRequest = await request.json();
        return await updateCredPassword(body);
        
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/update/password", error);

        return json({
            success: false,
            message: `failed to update password due to internal server error`
        } as GeneralAPIResponse, {status: 500});
    }
}