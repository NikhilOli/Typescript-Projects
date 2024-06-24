import { RequestHandler } from "express"
import Todo from "../models/todo.model"


const getTodos: RequestHandler = async (req, res) =>  {  
    try {
        const todos = await Todo.find()
    
        res.status(200).send(todos)
        
    } catch (error) {
        console.error("Error getting todos",error);
        
    }
}

const createTodo: RequestHandler = async (req, res) => {
    const todo = req.body;
    try {
        
        const updatedTodo = Todo.create(todo)
        res.status(201).json(updatedTodo)

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

const editTodo: RequestHandler = async (req, res) =>  {    
    const todoId = req.params.todoId;
    const {todo: updatedTodo} = req.body
    if (!updatedTodo) {
        res.status(400).json("Please enter the new updated todo")
    }
    try {
        const existingTodo = await Todo.findById(todoId)
        if (!existingTodo) {
            res.status(404).json("Todo not found")
        } else {
            existingTodo.todo = updatedTodo;
            await existingTodo.save()
            res.status(200).json(existingTodo)
        }
        
    } catch (error) {
        console.error("Error getting todos",error);
        
    }
}

const deleteTodo: RequestHandler = async (req, res) =>  {    
    const todoId = req.params.todoId;
    try {
        const todo = await Todo.findByIdAndDelete(todoId)
        if (!todo) {
            res.status(400).json("Todo not found")
        }
        res.status(200).json("Todo deleted successfully")
        
    } catch (error) {
        console.error("Error getting todos",error);
        
    }
}


export { getTodos, createTodo, getTodo, editTodo, deleteTodo }