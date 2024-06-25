import "reflect-metadata";
import path from "path";
import * as dotenv from "dotenv";
import { readdirSync } from "fs";
import express from "express";
import { setupRoutes } from "./router";
import moment from "moment";

dotenv.config({path: __dirname + "/../../.env"});

const folders = readdirSync(path.join(__dirname, "routes"));
for (var i = 0; i < folders.length; i++) {
    const files = readdirSync(path.join(__dirname, "routes", folders[i]));
    for (let j = 0; j < files.length; j++) {
        require(`./routes/${folders[i]}/${files[j]}`);
    }
}

async function main(): Promise<void> {
    moment.locale("en-uk");
    const time = moment().format("YYYY-MM-DD HH:MM:SS");
    const http = 5000;
    const app = express();

    setupRoutes(app);

    app.listen(http, () => {
        console.log(`Listening to port ${http} | http://localhost:${http}`);
        console.log(`Server online as of ${time}`);
    });
}   

main();