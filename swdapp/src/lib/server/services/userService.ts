import { UserModel } from "../database/models/userModel";

export async function userExists(username: string) {
    let foundUser = await UserModel.findOne({ username: username });

    return foundUser ? foundUser : false;
}

export async function addUser(username: string, encryptedPass: string) {
    const newUser = await UserModel.create({
        username: username,
        encryptedPassword: encryptedPass,
        isAdmin: false,
        profile: null
    });

    return newUser;
}

export async function getProfile(username: string){
    let user = await userExists(username);

    return user ? user.profile : null;
}

export async function updateAccount(username: string, firstName?: string, middleName?: string, lastName?: string, city?: string, state?: string, street?: string, zip?: string) {
    let user = await userExists(username);
    
    if (!user) {
        return;
    }

    let updateObj = {};
    
    let profile = user.profile;
    if (!profile) {
        updateObj = {
            firstName: '',
            middleName: '',
            lastName: '',
            city: '',
            state: '',
            street: '',
            zip: '',
            quoteHistory: [],
            purchaseHistory: [],
            paymentInfo: null
        }

        let newProfile = await UserModel.updateOne({ username: username }, {
            $set: { profile: updateObj }
        });
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
        let updatedProfile = await UserModel.updateOne({ username: username }, {
            $set: { profile: updateObj }
        });
    }

    return profile;
}

