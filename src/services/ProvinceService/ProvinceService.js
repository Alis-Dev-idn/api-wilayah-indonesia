import {ProvinceModel as DbProvince} from "../../databases/database.js";

class ProvinceService {
    static generateData(data) {
        const options = [];
        for (let i = 0; i < data.length; i++) {
            options.push({
                label: data[i].name,
                value: data[i].code_province
            })
        }
        return options;
    }

    /* ------------------------------------------------------------
     by:        "name" | "id" | "options" | "search"
     value:     value of by^
    ------------------------------------------------------------ */
    static get(by, value) {
        return new Promise(async (resolve, reject) => {
            try{
                switch (by)
                {
                    case "id": {
                        const data = await DbProvince.findOne({code_province: value}, {createdAt: 0, updatedAt: 0, __v: 0});
                        return resolve(data);
                    }
                    case "name": {
                        const count = await DbProvince.aggregate([
                            {
                                $match: {
                                    name : {$regex: value, $options: "i"}
                                }
                            }
                        ]).count("name");
                        const data = await DbProvince.aggregate([
                            {
                                $match: {
                                    name : {$regex: value, $options: "i"}
                                }
                            }
                        ])
                        const options = this.generateData(data);
                        return resolve({count: count.length !== 0? count[0].name : 0, options});
                    }
                    case "all" : {
                        const count = await DbProvince.find({}).count();
                        const data = await DbProvince.find({});
                        const options = this.generateData(data);
                        return resolve({count, options});
                    }
                    default:
                        return resolve(null);
                }
            }catch (error){
                reject(error);
            }
        });
    }
}

export default ProvinceService;