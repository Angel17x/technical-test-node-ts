import { IEmployee } from "../../domain/entities";
import { IEmployeeRepository } from "../../domain/repositories";
import { Employee } from "../../domain/schemas";

export class EmployeeRepositoryImpl implements IEmployeeRepository {

  findAll(): Promise<IEmployee[]> {
    return Employee.find().exec();
  }
  findById(id: string): Promise<IEmployee | null> {
    return Employee.findById(id).exec();
  }
  async create(employee: IEmployee): Promise<IEmployee> {
    const EmployeeCreated = new Employee(employee);
    await EmployeeCreated.save();
    return EmployeeCreated;
  }
  async update(id: string, updatedEmployee: IEmployee): Promise<IEmployee | null> {
    const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
    }).exec();
    return employee;
  }
  async delete(id: string): Promise<boolean> {
    const result = await Employee.findByIdAndDelete(id).exec();
    return result != null;
  }
}
