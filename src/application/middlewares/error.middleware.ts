import { Response, NextFunction } from "express";
import { CustomError } from "../../domain/exceptions/CustomException";
import Logger from "../../utils/winston";

export function errorHandler(
  err: any,
  // req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err || err.message === undefined) {
    return next();
  }
  if (err instanceof CustomError) {
    Logger.error(err.message);
    return res.status(err.statusCode).json({ message: err.message });
  }
  Logger.error(err.message);
  res.status(500).json({ message: "Internal server error" });
}
