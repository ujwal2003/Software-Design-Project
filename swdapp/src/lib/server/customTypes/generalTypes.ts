import type { dummyQuoteSchema, dummyReceiptSchema } from '../dummyDatabase';

export interface GeneralAPIResponse {
    success: boolean,
    message: string
};

export interface UnauthorizedResponse {
    success: boolean,
    unauthorized: boolean,
    message: "invalid access token"
}

export interface ProfileRequest {
    username: string,
    accessToken: string
}

export interface ProfileResponse {
    success: boolean,
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    location: string,
}

export interface QuoteHistoryRequest {
    username: string,
    accessToken: string
}

export interface QuoteHistoryResponse {
    success: boolean,
    quoteHistory: dummyQuoteSchema[]
}

export interface PurchaseHistoryRequest {
    username: string,
    accessToken: string
}

export interface PurchaseHistoryResponse {
    success: boolean,
    purchaseHistory: dummyReceiptSchema[]
}

export interface GenerateQuoteRequest {
    username: string,
    accessToken: string,
    gallonsRequested: number,
    deliveryDate: string,
    loc: string
}

export interface GenerateQuoteResponse {
    success: boolean,
    _id: string,
    generationDate: Date,
    gallonsRequested: number,
    priceCalculated: number
}

export interface UpdateAccountRequest {
    username: string,
    accessToken: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    location?: string
}

export interface MakePaymentRequest {
    username: string,
    accessToken: string,
    company: string,
    price: number
}