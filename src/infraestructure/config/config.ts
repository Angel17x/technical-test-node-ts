import mongoose from "mongoose";
import { CustomError } from "../../domain/exceptions/CustomException";
import { StatusCodes } from "http-status-codes";

// Configuración para reintentos
const maxRetries = 5;
let retryCount = 0;

export const databaseProvider = () => {
  const connectWithRetry = () => {
    mongoose
      .connect(`${process.env.MONGODB_URI}`, {
        dbName: process.env.MONGODB_DB_NAME,
      })
      .then(() => console.log("🛢️ Conectado a MongoDB"))
      .catch((err) => {
        if (retryCount < maxRetries) {
          console.error(
            `⚠️ MongoDB connection unsuccessful, retry after 5 seconds. Attempt ${
              retryCount + 1
            }`
          );
          setTimeout(connectWithRetry, 5000); // Espera 5 segundos antes de reintentar
          retryCount += 1;
        } else {
          const error = new CustomError(
            "⚠️ Could not connect to MongoDB",
            StatusCodes.INTERNAL_SERVER_ERROR,
            new Date()
          );
          console.error(error);
          // Aquí puedes optar por notificar el error en lugar de detener la aplicación
        }
      });
  };

  connectWithRetry();
};
