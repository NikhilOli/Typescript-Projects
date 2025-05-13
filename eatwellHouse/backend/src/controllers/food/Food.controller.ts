import { Controller, Get, Post, Route, FormField, UploadedFile } from "tsoa";
import fs from "fs";
import CategoryService from "../../services/category/Category.service";
import FoodService from "../../services/food/Food.service";

@Route("food")
export class FoodController extends Controller {
  @Post("/")
  async createFood() {
    FoodService.add();
  }
}
