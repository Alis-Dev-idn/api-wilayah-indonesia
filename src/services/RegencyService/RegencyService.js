import {RegencyModel as DbRegency} from "../../databases/database.js";

class RegencyService {
    static generateData(data) {
        const options = [];
        for (let i = 0; i < data.length; i++) {
            options.push({
                label: data[i].name,
                value: data[i].code_regency
            });
        }
        return options;
    }

    /* ------------------------------------------------------------
     by:        "id" | "name" | "province" | "name_id"
     value:     value of by
    ------------------------------------------------------------ */
    static get(by, value) {
        return new Promise(async (resolve, reject) => {
            try{
                switch (by)
                {
                    case "id": {
                        const data = await DbRegency.findOne({code_regency: value}, {createdAt: 0, updateAt: 0, __v: 0});
                        return resolve(data);
                    }
                    case "province_id": {
                        const data = await DbRegency.aggregate([
                            {
                                $match: { code_province: value }
                            }
                        ]);
                        const options = this.generateData(data);
                        return resolve(options);
                    }
                    case "name": {
                        const data = await DbRegency.aggregate([
                            {
                                $match: {
                                    name: {$regex: value, $options: "i"}
                                }
                            }
                        ]);
                        const options = this.generateData(data);
                        return resolve(options);
                    }
                    case "name_province_id": {
                        const data = await DbRegency.aggregate([
                            {
                                $match: {
                                    code_province: value.id,
                                    name: {$regex: value.name, $options: "i"},
                                }
                            }
                        ]);
                        const options = this.generateData(data);
                        return resolve(options);
                    }
                    default:
                        return resolve(null);
                }
            }catch (error){
                reject(error);
            }
        })
    }
}

export default RegencyService;