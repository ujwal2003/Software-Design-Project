import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required!"]
        },
        generationDate: {
            type: Date,
            default: Date.now()
        },

        gallonsRequested: { type: Number },
        priceCalculated: { type: Number },
        deliveryDate: { type: Date }
    },
    {
        timestamps: true
    }
);

export const QuotesModel = mongoose.model('Quotes', quotesSchema);