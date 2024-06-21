import { RequestHandler } from "express"
import Todo from "../models/todo.model"


const getTodos: RequestHandler = async (req, res) =>  {  
    try {
        const todos = await Todo.find()
    
        res.status(200).send(todos[0].todo)
        
    } catch (error) {
        console.error("Error getting todos",error);
        
    }
}

const createTodo: RequestHandler = async (req, res) => {
    const todo = req.body;
    try {
        
        const newTodo = Todo.create(todo)
        res.status(201).json(newTodo)

    } catch (error ) {
        throw new Error(`Error creating todo `);
    }
}

const getTodo: RequestHandler = async (req, res) =>  {    
    const todoId = req.params.todoId;
    try {
        const todo = await Todo.findById(todoId)
        res.status(200).json(todo)
        
    } catch (error) {
        console.error("Error getting todos",error);
        
    }
}


export { getTodos, createTodo, getTodo }