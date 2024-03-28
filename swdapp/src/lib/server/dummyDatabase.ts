export interface dummyQuoteSchema {
    _id: string,
    generationDate: Date,
    gallonsRequested: number,
    priceCalculated: number
};

export interface dummyReceiptSchema {
    _id: string,
    quoteID: string,
    purchaseDate: Date,
    deliveryDate: Date,
    tax: number
};

export interface dummyPaymentInfoSchema {
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
    quoteHistory: dummyQuoteSchema[] | null,
    purchaseHistory: dummyReceiptSchema[] | null,
    paymentInfo: dummyPaymentInfoSchema | null
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
    name: string,
    revenue: number,
    cost: number,
    financeDate: Date
};

export const dummyRefreshTokens: string[] = [];

export const dummyUsersModel: dummyUserSchema[] = [
    {
        _id: "1bd3702148b259c41ab0265a",
        username: "dummyUser1",
        // encryptedPassword: "unsecurePassword1",
        encryptedPassword: '$2b$10$VW2QCJqr6PvQuG36O7Og5OULxMpz.AzXbnKdwClMqwTIZkMyU.T8u',
        isAdmin: false,
        profile: null
    },

    {
        _id: "bf86507fd94451f9fdbe5a3f",
        username: "dummyUser2",
        // encryptedPassword: "usecurePassword2",
        encryptedPassword: '$2b$10$VW2QCJqr6PvQuG36O7Og5OcuXpnG7Egj9pqyeYYbi/gpR3CylqQ9u',
        isAdmin: false,
        profile: {
            _id: "c82c60b5b45c6da3d98635b7",
            firstName: "fName1",
            middleName: "",
            lastName: "lName1",
            location: "loc1",
            quoteHistory: [],
            purchaseHistory: [],
            paymentInfo: null
        }
    },

    {
        _id: "d88bc7b7368548e1e45b018a",
        username: "dummyUser3",
        // encryptedPassword: "unsecurePassword3",
        encryptedPassword: '$2b$10$VW2QCJqr6PvQuG36O7Og5OlSgYRX3BRxhq5ZF9J6a46KLzUSFYIC2',
        isAdmin: false,
        profile: {
            _id: "cf7226e79ea6c264b5675b12",
            firstName: "fname2",
            middleName: "mName2",
            lastName: "lName2",
            location: "loc2",
            quoteHistory: [
                {
                    _id: "9e8e9a6bcc756b25eb1bef22",
                    generationDate: new Date("2024-02-25"),
                    gallonsRequested: 5,
                    priceCalculated: 2.65
                },
                {
                    _id: "a53b59be0a4182fb778de339",
                    generationDate: new Date("2024-01-20"),
                    gallonsRequested: 3,
                    priceCalculated: 3.65
                },
                {
                    _id: "8272a0022599956bcb1659ee",
                    generationDate: new Date("2023-01-15"),
                    gallonsRequested: 5,
                    priceCalculated: 1.65
                },
            ],
            purchaseHistory: [],
            paymentInfo: {
                _id: "9e35198f5ad29c78b6fd2828",
                creditCardNumber: "5844203091667951",
                cardExpiration: new Date("2026-05-01"),
                cardCVV: "345"
            }
        }
    },

    {
        _id: "d5d5816c5beb8b39ed15ff2d",
        username: "dummyUser4",
        // encryptedPassword: "unsecurePassword4",
        encryptedPassword: '$2b$10$VW2QCJqr6PvQuG36O7Og5OgGvSQSVIbUnmWlq2pzs0pDQnR59Nt6W',
        isAdmin: false,
        profile: {
            _id: "55d027ba16a3ef7a10b78c9f",
            firstName: "fName3",
            middleName: "",
            lastName: "lName3",
            location: "loc3",
            quoteHistory: [
                {
                    _id: "28526d313bc11f3f84a38cb7",
                    generationDate: new Date("2024-02-05"),
                    gallonsRequested: 3,
                    priceCalculated: 3.14
                },
                {
                    _id: "311650601c91eb0501b75a98",
                    generationDate: new Date("2024-02-10"),
                    gallonsRequested: 5,
                    priceCalculated: 10.75
                },
                {
                    _id: "a871c20e4d539d8908f4b98c",
                    generationDate: new Date("2024-02-15"),
                    gallonsRequested: 7,
                    priceCalculated: 11.72
                },
                {
                    _id: "3076648b7817570245901a01",
                    generationDate: new Date("2024-02-20"),
                    gallonsRequested: 8,
                    priceCalculated: 23.75
                },
                {
                    _id: "b991d60266e4a73503571c61",
                    generationDate: new Date("2024-02-25"),
                    gallonsRequested: 2,
                    priceCalculated: 2.19
                },
                {
                    _id: "2593b58ba4dc28e2b4e1edbd",
                    generationDate: new Date("2024-02-30"),
                    gallonsRequested: 4,
                    priceCalculated: 15.41
                },
            ],
            purchaseHistory: [
                {
                    _id: "4319cc4aaff141ff0d93ffb2",
                    quoteID: "311650601c91eb0501b75a98",
                    purchaseDate: new Date("2024-03-10"),
                    deliveryDate: new Date("2024-03-11"),
                    tax: 2.10
                },
                {
                    _id: "aeae92d4b6478cb65d2fc6c8",
                    quoteID: "b991d60266e4a73503571c61",
                    purchaseDate: new Date("2024-03-18"),
                    deliveryDate: new Date("2024-03-19"),
                    tax: 4.52
                },
                {
                    _id: "777287681d68d56ebac8e635",
                    quoteID: "2593b58ba4dc28e2b4e1edbd",
                    purchaseDate: new Date("2024-03-22"),
                    deliveryDate: new Date("2024-03-24"),
                    tax: 5.72
                }
            ],
            paymentInfo: {
                _id: "03d895ad8ea604df81b5742d",
                creditCardNumber: "0410012782701014",
                cardExpiration: new Date("2027-05-01"),
                cardCVV: "543"
            }
        }
    },

    {
        _id: "21621acba25ce6f771419831",
        username: "admin1",
        // encryptedPassword: "unsecureImportantPassword",
        encryptedPassword: '$2b$10$VW2QCJqr6PvQuG36O7Og5OKcxorXtQvPNo3EeXOcqG/7glpso51lu',
        isAdmin: true,
        profile: null
    }
];

export const dummyCompanyModel: dummyCompanySchema[] = [
    {
        _id: "0a0813d28db9cbc16fcb8347",
        name: "Exxon",
        revenue: 73.52,
        cost: 39.88,
        financeDate: new Date("2024-03-10")
    },

    {
        _id: "829a060c4f3470ec0f8b3ced",
        name: "Shell",
        revenue: 130.58,
        cost: 15.85,
        financeDate: new Date("2024-03-18")
    },

    {
        _id: "9cad77be2ad1fcb90284c3de",
        name: "Chevron",
        revenue: 66.50,
        cost: 40.25,
        financeDate: new Date("2024-03-22")
    }
];

