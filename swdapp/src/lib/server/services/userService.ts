import { ProfileModel } from "../database/models/profileModel";
import { UserModel } from "../database/models/userModel";

export async function userExists(username: string) {
    let foundUser = await UserModel.findOne({ username: username });

    return foundUser ? foundUser : false;
}

export async function addUser(username: string, encryptedPass: string) {
    const newUser = await UserModel.create({
        username: username,
        encryptedPassword: encryptedPass,
        isAdmin: false
    });

    return newUser;
}

export async function getProfile(username: string) {
    let user = await userExists(username);
    if(!user)
        return null;

    let profile = await ProfileModel.findOne({ username: username });
    if(!profile)
        return null;

    return profile;
}

export async function updateAccount(username: string, firstName?: string, middleName?: string, lastName?: string, city?: string, state?: string, street?: string, zip?: string) {
    let user = await userExists(username);
    
    if (!user) {
        return;
    }

    let updateObj = {};
    
    let profile = await getProfile(username);

    if (!profile) {
        updateObj = {
            username: username,
            firstName: firstName ? firstName : '',
            middleName: middleName ? middleName : '',
            lastName: lastName ? lastName : '',
            city: city ? city : '',
            state: state ? state : '',
            street: street ? street : '',
            zip: zip ? zip : '',
            purchaseHistory: [],
            paymentInfo: null
        }

        // let newProfile = await UserModel.findOneAndUpdate({ username: username }, {
        //     $set: { profile: updateObj }
        // });

        let newProfile = await ProfileModel.create(updateObj);
        return newProfile;
    }

    updateObj = {};
    const updateParams = {firstName, middleName, lastName, city, state, street, zip};

    for(const key in updateParams) {
        let val = updateParams[key as keyof typeof updateParams];
        if(val) {
            (updateObj as any)[key] = val;
        }
    }

    updateObj = updateObj ? updateObj : {};

    if(updateObj) {
        if(!profile) {
            (updateObj as any)['purchaseHistory'] = [];
        } else {
            (updateObj as any)['purchaseHistory'] = profile.purchaseHistory;
        }

        let updatedProfile = await UserModel.findOneAndUpdate({ username: username }, {
            $set: { profile: updateObj }
        });

        return updateParams;
    }

    return profile;
}

