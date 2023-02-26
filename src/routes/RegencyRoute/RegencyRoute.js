import {Router} from "express";
import RegencyController from "../../controllers/RegencyController.js";


const RegencyRoute = () => {
    const regency = Router();

    regency.get("/", RegencyController.get);

    return regency;
}

export default RegencyRoute;