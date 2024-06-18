import express from "express";
import "dotenv/config";
import { dbConnect } from "../db/dbConnect";
import Todo from "../models/todo";

const app = express();
const PORT = 4000;

app.get("/", async (req, res) => {
    const todos = await Todo.find()

    res.status(200).send(todos[0].todo)
    // res.send(`Hello from server running on PORT ${process.env.PORT}`);
});



dbConnect().then(() => {
    app.listen(PORT, () => {
    console.log("Server listening at PORT " + process.env.PORT);
    });
});
