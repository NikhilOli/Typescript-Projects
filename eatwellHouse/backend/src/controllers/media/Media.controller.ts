import { Controller, FormField, Post, Route, UploadedFile } from "tsoa";
import { MediaType } from "../../../generated/prisma";
import fs from "fs";
import MediaService from "../../services/media/Media.service";

@Route("media")
export class MediaController extends Controller {
    @Post("/")
    async uploadMedia(@UploadedFile("file") file: Express.Multer.File, @FormField("type") type: MediaType
    ) {

         // buffer to file
            const buffer = Buffer.from(file.buffer);
            const fileName = Date.now() + "_" + file.originalname.replace(/\s/g, "");
        
            switch (type) {
                case MediaType.CATEGORY_IMAGE:
                    fs.writeFileSync(
                        `${process.cwd()}/public/uploads/category/${fileName}`,
                        buffer
            );
            break;
                case MediaType.FOOD_IMAGE:
                    fs.writeFileSync(
                        `${process.cwd()}/public/uploads/food/${fileName}`,
                        buffer
            );
            break;

            default:
                return "Invalid media type";
        }
            
            return await MediaService.create(type, fileName);
    }
}