import { Router } from "express";
import { EvaluationController } from "../controllers";
import { authMiddleware } from "../middlewares";

const evaluationRoutes = Router();
const path = {
  getAllEvaluations: "/evaluations",
  getEvaluationById: "/evaluation",
  createEvaluation: "/create-evaluation"
};

const { getAllEvaluations, getEvaluationById, createEvaluation } = new EvaluationController();

evaluationRoutes.get(path.getAllEvaluations, authMiddleware, getAllEvaluations);
evaluationRoutes.get(path.createEvaluation, authMiddleware, getEvaluationById);
evaluationRoutes.post(path.createEvaluation, authMiddleware, createEvaluation);

export default evaluationRoutes;
