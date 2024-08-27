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

  if (!err) {
    return next();
  }

  if (err instanceof CustomError) {
    if (err.error.length !== 0) {
      err.error = err.error.map((err) => {
        return err.constraints[Object.keys(err.constraints)[0]];
      });
    }
    return res.status(err.statusCode).json({
      message: err.message,
      timestamp: err.timeStamp,
      statusCode: err.statusCode,
      error: err.error,
    });
  }

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
