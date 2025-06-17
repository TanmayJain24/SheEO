import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config({});

cloudinary.config({
    cloud_name: "your cloud name",
    api_key: "your api key",
    api_secret: "your api secret key"
});
export default cloudinary;
