import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../services";
import { StatusCodes } from "http-status-codes";
import { AuthServiceImpl } from "../services/auth.service.impl";
import { IUser } from "../../domain/entities";

export class AuthController {
  userService: UserServiceImpl;
  authService: AuthServiceImpl;
  constructor() {
    this.userService = new UserServiceImpl();
    this.authService = new AuthServiceImpl();
  }
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> => {
    try {
      const user = await this.userService.create(req.body);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<string>> => {
    try {
      const token = await this.authService.sign(req.body);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  }
}
