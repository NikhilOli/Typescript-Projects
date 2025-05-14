import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateFoodDTO {
    @IsString()
    @Length(3, 50)
    name!: string;

    @IsNumber()
    @Min(0.1)
    price!: number;
    
    @IsNumber()
    @Min(0.1)
    quantity!: number;

    @IsNumber()
    @Min(0.1)
    @Type(() => Number)
    image!: number;

    @IsBoolean()
    spicyness?: boolean;

    @IsNumber()
    @Min(0.1)
    @Type(() => Number)
    category!: number;
}