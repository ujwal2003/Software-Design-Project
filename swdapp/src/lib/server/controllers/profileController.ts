import { json } from '@sveltejs/kit';
import { getProfile, getQuoteHistory, getPurchaseHistory, generateQuote } from '../services/userService';
import type { GeneralAPIResponse, ProfileRequest, ProfileResponse, QuoteHistoryRequest, QuoteHistoryResponse, PurchaseHistoryResponse, UnauthorizedResponse, GenerateQuoteRequest, GenerateQuoteResponse } from '../customTypes/generalTypes';
import { isAccessTokenValid_simple } from './authController';

export async function getProfileData(requestBody: ProfileRequest): Promise<Response>{
    try {
        const { username, accessToken } = requestBody;

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

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
        console.log("[SERVER] error on POST /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}

export async function getQuoteHistoryData(requestBody: QuoteHistoryRequest): Promise<Response>{
    try {
        const { username, accessToken } = requestBody;

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

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
        console.log("[SERVER] error on POST /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}

export async function getReceipts(requestBody: QuoteHistoryRequest): Promise<Response>{
    try {
        const { username, accessToken } = requestBody;

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

        const hist = await getPurchaseHistory(username);

        if (hist) {

            const response: PurchaseHistoryResponse = {
                success: true,
                purchaseHistory: hist
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Purchase history not found"
            } as GeneralAPIResponse, { status: 404 });
        }
    } catch (error) {
        console.log("[SERVER] error on POST /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}

export async function generateQuoteData(requestBody: GenerateQuoteRequest): Promise<Response>{
    try {
        const { username, accessToken, gallonsRequested, deliveryDate, loc } = requestBody;

        if (typeof username !== 'string' ||
            typeof accessToken !== 'string' ||
            typeof gallonsRequested !== 'number' ||
            typeof deliveryDate !== 'string' ||
            typeof loc !== 'string') {
            throw new Error('Invalid request body');
        }

        const parsedDeliveryDate = new Date(deliveryDate);

        if (isNaN(parsedDeliveryDate.getTime())) {
            throw new Error('Invalid deliveryDate format');
        }

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

        const quote = await generateQuote(username, gallonsRequested, deliveryDate, loc);

        if (quote) {

            const response: GenerateQuoteResponse = {
                success: true,
                _id: quote._id,
                generationDate: quote.generationDate,
                gallonsRequested: quote.gallonsRequested,
                priceCalculated: quote.priceCalculated
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Quote could not be generated"
            } as GeneralAPIResponse, { status: 404 });
        }
    } catch (error) {
        console.log("[SERVER] error on POST /api/user", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}

