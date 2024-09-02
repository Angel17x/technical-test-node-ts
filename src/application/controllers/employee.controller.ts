import { NextFunction, Request, Response } from "express";
import { EmployeeServiceImpl } from "../services";
import { StatusCodes } from "http-status-codes";
import { IEmployeeService } from "../services";

export class EmployeeController {
  employeeService: IEmployeeService;
  constructor() {
    this.employeeService = new EmployeeServiceImpl();
  }
  getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employees = await this.employeeService.findAll();
      res.status(StatusCodes.OK).json(employees);
    } catch (error) {
      next(error);
    }
  };
  createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employee = await this.employeeService.create(req.body);
      res.status(StatusCodes.CREATED).json(employee);
    } catch (error) {
      next(error);
    }
  }
  getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const employeeId = req.query.id as string;
      const employee = await this.employeeService.findById(employeeId);
      res.status(StatusCodes.OK).json(employee);
    } catch (error) {
      next(error);
    }
  };
}
