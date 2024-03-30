import { json } from '@sveltejs/kit';
import { updateAccountData } from '$lib/server/controllers/profileController.js';
import type { UpdateAccountRequest, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes.js';

export async function PATCH({ request }): Promise<Response> {
    try {
        const body: UpdateAccountRequest = await request.json();
        return await updateAccountData(body);
    } catch (error) {
        console.log("[SERVER] error on PATCH /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
