import {Router} from "express";
import ProvinceController from "../../controllers/ProvinceController.js";


const ProvinceRoute = () => {
    const province = Router();

    province.get("/", ProvinceController.get);

    return province;
}

export default ProvinceRoute;