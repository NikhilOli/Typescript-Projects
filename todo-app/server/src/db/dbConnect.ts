import mongoose from "mongoose";


export const dbConnect = async () => {
    try {
        const mongoUrl = process.env.CLOUD_URI;        
        if (!mongoUrl) {
            throw new Error('CLOUD_URL is not defined in environment variables');
        }

        await mongoose.connect(mongoUrl, { dbName: "taskPlanner" });
        console.log(`MongoDB connected successfully in ${process.env.CLOUD_URI}`);
    } catch (error) {
        if (error instanceof Error) {
            console.log("Error connecting database", error.message);
        } else {
            console.log("Error connecting database", error);
        }
    }
};