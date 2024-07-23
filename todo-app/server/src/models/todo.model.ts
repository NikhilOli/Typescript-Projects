import { InferSchemaType, Schema, model } from "mongoose";

const todoSchema = new Schema({
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
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