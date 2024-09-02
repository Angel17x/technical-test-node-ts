import { Router } from "express";
import { EvaluationController } from "../controllers";
import { authMiddleware } from "../middlewares";

const evaluationRoutes = Router();
const path = {
  getAllEvaluations: "/evaluations",
  getEvaluationById: "/evaluation",
  createEvaluation: "/create-evaluation",
  updateEvaluation: "/update-evaluation"
};

const { getAllEvaluations, getEvaluationById, createEvaluation, updateEvaluation } = new EvaluationController();

evaluationRoutes.get(path.getAllEvaluations, authMiddleware, getAllEvaluations);
evaluationRoutes.get(path.getEvaluationById, authMiddleware, getEvaluationById);
evaluationRoutes.post(path.createEvaluation, authMiddleware, createEvaluation);
evaluationRoutes.put(path.updateEvaluation, authMiddleware, updateEvaluation);

export default evaluationRoutes;
