import { json } from '@sveltejs/kit';
import { getProfile, getQuoteHistory } from '../services/userService';
import type { GeneralAPIResponse, ProfileRequest, ProfileResponse, QuoteHistoryRequest, QuoteHistoryResponse } from '../customTypes/generalTypes';

export async function getProfileData(requestBody: ProfileRequest): Promise<Response>{
    try {
        const { username } = requestBody;
        const profile = await getProfile(username);

        if (profile) {

            const response: ProfileResponse = {
                success: true,
                _id: profile._id,
                firstName: profile.firstName,
                middleName: profile.middleName,
                lastName: profile.lastName,
                location: profile.location,
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Profile not found"
            } as GeneralAPIResponse, { status: 404 });
        }
    } catch (error) {
        console.log("[SERVER] error on GET /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}

export async function getQuoteHistoryData(requestBody: QuoteHistoryRequest): Promise<Response>{
    try {
        const { username } = requestBody;
        const hist = await getQuoteHistory(username);

        if (hist) {

            const response: QuoteHistoryResponse = {
                success: true,
                quoteHistory: hist
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Quote history not found"
            } as GeneralAPIResponse, { status: 404 });
        }
    } catch (error) {
        console.log("[SERVER] error on GET /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}