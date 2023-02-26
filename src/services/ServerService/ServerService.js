import {config} from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import https from "https";
import http from "http";
import fs from "fs";
import {DbConnect} from "../../databases/database.js";
import Routes from "../../routes/route.js";

const ServerService = () => {
    let server;
    const app = express();

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json({limit: "5MB"}));
    app.use(express.urlencoded({extended: false}));

    app.use(Routes());

    if(process.env.SSL && process.env.SSL === "true") {
        const config = {
            key: fs.readFileSync(process.env.KEY),
            cert: fs.readFileSync(process.env.CERT)
        }
        server = https.createServer(config, app);
    }
    if(process.env.SSL && process.env.SSL === "false" || !process.env.SSL) server = http.createServer(app);

    DbConnect().then(response => {
        server.listen(process.env.SERVER_PORT, () => {
            console.log("--------------------------------------------")
            console.log(response);
            console.log("server running:")
            console.log("url : " + `http://localhost:${process.env.SERVER_PORT}`)
            console.log("--------------------------------------------")
        })
    }).catch(error => {
        console.log(error);
        process.exit();
    })
}

export default ServerService;