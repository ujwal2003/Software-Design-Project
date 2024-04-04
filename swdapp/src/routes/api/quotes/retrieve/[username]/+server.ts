import { json } from '@sveltejs/kit';
import { getQuoteHistoryData } from '$lib/server/controllers/profileController.js';
import type { QuoteHistoryRequest, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes.js';

export async function GET({ request, params }): Promise<Response> {
    try {
        const { username } = params;
        const accToken = request.headers.get('access-token');
        
        const body: QuoteHistoryRequest = {
            username: username,
            accessToken: accToken ? accToken : ''
        };

        return await getQuoteHistoryData(body);
    } catch (error) {
        console.log("[SERVER] error on GET /api/user", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
