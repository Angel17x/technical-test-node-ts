import { IEmployee } from "../../domain/entities";
import { IEmployeeRepository } from "../../domain/repositories";
import { Employee } from "../../domain/schemas";

export class EmployeeRepositoryImpl implements IEmployeeRepository {

  async findAll(): Promise<IEmployee[]> {
    return await Employee.find().populate('userId').lean();
  }
  findById(id: string): Promise<IEmployee | null> {
    return Employee.findById(id).populate('userId').lean();
  }
  async create(employee: IEmployee): Promise<IEmployee> {
    const EmployeeCreated = new Employee(employee);
    await EmployeeCreated.save();
    return EmployeeCreated;
  }
  async update(id: string, updatedEmployee: IEmployee): Promise<IEmployee | null> {
    return await Employee.findByIdAndUpdate(id, updatedEmployee, {
      new: true,
    }).lean();
  }
  async delete(id: string): Promise<boolean> {
    const result = await Employee.findByIdAndDelete(id).lean();
    return result != null;
  }
}
