import mongoose from "mongoose";

const authorizationSchema = new mongoose.Schema(
    {
        refToken: {
            type: String,
            required: [true, "refresh token is required"]
        }
    },
    {
        timestamps: true
    }
);

export const AuthorizationModel = mongoose.model("Authorization", authorizationSchema);