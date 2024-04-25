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
    profile: {
        firstName: string,
        middleName: string,
        lastName: string,
        street: string,
        state: string,
        city: string,
        zip: string
    } | null,
    paymentInfo: {
        cardName: string,
        cardNumber: string,
        expiration: Date,
        cardCVV: string
    } | null
}

export interface PurchaseHistoryRequest {
    username: string,
    accessToken: string
}

export interface PurchaseHistoryResponse {
    success: boolean,
    purchaseHistory: Array<any>
}

export interface UpdateAccountRequest {
    username: string,
    accessToken: string,
    profileUpdates? : {
        firstName?: string,
        middleName?: string,
        lastName?: string,
        street?: string,
        state?: string,
        city?: string,
        zip?: string
    },
    paymentUpdates? : {
        cardName?: string,
        cardNum?: string, 
        cvv?: string, 
        expiry?: Date
    }
}

export interface MakePaymentRequest {
    username: string,
    accessToken: string,
    company: string,
    price: number,
    quoteID: string
}