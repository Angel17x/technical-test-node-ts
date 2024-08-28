import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AppController {
  init = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json({ message: "welcome to api nolatech" });
  };
  
  test = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if(!email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "email or password is not empty" });
    }
    res.status(StatusCodes.OK).json({ message: "welcome to api nolatech test" });
  };
}
