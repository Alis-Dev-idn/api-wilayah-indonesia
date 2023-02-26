import {CreateResponse} from "../utils/Utils.js";
import ProvinceService from "../services/ProvinceService/ProvinceService.js";


class ProvinceController {
    static async get(req, res) {
        const query = req.query;
        let by;
        let value;
        if(query.name) {
            by = "name";
            value = query.name;
        }
        if(query.id) {
            by = "id";
            value = query.id;
        }
        if(!by) by = "all"

        ProvinceService.get(by, value).then(response => {
            if(!response) return CreateResponse(res, 4, {error: `province by ${by} ${by === "id"? query.id : query.name} not found`});
            CreateResponse(res, 1,  response);
        }).catch(error => {
            CreateResponse(res, 5);
        })
    }
}

export default ProvinceController;