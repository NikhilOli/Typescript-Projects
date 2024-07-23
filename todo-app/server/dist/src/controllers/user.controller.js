"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = require("../models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const rawPassword = password;
    if (!username || !email || !rawPassword) {
        console.log("All fields required");
        return res.json({ message: "Please fill up all required fields" });
    }
    try {
        const existingUserName = yield user_model_1.User.findOne({ username });
        if (existingUserName) {
            return res.json({ message: "User with this username already exists. Enter another username" });
        }
        const existingEmail = yield user_model_1.User.findOne({ email });
        if (existingEmail) {
            return res.json({ message: "User with this email already exists. Enter another email" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(rawPassword, 10);
        const newUser = yield user_model_1.User.create({ username, email, password: hashedPassword });
        // const token = jwt.sign({ userId: newUser._id, }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        res.status(201).json({ message: "User registered successfully", newUser });
    }
    catch (error) {
        console.error("Error creating todo", error);
        res.status(500).json({ message: "Error creating todo" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill up all required fields" });
    }
    try {
        const user = yield user_model_1.User.findOne({ email }).select("+password +username");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const verifyPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "Password mismatch" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login successfully done ok", token, username: user.username, userId: user._id });
    }
    catch (error) {
        console.error("Error logging in user", error);
        res.status(500).json({ message: "Error logging in user" });
    }
});
exports.loginUser = loginUser;
