import { IEvaluation } from "../../domain/entities";
import { IEvaluationRepository } from "../../domain/repositories";
import { Evaluation } from "../../domain/schemas";

export class EvaluationRepositoryImpl implements IEvaluationRepository {
  
  async findAll(): Promise<IEvaluation[]> {
    return await Evaluation.find().populate('employeeId').populate('evaluatorId').lean();
  }
  async findById(id: string): Promise<IEvaluation | undefined> {
    return await Evaluation.findById(id).populate('employeeId').populate('evaluatorId').lean();
  }
  findByEmployeeId(employeeId: string): Promise<IEvaluation[] | undefined> {
    return Evaluation.find({
        employeeId
    }).populate('employeeId').populate('evaluatorId').lean();
  }
  async create(evaluation: IEvaluation): Promise<IEvaluation> {
    const EvaluationCreated = new Evaluation(evaluation);
    await EvaluationCreated.save();
    return EvaluationCreated;
  }
  async update(id: string, updatedEvaluation: IEvaluation): Promise<IEvaluation | undefined> {
    return await Evaluation.findByIdAndUpdate(id, updatedEvaluation, {
      new: true,
    }).lean();
  }
  async delete(id: string): Promise<boolean> {
    const result = await Evaluation.findByIdAndDelete(id).lean();
    return result != null;
  }
}
