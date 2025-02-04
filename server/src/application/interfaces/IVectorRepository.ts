import { QAVector } from "@/domain/entities/QAVector";

export interface IVectorRepository {
    findSimilarQuestions: (vectorQuery: number[]) => Promise<QAVector>
}