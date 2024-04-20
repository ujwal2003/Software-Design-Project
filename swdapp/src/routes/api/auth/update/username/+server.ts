import { json } from "@sveltejs/kit";
import type { UpdateUsernameRequest } from "$lib/server/customTypes/authTypes.js";
import { updateCredUsername } from "$lib/server/controllers/credentialsController.js";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes.js";

export async function PATCH({request}): Promise<Response> {
    try {
        const body: UpdateUsernameRequest = await request.json();
        return await updateCredUsername(body);
        
    } catch (error) {
        console.log("[SERVER] error on POST /api/auth/update/username", error);

        return json({
            success: false,
            message: `failed to update username due to internal server error`
        } as GeneralAPIResponse, {status: 500});
    }
}