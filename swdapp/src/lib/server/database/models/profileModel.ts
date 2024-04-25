import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema(
    {
        quoteID: { 
            type: String,
            required: [true, "quoteID is required!"] 
        },

        price: {
            type: Number
        },

        purchaseDate: { 
            type: Date,
            required: [true, "purchaseDate is required!"] 
        },

        deliveryDate: { 
            type: Date,
            required: [true, "deliveryDate is required!"] 
        },

        tax: { 
            type: Number,
            required: [true, "tax is required!"] 
        }
    },
    {
        timestamps: true
    }
);

const paymentInfoSchema = new mongoose.Schema(
    {
        cardName: { type: String },
        creditCardNumber: { type: String },
        cardExpiration: { type: Date },
        cardCVV: { type: String }
    },
    {
        timestamps: true
    }
);

const profileSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, "username is required!"]
        },

        firstName: { type: String },
        middleName: { type: String },
        lastName: { type: String },
        street: { type: String },
        state: { type: String },
        city: { type: String },
        zip: { type: String },

        purchaseHistory: [receiptSchema],

        paymentInfo: {
            type: paymentInfoSchema,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const ProfileModel = mongoose.model('Profile', profileSchema);