import { MediaType } from "../../../generated/prisma";
import prisma from "../../config/prisma";

class MediaService{
    async create(type: MediaType, fileName: string) {
        const media = await prisma.media.create({
            data: {
                name: fileName,
                mediaType: type,
            }
        });
        return media;
    }
}

export default new MediaService();