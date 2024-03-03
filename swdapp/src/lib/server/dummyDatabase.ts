interface dummyQuoteSchema {
    _id: string,
    generationDate: Date,
    gallonsRequested: number,
    priceCalculated: number
};

interface dummyReceiptSchema {
    _id: string,
    quoteID: string,
    purchaseDate: Date,
    deliveryDate: Date,
    tax: number
};

interface dummyPaymentInfoSchema {
    _id: string,
    creditCardNumber: string,
    cardExpiration: Date,
    cardCVV: string
};

interface dummyProfileSchema {
    _id: string,
    firstName: string,
    middleName: string,
    lastName: string,
    location: string,
    quoteHistory: dummyQuoteSchema[],
    purchaseHistory: dummyReceiptSchema[],
    paymentInfo: dummyPaymentInfoSchema | null,
};

interface dummyUserSchema {
    _id: string,
    username: string,
    encryptedPassword: string,
    isAdmin: boolean,
    profile: dummyProfileSchema | null
};

interface dummyCompanySchema {
    _id: string,
    revenue: Number,
    cost: Number,
    financeDate: Date
};

export const dummyUsersModel: dummyUserSchema[] = [];

export const dummyCompanyModel: dummyCompanySchema[] = [];