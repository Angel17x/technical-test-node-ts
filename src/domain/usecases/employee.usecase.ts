import { StatusCodes } from "http-status-codes";
import { EmployeeRepositoryImpl } from "../../infraestructure/repositories";
import { IEmployee } from "../entities";
import { CustomError } from "../exceptions/CustomException";
import { IEmployeeRepository } from "../repositories";
import { CreateEmployeeDto } from "../../application/dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export class EmployeeUseCase {
  employeeRepo: IEmployeeRepository;
  constructor() {
    this.employeeRepo = new EmployeeRepositoryImpl();
  }
  async getAllEmployees(): Promise<IEmployee[]> {
    try {
      return await this.employeeRepo.findAll();
    } catch (error) {
      throw new CustomError(
        "Error fetching employees",
        StatusCodes.INTERNAL_SERVER_ERROR,
        new Date()
      );
    }
  }
  async getEmployeeById(id: string): Promise<IEmployee | null> {
    if (id === undefined) throw new Error("Employee ID is required");
    return this.employeeRepo.findById(id);
  }
  async createEmployee(employee: IEmployee): Promise<IEmployee> {
    try {
      if (!employee) throw new CustomError("Employee is require", StatusCodes.BAD_REQUEST, new Date());
      const employeeDto = plainToInstance(CreateEmployeeDto, employee);
      const errors = await validate(employeeDto);
      if (errors.length > 0) throw new CustomError("Error creating employee", StatusCodes.BAD_REQUEST, new Date(), errors);
      return this.employeeRepo.create(employee);
    } catch (error) {
      if (error instanceof CustomError) throw new CustomError(error.message, error.statusCode, error.timeStamp, error.error);
      throw new CustomError(error.message ?? "Error creating employee", StatusCodes.INTERNAL_SERVER_ERROR, new Date());
    }
  }
  async updateEmployee(id: string, updatedEmployee: IEmployee): Promise<IEmployee | null> {
    return this.employeeRepo.update(id, updatedEmployee);
  }
  async deleteEmployee(id: string): Promise<boolean> {
    return this.employeeRepo.delete(id);
  }
}
