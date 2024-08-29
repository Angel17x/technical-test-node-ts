import { IEmployee } from "../../domain/entities";
import { EmployeeUseCase } from "../../domain/usecases";
import { IEmployeeService } from "./employee.service";

export class EmployeeServiceImpl implements IEmployeeService {
  employeeUseCase: EmployeeUseCase;
  constructor() {
    this.employeeUseCase = new EmployeeUseCase();
  }
  findAll(): Promise<IEmployee[]> {
    return this.employeeUseCase.getAllEmployees();
  }
  findById(id: string): Promise<IEmployee | null> {
    return this.employeeUseCase.getEmployeeById(id);
  }
  create(user: IEmployee): Promise<IEmployee> {
    return this.employeeUseCase.createEmployee(user);
  }
  update(id: string, updatedUser: IEmployee): Promise<IEmployee | null> {
    return this.employeeUseCase.updateEmployee(id, updatedUser);
  }
  delete(id: string): Promise<boolean> {
    return this.employeeUseCase.deleteEmployee(id);
  }

}
