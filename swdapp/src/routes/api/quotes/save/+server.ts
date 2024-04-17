import type { GeneralAPIResponse } from "$lib/server/customTypes/generalTypes";
import { json } from "@sveltejs/kit";

export async function POST({ request }): Promise<Response> {
    try {
        return json(null);
    } catch (error) {
        console.log("[SERVER] error on POST /api/quotes/save", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}