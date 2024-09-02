import { NextFunction, Request, Response } from "express";
import { EvaluationServiceImpl } from "../services";
import { StatusCodes } from "http-status-codes";
import { IEvaluationService } from "../services";

export class EvaluationController {
  EvaluationService: IEvaluationService;
  constructor() {
    this.EvaluationService = new EvaluationServiceImpl();
  }
  getAllEvaluations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const evaluations = await this.EvaluationService.findAll();
      res.status(StatusCodes.OK).json(evaluations);
    } catch (error) {
      next(error);
    }
  };
  createEvaluation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const evaluation = await this.EvaluationService.create(req.body);
      res.status(StatusCodes.CREATED).json(evaluation);
    } catch (error) {
      next(error);
    }
  }
  getEvaluationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const evaluation = await this.EvaluationService.findById(id);
      res.status(StatusCodes.OK).json(evaluation);
    } catch (error) {
      next(error);
    }
  };
}
