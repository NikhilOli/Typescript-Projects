import { RequestHandler } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"

interface RegisterUserBody {
    username?: string;
    email?: string;
    password?: string;
}

const registerUser: RequestHandler<RegisterUserBody> = async (req, res) => {
    const { username, email, password } = req.body;
    const rawPassword = password
    if (!username || !email || !rawPassword) {
        console.log("All fields required");
        return res.json({ message: "Please fill up all required fields" });
    }
    try {

        const existingUserName = await User.findOne({ email });
        if (existingUserName) {
            return res.json({ message: "User with this username already exists. Enter another username" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.json({ message: "User with this email already exists. Enter another email" });
        }

        const hashedPassword = await bcrypt.hash(rawPassword, 10);
        const newUser = await  User.create({username, email, password: hashedPassword});
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating todo", error);
        res.status(500).json({ message: "Error creating todo" });
    }
};

export { registerUser };