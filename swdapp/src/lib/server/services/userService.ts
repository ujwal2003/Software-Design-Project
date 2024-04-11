import crypto from "crypto";
import { dummyUsersModel } from "../dummyDatabase";
import { UserModel } from "../database/models/userModel";

export async function userExists(username: string) {
    // const foundUser = dummyUsersModel.find(user => user.username === username);
    let foundUser = await UserModel.findOne({ username: username });

    return foundUser ? foundUser : false;
}

export async function addUser(username: string, encryptedPass: string) {
    // let userID = crypto.randomBytes(24 / 2).toString('hex');

    // let newLen = dummyUsersModel.push({
    //     _id: userID,
    //     username: username,
    //     encryptedPassword: encryptedPass,
    //     isAdmin: false,
    //     profile: null
    // });

    const newUser = await UserModel.create({
        username: username,
        encryptedPassword: encryptedPass,
        isAdmin: false,
        profile: null
    });

    // return dummyUsersModel[newLen - 1];
    return newUser;
}

export async function getProfile(username: string){
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);

    return user ? user.profile : null;
}

export async function updateAccount(username: string, firstName?: string, middleName?: string, lastName?: string, city?: string, state?: string, street?: string, zip?: string) {
    // const user = dummyUsersModel.find(user => user.username === username);
    let user = await userExists(username);
    
    if (!user) {
        return;
    }

    let updateObj = {};
    
    let profile = user.profile;
    if (!profile) {
        // profile = {
        //     _id: crypto.randomBytes(24 / 2).toString('hex'),
        //     firstName: '',
        //     middleName: '',
        //     lastName: '',
        //     city: '',
        //     state: '',
        //     street: '',
        //     zip: '',
        //     quoteHistory: null,
        //     purchaseHistory: null,
        //     paymentInfo: null
        // };
        // user.profile = profile;
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
            profile: updateObj
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
    let updatedProfile = await UserModel.updateOne({ username: username }, {
        profile: updateObj
    });

    // profile.firstName = firstName ? firstName : profile.firstName;
    // profile.middleName = middleName ? middleName : profile.middleName;
    // profile.lastName = lastName ? lastName : profile.lastName;
    // profile.city = city ? city : profile.city;
    // profile.state = state ? state : profile.state;
    // profile.street = street ? street : profile.street;
    // profile.zip = zip ? zip : profile.zip;

    return profile;
}

