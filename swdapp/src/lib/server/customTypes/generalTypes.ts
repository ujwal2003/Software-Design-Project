import type { dummyQuoteSchema, dummyReceiptSchema, dummyPaymentInfoSchema } from '../dummyDatabase';

export interface GeneralAPIResponse {
    success: boolean,
    message: string
};

export interface ProfileRequest {
    username: string
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
    username: string
}

export interface QuoteHistoryResponse {
    success: boolean,
    quoteHistory: dummyQuoteSchema[]
}