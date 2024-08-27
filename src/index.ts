import express, { Express, json } from "express";
import dotenv from "dotenv";
import { databaseProvider } from "./infraestructure/config/config";
import { errorHandler, morganMiddleware } from "./application/middlewares";
import router from "./application/routes/router";

// Call environment variables
dotenv.config();

// Initialize express server
const app: Express = express();

// Port number
const port = process.env.PORT || 3000;

// Use JSON parser middleware
app.use(json());

// Use logger middleware (Morgan)
app.use(morganMiddleware);

// Routes
app.use("/api", router);

// Database provider connection (MongoDB - Mongoose)
databaseProvider();

// Use error handler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
