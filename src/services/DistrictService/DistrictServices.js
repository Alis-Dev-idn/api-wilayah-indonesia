import {DistrictModel as DbDistrict} from "../../databases/database.js";

class DistrictServices {
    static generateData(data) {
        const options = [];
        for (let i = 0; i < data.length; i++) {
            options.push({
                label: data[i].name,
                value: `${data[i].code_regency}|${data[i].code_districts}`
            });
        }
        return options;
    }

    /* ------------------------------------------------------------
     by:        "id" | "name" | "regency" | "name_regency_id"
     value:     value of by
    ------------------------------------------------------------ */
    static get(by, value, params) {
        return new Promise(async (resolve, reject) => {
            try{
                switch (by)
                {
                    case "id": {
                        const data = await DbDistrict.findOne({code_districts: value}, {createdAt: 0, updatedAt:0, __v: 0});
                        return resolve(data);
                    }
                    case "name": {
                        const count = await DbDistrict.aggregate([
                            {
                                $match: {
                                    name: { $regex: value, $options: "i"}
                                }
                            }
                        ]).count("name");
                        const data = await DbDistrict.aggregate([
                            {
                                $match: {
                                    name: { $regex: value, $options: "i"}
                                }
                            }
                        ]).limit(params.limit).skip(params.skip);
                        const options = this.generateData(data);
                        return resolve({count: count.length !== 0? count[0].name : 0, options});
                    }
                    case "regency_id": {
                        const count = await DbDistrict.find({code_regency: value}).count();
                        const data = await DbDistrict.find({code_regency: value}, {createdAt: 0, updatedAt:0, __v: 0});
                        const options = this.generateData(data);
                        return resolve({count, options});
                    }
                    case "name_regency_id": {
                        const count = await DbDistrict.aggregate([
                            {
                                $match: {
                                    code_regency: value.id,
                                    name: {$regex: value.name, $options: "i"}
                                }
                            }
                        ]).count("name");
                        const data = await DbDistrict.aggregate([
                            {
                                $match: {
                                    code_regency: value.id,
                                    name: {$regex: value.name, $options: "i"}
                                }
                            }
                        ]).limit(params.limit).skip(params.skip);
                        const options = this.generateData(data);
                        return resolve({count: count.length !== 0? count[0].name : 0, options});
                    }
                    default:
                        return resolve(null);
                }
            }catch (error) {
                reject(error);
            }
        })
    }
}

export default DistrictServices;