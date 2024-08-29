import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../domain/exceptions/CustomException";
import { StatusCodes } from "http-status-codes";
import { Role } from "../enums/Role";

export const adminMiddlware = (req: Request, res: Response, next: NextFunction) => {
  console.log(req['user'])
  if(!req['user']){
    return next(new CustomError('you are not a valid user to access this route', StatusCodes.FORBIDDEN, new Date()))
  }
  const role = req['user'].role;
  if(role !== Role.ADMIN){
    return next(new CustomError('this user does not have admin privileges', StatusCodes.FORBIDDEN, new Date()))
  }
  next();
}
