import { json } from "@sveltejs/kit";
import { accessTokenStatus } from "$lib/server/controllers/authController";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";

export async function POST({request}): Promise<Response> {
    try {
        const body = await request.json();
        return await accessTokenStatus(body);

    } catch (error) {
        console.log("[SERVER] access token verification route error", error)
        return json({
            success: false,
            message: "failed to verify token due to internal server error"
        } as GeneralAPIResponse, {status: 500});
    }
}