import { Router } from "express";
import * as UserController from "../controllers/user.controller"
import { authMiddleware } from "../middlewares/auth.middleware";




export const userRoutes = Router();

userRoutes.post("/api/register", UserController.registerUser)
userRoutes.post("/api/login", UserController.loginUser)
userRoutes.get("/api/protected", authMiddleware, (req, res) => {
    res.json({ message: "This is a protected route" });
});
