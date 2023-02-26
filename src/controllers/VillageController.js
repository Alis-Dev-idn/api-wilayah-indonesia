import VillageService from "../services/VillageService/VillageService.js";
import {CreateResponse} from "../utils/Utils.js";


class VillageController {
    static async get(req, res) {
        const query = req.query;
        let by;
        let value;
        const limit = query.limit? isNaN(Number(query.limit))? Number(query.limit) : 10 : 10;
        const skip = query.offset? isNaN(Number(query.offset))? Number(query.offset) : 0 : 0;
        if(query.id) {
            by = "id";
            value = query.id;
        }
        if(query.name) {
            by = "name";
            value = query.name;
        }
        if(query.district_id) {
            by = "district_id";
            value = query.district_id;
        }
        if(query.name && query.ditrict_id) {
            by = "name_district_id";
            value = {
                id: query.district_id,
                name: query.name
            }
        }

        if(!by) return CreateResponse(res, 2, {error: "parameter query id / name / district_id required!"});

        VillageService.get(by, value, {limit, skip}).then(response => {
            if(!response) return CreateResponse(res, 4, {error: `Village by ${by} ${value} not found!`});
            CreateResponse(res, 1, response);
        }).catch(error => {
            CreateResponse(res, 5);
        })
    }
}

export default VillageController;