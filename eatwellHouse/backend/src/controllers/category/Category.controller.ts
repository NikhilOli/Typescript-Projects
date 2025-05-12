import { Controller, Get, Post, Route, FormField, UploadedFile } from "tsoa";
import fs from "fs";
import CategoryService from "../../services/category/Category.service";


@Route("category")
export class CategoryController extends Controller {
//   Define your controller methods here
    @Get("/")
    async getCategory() {
        return await CategoryService.getAll();
    }
@Post("/")
async createCategory(
    @FormField("name") categoryName: string,
    @UploadedFile() file: Express.Multer.File
) {
    // buffer to file
    const buffer = Buffer.from(file.buffer);
    const fileName = Date.now() + "_" + file.originalname.replace(/\s/g, "");

    
    fs.writeFileSync(
        `${process.cwd()}/public/uploads/category/${fileName}`,
        buffer
    )
    
    return await CategoryService.create(categoryName, fileName);
    
}
}