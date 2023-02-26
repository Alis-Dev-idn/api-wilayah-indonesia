import {CreateResponse} from "../utils/Utils.js";
import RegencyService from "../services/RegencyService/RegencyService.js";


class RegencyController {
    static async get(req, res) {
        const query = req.query;
        let by;
        let value;
        if(query.id) {
            by = "id";
            value = query.id;
        }
        if(query.name) {
            by = "name";
            value = query.name
        }
        if(query.province_id) {
            by = "province_id";
            value = query.province_id;
        }
        if(query.name && query.province) {
            by = "name_province_id";
            value = {
                id: query.province,
                name: query.name
            }
        }

        if(!by) return CreateResponse(res, 2, {error: "parameter query province / name / id required!"});

        RegencyService.get(by, value).then(response => {
            if(!response) return CreateResponse(res, 4, {error: `Regency by ${by} ${value} not found`});
            CreateResponse(res, 1, response);
        }).catch(error => {
            console.log(error);
            CreateResponse(res, 5);
        });
    }
}

export default RegencyController;