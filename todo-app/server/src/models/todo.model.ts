import { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    todo: {
        type: String,
    },
    status: {
        type: String,
        enum: ["todo", "doing", "done"],
        default: "todo"
    }
},{timestamps: true})

type Todo = InferSchemaType<typeof todoSchema>

const Todo = model<Todo>("Todo", todoSchema)

export default Todo