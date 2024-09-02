import { IFeedback } from "../../domain/entities";
import { IFeedbackRepository } from "../../domain/repositories";
import { Feedback } from "../../domain/schemas";

export class FeedbackRepositoryImpl implements IFeedbackRepository {

  findAll(): Promise<IFeedback[]> {
    return Feedback.find().lean();
  }
  findById(id: string): Promise<IFeedback | null> {
    return Feedback.findById(id).lean();
  }
  async create(feedback: IFeedback): Promise<IFeedback> {
    const FeedbackCreated = new Feedback(feedback);
    await FeedbackCreated.save();
    return FeedbackCreated;
  }
  async update(id: string, updatedFeedback: IFeedback): Promise<IFeedback | null> {
    const feedback = await Feedback.findByIdAndUpdate(id, updatedFeedback, {
      new: true,
    }).lean();
    return feedback;
  }
  async delete(id: string): Promise<boolean> {
    const result = await Feedback.findByIdAndDelete(id).lean();
    return result != null;
  }
}
