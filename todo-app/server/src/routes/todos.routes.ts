import { Router } from "express";
import * as TodoController from "../controllers/todo.controller"


export const todosRouter = Router();


todosRouter.get("/api/todos", TodoController.getTodos)