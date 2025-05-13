import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import { RegisterRoutes } from "./routes/routes";
import { Environment } from "./config/env.config";
import cors from "cors";

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.static("public"));
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});
RegisterRoutes(app)

if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
    const swaggerUi = require('swagger-ui-express');
    const swaggerDocument = require('../public/swagger.json');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT || 4000}`
  );
});
