import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes.js";
import { json } from "@sveltejs/kit";

export async function GET({ request }): Promise<Response> {
    try {
        return json({
            success: true,
            message: 'server is online'
        } as GeneralAPIResponse);
    } catch (error) {
        return json({
            success: false,
            message: 'an error occured initializing the server'
        } as GeneralAPIResponse)
    }
}