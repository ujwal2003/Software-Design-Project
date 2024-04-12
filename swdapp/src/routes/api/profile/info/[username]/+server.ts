import { json } from '@sveltejs/kit';
import { getProfileData } from '$lib/server/controllers/profileController.js';
import type { ProfileRequest, GeneralAPIResponse } from '$lib/server/customTypes/generalTypes.js';

export async function GET({ request, params }): Promise<Response> {
    try {
        const { username } = params;
        const accToken = request.headers.get('access-token');
        
        const body: ProfileRequest = {
            username: username,
            accessToken: accToken ? accToken : ''
        };

        return await getProfileData(body);
    } catch (error) {
        console.log("[SERVER] error on GET /api/user", error);

        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}
