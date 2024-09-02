import { Response, NextFunction, Request } from "express";
import { CustomError } from "../../domain/exceptions/CustomException";
import Logger from "../../utils/winston";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  Logger.error(err.message || "Unhandled exception");

  // Asegúrate de que err no sea nulo o indefinido
  if (!err) {
    return next();
  }

  // Manejo de errores personalizados
  if (err instanceof CustomError) {
    // Verifica que err.error sea un array y que no esté vacío
    if (Array.isArray(err.error) && err.error.length !== 0) {
      err.error = err.error.map((error) => {
        return error.constraints ? error.constraints[Object.keys(error.constraints)[0]] : null;
      }).filter(() => Boolean)
    } else {
      err.error = []; // Asegura que err.error sea un array en caso contrario
    }

    return res.status(err.statusCode).json({
      message: err.message,
      timestamp: err.timeStamp,
      statusCode: err.statusCode,
      error: err.error,
    });
  }

  // Manejo de errores de Mongoose
  if (err instanceof mongoose.Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      timeStamp: new Date(),
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }

  // Manejo de otros tipos de errores no capturados explícitamente
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message ?? "Internal server error",
    timeStamp: new Date(),
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });
}