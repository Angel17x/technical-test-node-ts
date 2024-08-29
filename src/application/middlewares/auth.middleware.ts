import { NextFunction, Request, Response } from "express";
import { AuthServiceImpl } from "../services/auth.service.impl";
import { CustomError } from "../../domain/exceptions/CustomException";
import { StatusCodes } from "http-status-codes";

const service = new AuthServiceImpl();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Implementar middleware de autenticación
  // Validar token, autorización, etc.
  if(req.headers.authorization === undefined) next(new CustomError('Authentication required', StatusCodes.UNAUTHORIZED, new Date()))
  const authorization = req.headers.authorization.split(' ');
  const token = authorization[1];
  const user = await service.verifyToken(token);
  if(!user) next(new CustomError('Invalid token', StatusCodes.UNAUTHORIZED, new Date()))
  req['user'] = user;
  return next();
}