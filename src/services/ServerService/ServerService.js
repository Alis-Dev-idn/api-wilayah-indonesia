import {config} from "dotenv";
config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import {DbConnect} from "../../databases/database.js";
import Routes from "../../routes/route.js";

const ServerService = () => {
    const app = express();

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json({limit: "5MB"}));
    app.use(express.urlencoded({extended: false}));

    app.use(Routes());

    DbConnect().then(response => {
        app.listen(process.env.SERVER_PORT, () => {
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