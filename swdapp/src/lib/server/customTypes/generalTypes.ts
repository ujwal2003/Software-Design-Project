import type { dummyQuoteSchema } from '../dummyDatabase';

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