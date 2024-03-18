import { json } from '@sveltejs/kit';
import { getQuoteHistoryData } from '$lib/server/controllers/profileController.js';
import type { QuoteHistoryRequest, QuoteHistoryResponse, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes.js';

export async function POST({ request }): Promise<Response> {
    try {
        const body: QuoteHistoryRequest = await request.json();
        return await getQuoteHistoryData(body);
    } catch (error) {
        console.log("[SERVER] error on POST /api/user", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
