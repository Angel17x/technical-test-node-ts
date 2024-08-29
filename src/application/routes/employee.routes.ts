import { Router } from "express";
import { EmployeeController } from "../controllers";
import { authMiddleware } from "../middlewares";

const employeesRoutes = Router();
const path = "/employees";

const { getAllEmployees, getEmployeeById, createEmployee } = new EmployeeController();

employeesRoutes.get(path, authMiddleware, getAllEmployees);
employeesRoutes.get(path, authMiddleware, getEmployeeById);
employeesRoutes.post(path, authMiddleware, createEmployee);

export default employeesRoutes;
