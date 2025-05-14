import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../constants/statusCode.constant";

export class RequestValidator {
    static validate = (classInstance: any) => {
        return async (req: Request, res: Response, next: NextFunction) => {
        // ✅ Log the incoming body (for debugging)
        console.log("Incoming body", req.body);

        const convertedObject = plainToClass(classInstance, req.body);
        const errors = await validate(convertedObject);

        if (errors.length > 0) {
            const rawErrors: string[] = [];

            for (const errorItem of errors) {
            if (errorItem.constraints) {
                rawErrors.push(...Object.values(errorItem.constraints));
            }

            if (errorItem.children && errorItem.children.length > 0) {
                for (const child of errorItem.children) {
                rawErrors.push(...Object.values(child.constraints ?? {}));
                }
            }
            }

            return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Validation error",
            errors: rawErrors,
            });
        }

        // ✅ Only call next() if validation passed
        next();
        };
    };
}
