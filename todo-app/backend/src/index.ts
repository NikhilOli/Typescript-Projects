import express from "express";
import "dotenv/config";
import mongoose from "mongoose";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
    res.send(`Hello from server running on PORT ${process.env.PORT}`);
});


const dbConnect = async () => {
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
dbConnect().then(() => {
    app.listen(PORT, () => {
    console.log("Server listening at PORT " + process.env.PORT);
    });
});
