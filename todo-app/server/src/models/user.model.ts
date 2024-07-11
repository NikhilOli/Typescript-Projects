import { InferSchemaType, model, Schema } from "mongoose";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            select: false
        },
        password: {
            type: String,
            required: true,
            select: false
        },
    }
);

type User = InferSchemaType<typeof userSchema>

export const User = model<User>("User", userSchema);

