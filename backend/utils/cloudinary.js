import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: "dgf51cczq",
    api_key: "711672769684434",
    api_secret: "-LFE7VAw93gNhfGBTHVwWddoDp0"
});
export default cloudinary;