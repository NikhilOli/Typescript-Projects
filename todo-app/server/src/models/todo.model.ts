import { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
    }
},{timestamps: true})

type Todo = InferSchemaType<typeof todoSchema>

const Todo = model<Todo>("Todo", todoSchema)

export default Todo