import { NextFunction, Request, Response } from "express";
import { UserServiceImpl } from "../services";
import { StatusCodes } from "http-status-codes";

export class UserController {
  userService: UserServiceImpl;
  constructor() {
    this.userService = new UserServiceImpl();
  }
  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userService.findAll();
      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  };
  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  };
}
