import {Router} from "express";
import DistrictController from "../../controllers/DistrictController.js";

const DistrictRoute = () => {
    const district = Router()

    district.get("/", DistrictController.get);

    return district;
}

export default DistrictRoute;