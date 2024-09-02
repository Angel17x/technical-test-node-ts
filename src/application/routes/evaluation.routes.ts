import { Router } from "express";
import { EvaluationController } from "../controllers";
import { authMiddleware } from "../middlewares";

const evaluationRoutes = Router();
const path = {
  getAllEvaluations: "/evaluations",
  getEvaluationById: "/evaluations/:id",
  getEvaluationByEmployeeId: "/evaluations/employee/:id",
  createEvaluation: "/evaluations",
  updateEvaluation: "/evaluations/:id"
};

const { getAllEvaluations, getEvaluationById, getEvaluationByEmployeeId, createEvaluation, updateEvaluation } = new EvaluationController();

evaluationRoutes.get(path.getAllEvaluations, authMiddleware, getAllEvaluations);
evaluationRoutes.get(path.getEvaluationById, authMiddleware, getEvaluationById);
evaluationRoutes.get(path.getEvaluationByEmployeeId, authMiddleware, getEvaluationByEmployeeId);
evaluationRoutes.post(path.createEvaluation, authMiddleware, createEvaluation);
evaluationRoutes.put(path.updateEvaluation, authMiddleware, updateEvaluation);

export default evaluationRoutes;
