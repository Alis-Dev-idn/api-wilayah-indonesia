import DistrictServices from "../services/DistrictService/DistrictServices.js";
import {CreateResponse} from "../utils/Utils.js";

class DistrictController {
    static async get(req, res) {
        const query = req.query;
        let by;
        let value;
        let limit = query.limit? isNaN(Number(query.limit))? Number(query.limit) : 10 : 10;
        let skip = query.offset? isNaN(Number(query.offset))? Number(query.offset) : 0 : 0;
        if(query.id) {
            by = "id";
            value = query.id;
        }
        if(query.name) {
            by = "name";
            value = query.name;
        }
        if(query.regency_id) {
            by = "regency_id";
            value = query.regency_id;
        }
        if(query.name && query.regency){
            by = "name_regency_id";
            value = {
                id: query.regency,
                name: query.name
            }
        }
        if(!by) return CreateResponse(res, 2, {error: "params query id / name / regency required!"});
        DistrictServices.get(by, value, {limit, skip}).then(response => {
            if(!response) return CreateResponse(res, 4, {error: `district by ${by} ${value} not found!`});
            CreateResponse(res, 1, response);
        }).catch(error => {
            CreateResponse(res, 5);
        })
    }
}

export default DistrictController;