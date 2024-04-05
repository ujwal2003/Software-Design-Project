import { json } from '@sveltejs/kit';
import { getProfile, getQuoteHistory, generateQuote, updateAccount } from '../services/userService';
import { makePayment } from "../services/paymentService";
import { updatePayment } from "../services/paymentService";
import { getPurchaseHistory } from "../services/paymentService";
import type { GeneralAPIResponse, ProfileRequest, ProfileResponse, QuoteHistoryRequest, QuoteHistoryResponse, PurchaseHistoryResponse, UnauthorizedResponse, GenerateQuoteRequest, GenerateQuoteResponse, UpdateAccountRequest, MakePaymentRequest } from '../customTypes/generalTypes';
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
            const profilePaymentInfo = profile.paymentInfo;
            const resPaymentInfo = profilePaymentInfo ? {
                cardName: profilePaymentInfo.cardName,
                cardNumber: profilePaymentInfo.creditCardNumber,
                expiration: profilePaymentInfo.cardExpiration,
                cardCVV: profilePaymentInfo.cardCVV
            } : null;

            const response: ProfileResponse = {
                success: true,
                profile: {
                    firstName: profile.firstName,
                    middleName: profile.middleName,
                    lastName: profile.lastName,
                    city: profile.city,
                    state: profile.state,
                    street: profile.street,
                    zip: profile.zip
                },

                paymentInfo: resPaymentInfo
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

export async function updateAccountData(requestBody: UpdateAccountRequest): Promise<Response>{
    try {
        const { username, accessToken } = requestBody;

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

        let updatedProfile: any;
        if(requestBody.profileUpdates) {
            const { firstName, middleName, lastName, street, city, state, zip } = requestBody.profileUpdates;
            updatedProfile = await updateAccount(username, firstName, middleName, lastName, city, state, street, zip);
        } else {
            updatedProfile = true;
        }

        let updatedPayment: boolean;
        if(requestBody.paymentUpdates) {
            const { cardName, cardNum, cvv, expiry } = requestBody.paymentUpdates;
            updatedPayment = await updatePayment(username, cardName, cardNum, cvv, expiry);
        } else {
            updatedPayment = true;
        }


        if (updatedProfile && updatedPayment) {
            const response: GeneralAPIResponse = {
                success: true,
                message: "Account update successful"
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Account update failed"
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

export async function makePaymentMethod(requestBody: MakePaymentRequest): Promise<Response>{
    try {
        const { username, accessToken, company, price } = requestBody;

        if(!await isAccessTokenValid_simple(accessToken)) {
            return json({
                success: true,
                unauthorized: true,
                message: 'invalid access token'
            } as UnauthorizedResponse, {status: 401});
        }

        const pay = await makePayment(username, price, company);

        if (pay) {
            const response: GeneralAPIResponse = {
                success: true,
                message: "Payment successful"
            };
            return json(response, { status: 200 });
        } else {
            return json({
                success: false,
                message: "Payment failed"
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