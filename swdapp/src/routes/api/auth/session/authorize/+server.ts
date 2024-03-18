import { json } from "@sveltejs/kit";
import { reauthorizeUser } from "$lib/server/controllers/authController";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";

export async function POST({request}): Promise<Response> {
    try {
        const body = await request.json();
        return await reauthorizeUser(body);

    } catch (error) {
        console.log("[SERVER] access token authorization route error", error)
        return json({
            success: false,
            message: "failed to generate new access token due to internal server error"
        } as GeneralAPIResponse, {status: 500});
    }
}