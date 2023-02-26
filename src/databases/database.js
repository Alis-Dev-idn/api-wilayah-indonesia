import mongoose, {Schema, model} from "mongoose";

const provinceSchema = new Schema({
    name: String,
    code_province: String,
    longitude: Number,
    latitude: Number
}, {timestamps: true});

const districtSchema = new Schema({
    name: String,
    code_districts: String,
    code_regency: String,
    longitude: Number,
    latitude: Number
}, {timestamps: true});

const regencySchema = new Schema({
    name: String,
    code_regency: String,
    code_province: String,
    longitude: Number,
    latitude: Number
}, {timestamps: true});

const villageSchema = new Schema({
    name: String,
    code_village: String,
    code_district: String,
    longitude: Number,
    latitude: Number
}, {timestamps: true});


export const ProvinceModel = model("province", provinceSchema);
export const DistrictModel = model("districts", districtSchema);
export const RegencyModel = model("regencies", regencySchema);
export const VillageModel = model("villages", villageSchema);

export const DbConnect = () => {
    const url = `mongodb://${process.env.SERVER_MONGODB_USER}:${process.env.SERVER_MONGODB_PASS}@${process.env.SERVER_MONGODB_HOST}:${process.env.SERVER_MONGODB_PORT}/${process.env.SERVER_MONGODB_DATA}`
    mongoose.set('strictQuery', false);
    return new Promise(async (resolve, reject) => {
        mongoose.connect(url).then(() => {
            resolve("Db success connected");
        }).catch(error => {
            reject(error);
        })
    }) ;
}