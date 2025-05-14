import prisma from "../../config/prisma";
import { CreateFoodDTO } from "../../dto/Food.dto";

class FoodService {
    add(body: CreateFoodDTO) {
        return prisma.food.create({
            data: {
                name: body.name,
                price: body.price,
                quantity: body.quantity,
                hasSpicyness: body.spicyness ?? false,
                image: {
                    connect: { id: Number(body.image) },
                },
                category: {
                    connect: { id: Number(body.category) },
                },
            },
        });
    }
}








export default new FoodService();