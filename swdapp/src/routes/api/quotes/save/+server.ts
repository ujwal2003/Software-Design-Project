import { saveQuoteData } from "$lib/server/controllers/quoteController.js";
import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";
import type { SaveQuoteRequest } from "$lib/server/customTypes/quoteTypes.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }): Promise<Response> {
    try {
        const body: SaveQuoteRequest = await request.json();
        return await saveQuoteData(body);
    } catch (error) {
        console.log("[SERVER] error on POST /api/quotes/save", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}