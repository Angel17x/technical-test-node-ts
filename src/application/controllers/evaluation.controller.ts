import { NextFunction, Request, Response } from "express";
import { EvaluationServiceImpl } from "../services";
import { StatusCodes } from "http-status-codes";
import { IEvaluationService } from "../services";
import { IEvaluation } from "../../domain/entities";

export class EvaluationController {
  EvaluationService: IEvaluationService;
  constructor() {
    this.EvaluationService = new EvaluationServiceImpl();
  }
  getAllEvaluations = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IEvaluation[]>> => {
    try {
      const evaluations = await this.EvaluationService.findAll();
      return res.status(StatusCodes.OK).json(evaluations);
    } catch (error) {
      next(error);
    }
  };
  createEvaluation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IEvaluation>> => {
    try {
      const evaluation = await this.EvaluationService.create(req.body);
      return res.status(StatusCodes.CREATED).json(evaluation);
    } catch (error) {
      next(error);
    }
  }

  getEvaluationById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IEvaluation>> => {
    try {
      const idEvaluation = req.query.id as string;
      const evaluation = await this.EvaluationService.findById(idEvaluation);
      return res.status(StatusCodes.OK).json(evaluation);
    } catch (error) {
      next(error);
    }
  };

  updateEvaluation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IEvaluation>> => {
    try {
      const { id } = req.query;
      const evaluation = req.body;
      const updateEvaluation = await this.EvaluationService.update(id as string, evaluation);
      if (updateEvaluation) {
        return res.status(StatusCodes.OK).json(updateEvaluation);
      } 
    } catch (error) {
      next(error);
    }
  }
}
