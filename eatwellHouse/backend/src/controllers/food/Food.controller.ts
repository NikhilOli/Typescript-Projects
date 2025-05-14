import { Body, Controller, Post, Route, Middlewares } from "tsoa";
import FoodService from "../../services/food/Food.service";
import { RequestValidator } from "../../middlewares/requestValidator.middleware";
import { CreateFoodDTO } from "../../dto/Food.dto";

@Route("food")
export class FoodController extends Controller {
  @Post("/")
  @Middlewares([RequestValidator.validate(CreateFoodDTO)])
  async createFood(@Body() body: CreateFoodDTO) {
    console.log("body", body);
    const data = await FoodService.add(body);

    return {
      status: 204,
      message: "Food created successfully",
      data,
    }
  }
}
