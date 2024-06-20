import express from "express";
import "dotenv/config";
import { dbConnect } from "./src/db/dbConnect";
import { todosRouter } from "./src/routes/todos.routes";

const app = express();
const PORT = 4000;

app.use(express.json())

app.use("/", todosRouter);



dbConnect().then(() => {
    app.listen(PORT, () => {
    console.log("Server listening at PORT " + process.env.PORT);
    });
});
