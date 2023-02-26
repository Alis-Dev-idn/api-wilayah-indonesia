import {Router} from "express";
import VillageController from "../../controllers/VillageController.js";

const VillageRoute = () => {
    const village = Router()

    village.get("/", VillageController.get);

    return village;
}

export default VillageRoute;