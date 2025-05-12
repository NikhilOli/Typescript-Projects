import { Controller, Get, Post, Route, FormField, UploadedFile } from "tsoa";


@Route("category")
export class CategoryController extends Controller {
//   Define your controller methods here
    @Get("/")
    async getCategory() {
        return {
            data: [],
        };
    }
@Post("/")
async createCategory(
    @FormField("name") name: string,
    @UploadedFile() file: Express.Multer.File
) {
    console.log("name", name);
    console.log("file", file);
    return { message: "Category created successfully" };
}
}