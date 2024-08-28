import express, { Express } from "express";
import dotenv from "dotenv";
import { databaseProvider } from "./infraestructure/config/config";
import { errorHandler, morganMiddleware } from "./application/middlewares";
import router from "./application/routes/router";
import helmet from "helmet";
import cors from "cors";

// Call environment variables
dotenv.config();

// Initialize express server
const app: Express = express();

// USE HELMET AND CORS MIDDLEWARES
app.use(cors({origin: "*", credentials: true}));
app.use(helmet());

// Use JSON parser middleware
app.use(express.json());

// Use logger middleware (Morgan)
app.use(morganMiddleware);

// Routes
app.use("/api", router);

// Database provider connection (MongoDB - Mongoose)
databaseProvider();

// Use error handler middleware
app.use(errorHandler);

export default app;
