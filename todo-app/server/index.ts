import express from "express";
import "dotenv/config";
import { dbConnect } from "./src/db/dbConnect";
import { todosRoutes } from "./src/routes/todos.routes";
import { userRoutes } from "./src/routes/user.routes";

const app = express();
app.use(express.json())

app.use("/", todosRoutes);
app.use("/", userRoutes);



dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
    console.log("Server listening at PORT " + process.env.PORT);
    });
});
