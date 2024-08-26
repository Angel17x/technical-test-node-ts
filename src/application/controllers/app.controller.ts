import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class AppController {
  init = async (req: Request, res: Response): Promise<void> => {
    res.status(StatusCodes.OK).json({ message: "welcome to api nolatech" });
  };
}
