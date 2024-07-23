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
exports.dbConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mongoUrl = process.env.CLOUD_URI;
        if (!mongoUrl) {
            throw new Error('CLOUD_URL is not defined in environment variables');
        }
        yield mongoose_1.default.connect(mongoUrl, { dbName: "taskPlanner" });
        console.log(`MongoDB connected successfully in ${process.env.CLOUD_URI}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting database", error.message);
        }
        else {
            console.log("Error connecting database", error);
        }
    }
});
exports.dbConnect = dbConnect;
