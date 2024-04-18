import { json } from '@sveltejs/kit';
import { generateQuote, getQuoteHistory, saveQuote } from "../services/quoteService";
import type { GeneralAPIResponse, UnauthorizedResponse } from '../customTypes/generalTypes';
import type { GenerateQuoteRequest, GenerateQuoteResponse, QuoteHistoryResponse, SaveQuoteRequest } from "../customTypes/quoteTypes";
import type { QuoteHistoryRequest } from "../customTypes/quoteTypes";
import { isAccessTokenValid_simple } from './authController';


export async function getQuoteHistoryData(requestBody: QuoteHistoryRequest): Promise<Response> {
    try {
        const { username, accessToken } = requestBody;

        if (!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, { status: 401 });
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

export async function generateQuoteData(requestBody: GenerateQuoteRequest): Promise<Response> {
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

        if (!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, { status: 401 });
        }

        const quote = await generateQuote(username, gallonsRequested, deliveryDate, loc);

        if (quote) {

            const response: GenerateQuoteResponse = {
                success: true,
                // _id: (quote as any)._id,
                generationDate: quote.generationDate,
                gallonsRequested: quote.gallonsRequested,
                priceCalculated: quote.priceCalculated,
                deliveryDate: quote.deliveryDate
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

export async function saveQuoteData(requestBody: SaveQuoteRequest): Promise<Response> {
    try {
        if(!await isAccessTokenValid_simple(requestBody.accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, { status: 401 });
        }

        const save = await saveQuote(requestBody.username, {
            gallonsRequested: requestBody.gallonsRequested,
            deliveryDate: requestBody.deliveryDate,
            generationDate: requestBody.generationDate,
            priceCalculated: requestBody.priceCalculated
        });

        if(save) {
            return json({
                success: true,
                message: 'succesfully saved quote'
            } as GeneralAPIResponse, { status: 200 });
        } else {
            return json({
                success: false,
                message: 'failed to save quote due to internal error'
            } as GeneralAPIResponse, { status: 500 });
        }
    } catch (error) {
        console.log("[SERVER] error on POST /api/quotes/save", error);
        return json({
            success: false,
            message: "Request failed due to error"
        } as GeneralAPIResponse, { status: 500 });
    }
}