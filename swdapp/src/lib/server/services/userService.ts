import { ProfileModel } from "../database/models/profileModel";
import { QuotesModel } from "../database/models/quotesModel";
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
            (updateObj as any)['paymentInfo'] = null;
        } else {
            (updateObj as any)['purchaseHistory'] = profile.purchaseHistory;
            (updateObj as any)['paymentInfo'] = profile.paymentInfo;
        }

        (updateObj as any)['username'] = username;
        
        let updatedProfile = await ProfileModel.findOneAndUpdate({ username: username }, {
            $set: { ...updateObj }
        });

        return updatedProfile;
    }

    return profile;
}

export async function updateUsername(currUsername: string, newUsername: string) {
    let user = await userExists(currUsername);
    if (!user)
        return false;

    let updatedUsername = await UserModel.findOneAndUpdate({ username: currUsername }, {
        $set: { username: newUsername }
    });

    let profileUpdateUsername = await ProfileModel.findOneAndUpdate({ username: currUsername }, {
        $set: { username: newUsername }
    });

    let quotesUpdateUsername = await QuotesModel.updateMany({ username: currUsername }, {
        $set: { username: newUsername }
    });

    return true;
}

export async function updateEncryptedPassword(username: string, newEncryptedPass: string) {
    let user = await userExists(username);
    if (!user)
        return null;

    let updatedPass = await UserModel.findOneAndUpdate({ username: username }, {
        $set: { encryptedPassword: newEncryptedPass }
    });

    return updatedPass;
}