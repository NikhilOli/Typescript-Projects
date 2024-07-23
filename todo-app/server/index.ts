import express, { Application } from 'express';
import cors from 'cors';
import 'dotenv/config';
import { dbConnect } from './src/db/dbConnect';
import { todosRoutes } from './src/routes/todos.routes';
import { userRoutes } from './src/routes/user.routes';

const app: Application = express();

app.use(express.json());

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
};

app.use(cors(corsOptions));

app.use("/", todosRoutes);
app.use("/", userRoutes);

dbConnect().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening at PORT ${process.env.PORT}`);
    });
});
