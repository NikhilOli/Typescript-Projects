import { Router } from "express";
import * as UserController from "../controllers/user.controller"




export const userRoutes = Router();

userRoutes.post("/api/register", UserController.registerUser)
