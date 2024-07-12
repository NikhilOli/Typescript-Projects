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

        const existingUserName = await User.findOne({ username });
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

const loginUser: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        console.log("All fields required");
        return res.json({ message: "Please fill up all required fields" });
    }
    try {
        console.log(email, password);
        
        const user = await User.findOne({email}).select("password")
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        console.log(user);
        

        const verifyPassword = await bcrypt.compare(password, user.password)
        if (!verifyPassword) {
            return res.status(400).json({message: "Password mismatch"})
        }
        
        res.status(200).json({message: "Login successful", user})
    } catch (error) {
        console.error("Error creating todo", error);
        res.status(500).json({ message: "Error loggin user" });
    }
};

export { registerUser, loginUser };