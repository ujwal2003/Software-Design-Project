import crypto from "crypto";
import { userExists } from "./userService";
import { UserModel } from "../database/models/userModel";


export async function getPurchaseHistory(username: string) {
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    return user.profile.purchaseHistory;
}

export async function updatePayment(username: string, cardName?: string, cardNum?: string, cvv?: string, expiry?: Date) {
    let user = await userExists(username);

    if (!user || !user.profile)
        return false;

    let userPayment = user.profile.paymentInfo;
    let updateObj = {};

    if (!userPayment) {
        updateObj = {
            cardName: '',
            creditCardNumber: '',
            cardExpiration: new Date(-8640000000000000),
            cardCVV: ''
        };

        let newPaymentProfile = await UserModel.updateOne({ username: username }, {
            $set: { 'profile.paymentInfo': updateObj }
        });
    }

    updateObj = {};
    const updateParams = {cardName, cardNum, cvv, expiry};

    for(let key in updateParams) {
        let val = updateParams[key as keyof typeof updateParams];

        if(key == 'cardNum')
            key = 'creditCardNumber';

        if(key == 'cvv')
            key = 'cardCVV';

        if(key == 'expiry')
            key = 'cardExpiration';

        if(val) {
            if(key == 'expiry') {
                val = new Date(val);
            }

            (updateObj as any)[key] = val;
        }
    }

    updateObj = updateObj ? updateObj : {};
    if(updateObj) {
        let updatedPaymentProfile = await UserModel.updateOne({ username: username }, {
            'profile.paymentInfo': updateObj
        })
    }

    return true;
}

export async function makePayment(username: string, price: number, companyName: string, quoteID: string) {
    let user = await userExists(username);

    if(!user || !user.profile)
        return;

    const paymentInfo = user.profile.purchaseHistory ? user.profile.paymentInfo : null;
    let purchaseHistory = user ? user.profile.purchaseHistory : null;

    if (!paymentInfo) {
        return;
    }

    //beep beep credit card machine
    //imagine the credit card is being processed
    //$$$$$$$

    //? This part doesn't exist in the db yet
    // const company = dummyCompanyModel.find(cn => cn.name === companyName);

    // if (!company) {
    //     console.log("Company not found");
    //     return;
    // }

    // company.revenue += price;

    let purchase = {
        _id: crypto.randomBytes(24 / 2).toString('hex'),
        quoteID: quoteID,
        purchaseDate: new Date(),
        deliveryDate: new Date(),
        tax: (0.0625 * price),
        price: price - (0.0625 * price)
    };

    let newPayment = await UserModel.findOneAndUpdate({ username: username },
        {
            $push: {
                'profile.purchaseHistory': purchase
            }
        },
        { new: true }
    );

    return paymentInfo;
}
