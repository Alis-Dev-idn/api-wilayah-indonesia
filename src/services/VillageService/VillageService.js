import {VillageModel as DbVillage} from "../../databases/database.js";

class VillageService {
    static generateData(data) {
        const options = [];
        for (let i = 0; i < data.length; i++) {
            options.push({
                label: data[i].name,
                value: `${data[i].code_district}|${data[i].code_village}`
            })
        }
        return options;
    }

    static get(by, value, params) {
        return new Promise(async (resolve, reject) => {
            try{
                switch (by)
                {
                    case "id" : {
                        const data = await DbVillage.findOne({code_village: value}, {createdAt: 0, updatedAt: 0, __v: 0});
                        return resolve(data);
                    }
                    case "district_id": {
                        const count = await DbVillage.find({code_district: value}).count();
                        const data = await DbVillage.find({code_district: value}).limit(params.limit).skip(params.skip);
                        const options = this.generateData(data);
                        return resolve({count, options});
                    }
                    case "name": {
                        const count = await DbVillage.aggregate([
                            {
                                $match: {
                                    name: {$regex: value, $options: "i"}
                                }
                            }
                        ]).count("name");
                        const data = await DbVillage.aggregate([
                            {
                                $match: {
                                    name: {$regex: value, $options: "i"}
                                }
                            }
                        ]).limit(params.limit).skip(params.skip);
                        const options = this.generateData(data);
                        return resolve({count: count.length !== 0 ? count[0].name : 0, options});
                    }
                    case "name_district_id" : {
                        const count = await DbVillage.aggregate([
                            {
                                $match: {
                                    name: {$regex: value.name, $options: "i"},
                                    code_district: value.code
                                }
                            }
                        ]).count("name");
                        const data = await DbVillage.aggregate([
                            {
                                $match: {
                                    name: {$regex: value.name, $options: "i"},
                                    code_district: value.id,
                                }
                            }
                        ]).limit(params.limit).skip(params.skip);
                        const options = this.generateData(data);
                        return resolve({count: count.length !==0? count[0].name : 0, options});
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

export default VillageService;