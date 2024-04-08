import mongoose from "mongoose";
import { MONGO_CLUSTER, CLUSTER_USER, CLUSTER_PASS } from "$env/static/private";

const uri = `mongodb+srv://${CLUSTER_USER}:${CLUSTER_PASS}@${MONGO_CLUSTER}.w0kw8al.mongodb.net/?retryWrites=true&w=majority`;

export async function connect() {
    await mongoose.connect(uri);
}