import crypto from "crypto";
import { dummyCompanyModel, dummyUsersModel } from "../dummyDatabase";
import { userExists } from "./userService";
import { UserModel } from "../database/models/userModel";


export async function getPurchaseHistory(username: string) {
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);

    if(!user)
        return null;

    if(!user.profile)
        return null;

    return user.profile.purchaseHistory;
}

export async function updatePayment(username: string, cardName?: string, cardNum?: string, cvv?: string, expiry?: Date) {
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);

    if (!user || !user.profile)
        return false;

    let userPayment = user.profile.paymentInfo;
    let updateObj = {};

    if (!userPayment) {
        // userPayment = {
        //     _id: crypto.randomBytes(24 / 2).toString('hex'),
        //     cardName: '',
        //     creditCardNumber: '',
        //     cardCVV: '',
        //     cardExpiration: new Date(-8640000000000000)
        // };

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

    // userPayment.cardName = cardName ? cardName : userPayment.cardName;
    // userPayment.creditCardNumber = cardNum ? cardNum : userPayment.creditCardNumber;
    // userPayment.cardCVV = cvv ? cvv : userPayment.cardCVV;
    // userPayment.cardExpiration = expiry ? expiry : userPayment.cardExpiration;
    
    // user.profile.paymentInfo = userPayment;

    return true;
}

export async function makePayment(username: string, price: number, companyName: string, quoteID: string) {
    // const user = dummyUsersModel.find(user => user.username === username);
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

    // if (!purchaseHistory){
    //     user.profile.purchaseHistory = [];
    // }
    // user?.profile?.purchaseHistory?.push(purchase);

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

