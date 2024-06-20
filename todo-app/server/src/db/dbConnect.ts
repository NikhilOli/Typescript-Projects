import mongoose from "mongoose";


export const dbConnect = async () => {
    try {
        const mongoUrl = process.env.MONGO_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL is not defined in environment variables');
        }

        await mongoose.connect(mongoUrl, { dbName: "toDo" });
        console.log("MongoDB connected successfully");
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting database", error.message);
        } else {
            console.log("Error connecting database", error);
        }
    }
};