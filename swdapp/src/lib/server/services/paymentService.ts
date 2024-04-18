import { getProfile, userExists } from "./userService";
import { ProfileModel } from "../database/models/profileModel";


export async function getPurchaseHistory(username: string) {
    let user = await userExists(username);

    if(!user)
        return null;

    let profile = await getProfile(username);

    if(!profile)
        return null;

    return profile.purchaseHistory;
}

export async function updatePayment(username: string, cardName?: string, cardNum?: string, cvv?: string, expiry?: Date) {
    let user = await userExists(username);
    let profile = await getProfile(username);

    if (!user || !profile)
        return false;

    let userPayment = profile.paymentInfo;
    let updateObj = {};

    if (!userPayment) {
        updateObj = {
            cardName: '',
            creditCardNumber: '',
            cardExpiration: new Date("1920-01-01"),
            cardCVV: ''
        };

        let newPaymentProfile = await ProfileModel.findOneAndUpdate({ username: username }, {
            $set: { paymentInfo: updateObj }
        });

        return true;
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
        let updatedPaymentProfile = await ProfileModel.findOneAndUpdate({ username: username }, {
            paymentInfo: updateObj
        })
    }

    return true;
}

export async function makePayment(username: string, price: number, companyName: string, quoteID: string) {
    let user = await userExists(username);
    let profile = await getProfile(username);

    if(!user || !profile)
        return;

    const paymentInfo = profile.purchaseHistory ? profile.paymentInfo : null;
    let purchaseHistory = user ? profile.purchaseHistory : null;

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
        // _id: crypto.randomBytes(24 / 2).toString('hex'),
        quoteID: quoteID,
        purchaseDate: new Date(),
        deliveryDate: new Date(),
        tax: (0.0625 * price),
        price: price - (0.0625 * price)
    };

    let newPayment = await ProfileModel.findOneAndUpdate({ username: username },
        {
            $push: {
                'purchaseHistory': purchase
            }
        },
        { new: true }
    );

    return paymentInfo;
}
