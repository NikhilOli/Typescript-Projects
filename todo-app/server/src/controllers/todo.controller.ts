import { RequestHandler } from "express"
import Todo from "../models/todo.model"


const getTodos: RequestHandler = async (req, res) =>  {    
    const todos = await Todo.find()

    res.status(200).send(todos[0].todo)
    // res.send(`Hello from server running on PORT ${process.env.PORT}`);
}


export { getTodos }