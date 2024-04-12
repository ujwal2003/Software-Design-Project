import mongoose from "mongoose";
import { MONGO_CLUSTER, DB_NAME, CLUSTER_USER, CLUSTER_PASS } from "$env/static/private";

const uri = `mongodb+srv://${CLUSTER_USER}:${CLUSTER_PASS}@${MONGO_CLUSTER}.w0kw8al.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export async function connect() {
    return await mongoose.connect(uri);
}