"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const dbConnect_1 = require("./src/db/dbConnect");
const todos_routes_1 = require("./src/routes/todos.routes");
const user_routes_1 = require("./src/routes/user.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use("/", todos_routes_1.todosRoutes);
app.use("/", user_routes_1.userRoutes);
(0, dbConnect_1.dbConnect)().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server listening at PORT ${process.env.PORT}`);
    });
});
