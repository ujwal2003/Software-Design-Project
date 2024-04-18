import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "username is required!"]
        },

        encryptedPassword: {
            type: String,
            required: [true, "password is required!"]
        },

        isAdmin: { type: Boolean }
    }
);

export const UserModel = mongoose.model('User', userSchema);