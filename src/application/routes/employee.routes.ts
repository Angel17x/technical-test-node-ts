import { Router } from "express";
import { EmployeeController } from "../controllers";
import { authMiddleware } from "../middlewares";

const employeesRoutes = Router();
const path = {
  getAllEmployees: "/employees",
  getEmployeeById: "/employees/:id",
  createEmployee: "/create-employee"
};

const { getAllEmployees, getEmployeeById, createEmployee } = new EmployeeController();

employeesRoutes.get(path.getAllEmployees, authMiddleware, getAllEmployees);
employeesRoutes.get(path.getEmployeeById, authMiddleware, getEmployeeById);
employeesRoutes.post(path.createEmployee, authMiddleware, createEmployee);

export default employeesRoutes;
