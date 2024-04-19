export interface QuoteHistoryRequest {
    username: string;
    accessToken: string;
}

export interface QuoteHistoryResponse {
    success: boolean
    quoteHistory: Array<any>
}

export interface GenerateQuoteRequest {
    username: string
    accessToken: string
    gallonsRequested: number
    deliveryDate: string
    loc: string
}

export interface GenerateQuoteResponse {
    success: boolean
    // _id: string,
    generationDate: Date
    gallonsRequested: number
    priceCalculated: number
    deliveryDate: Date
}

export type SaveQuoteRequest = Omit<GenerateQuoteResponse, "success"> & QuoteHistoryRequest & {location: string}