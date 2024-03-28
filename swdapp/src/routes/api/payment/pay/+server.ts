import { json } from '@sveltejs/kit';
import { makePaymentMethod } from '$lib/server/controllers/profileController.js';
import type {GeneralAPIResponse, MakePaymentRequest } from '$lib/server/customTypes/generalTypes.js';

export async function POST({ request }): Promise<Response> {
    try {
        const body: MakePaymentRequest = await request.json();
        return await makePaymentMethod(body);
    } catch (error) {
        console.log("[SERVER] error on POST /api/user", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
