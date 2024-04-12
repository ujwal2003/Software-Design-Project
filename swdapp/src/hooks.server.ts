import { connect } from "$lib/server/database/mongo";

connect()
    .then(() => {
        console.log("[DB:SERVER] connected to MongoDB");
    })
    .catch((e) => {
        console.log("[DB:SERVER] failed to connect to MongoDB");
        console.error(e);
    });