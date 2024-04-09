import crypto from "crypto";
import { dummyCompanyModel, dummyUsersModel } from "../dummyDatabase";


export async function getPurchaseHistory(username: string) {
    const user = dummyUsersModel.find(user => user.username === username);

    return user ? user.profile?.purchaseHistory : null;

}

export async function updatePayment(username: string, cardName?: string, cardNum?: string, cvv?: string, expiry?: Date) {
    const user = dummyUsersModel.find(user => user.username === username);
    if (!user || !user.profile)
        return false;

    let userPayment = user.profile.paymentInfo;

    if (!userPayment) {
        userPayment = {
            _id: crypto.randomBytes(24 / 2).toString('hex'),
            cardName: '',
            creditCardNumber: '',
            cardCVV: '',
            cardExpiration: new Date(-8640000000000000)
        };
    }

    userPayment.cardName = cardName ? cardName : userPayment.cardName;
    userPayment.creditCardNumber = cardNum ? cardNum : userPayment.creditCardNumber;
    userPayment.cardCVV = cvv ? cvv : userPayment.cardCVV;
    userPayment.cardExpiration = expiry ? expiry : userPayment.cardExpiration;
    
    user.profile.paymentInfo = userPayment;

    return true;
}

export async function makePayment(username: string, price: number, companyName: string) {
    const user = dummyUsersModel.find(user => user.username === username);
    const paymentInfo = user ? user.profile?.paymentInfo : null;

    if (!paymentInfo) {
        return;
    }

    //beep beep credit card machine
    //imagine the credit card is being processed
    //$$$$$$$
    const company = dummyCompanyModel.find(cn => cn.name === companyName);

    if (!company) {
        console.log("Company not found");
        return;
    }

    company.revenue += price;
    let purchase = {
        _id: crypto.randomBytes(24 / 2).toString('hex'),
        quoteID: "",
        purchaseDate: new Date(),
        deliveryDate: new Date(),
        tax: (0.0625 * price),
        price: price - (0.0625 * price)
    };
    user?.profile?.purchaseHistory?.push(purchase);

    return paymentInfo;
}

