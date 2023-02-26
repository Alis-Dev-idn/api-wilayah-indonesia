import express from "express";
import ProvinceRoute from "./ProvinceRoute/ProvinceRoute.js";
import RegencyRoute from "./RegencyRoute/RegencyRoute.js";
import DistrictRoute from "./DistrictRoute/DistrictRoute.js";
import VillageRoute from "./VillageRoute/VillageRoute.js";

const Routes = () => {
    const routes = express();

    routes.use("/province", ProvinceRoute());
    routes.use("/regency", RegencyRoute());
    routes.use("/district", DistrictRoute());
    routes.use("/village", VillageRoute());

    routes.use((req, res, next) => {
        res.status(404).json({error: "not found"});
    })

    return routes;
}

export default Routes;