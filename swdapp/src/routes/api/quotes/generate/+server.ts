import { json } from '@sveltejs/kit';
import { generateQuoteData } from '$lib/server/controllers/profileController.js';
import type { GeneralAPIResponse } from '$lib/server/customTypes/generalTypes.js';
import type { GenerateQuoteRequest } from "$lib/server/customTypes/quoteTypes";

export async function POST({ request }): Promise<Response> {
    try {
        const body: GenerateQuoteRequest = await request.json();
        return await generateQuoteData(body);
    } catch (error) {
        console.log("[SERVER] error on POST /api/user", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
