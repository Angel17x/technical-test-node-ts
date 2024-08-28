import { IEvaluation } from "../../domain/entities";
import { IEvaluationRepository } from "../../domain/repositories";
import { Evaluation } from "../../domain/schemas";

export class EvaluationRepositoryImpl implements IEvaluationRepository {
  findAll(): Promise<IEvaluation[]> {
    return Evaluation.find().exec();
  }
  findById(id: string): Promise<IEvaluation | null> {
    return Evaluation.findById(id).exec();
  }
  async create(evaluation: IEvaluation): Promise<IEvaluation> {
    const EvaluationCreated = new Evaluation(evaluation);
    await EvaluationCreated.save();
    return EvaluationCreated;
  }
  async update(id: string, updatedEvaluation: IEvaluation): Promise<IEvaluation | null> {
    const evaluation = await Evaluation.findByIdAndUpdate(id, updatedEvaluation, {
      new: true,
    }).exec();
    return evaluation;
  }
  async delete(id: string): Promise<boolean> {
    const result = await Evaluation.findByIdAndDelete(id).exec();
    return result != null;
  }
}
