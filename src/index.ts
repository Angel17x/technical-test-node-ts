import express, { Express, json, Request, Response } from "express";
import dotenv from "dotenv";
import { databaseProvider } from "./infraestructure/config/config";
import { errorHandler, morganMiddleware } from "./application/middlewares";
import router from "./application/routes/router";

// call environment variables
dotenv.config();

// call express server
const app: Express = express();

// port number
const port = process.env.PORT || 3000;

// use express.json()
app.use(json());

// routes
app.use("/api", router);

// use error handler
app.use(errorHandler);

// use logger (morgan)
app.use(morganMiddleware);

// database provider connection (MongoDB - Mongoose)
databaseProvider();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
