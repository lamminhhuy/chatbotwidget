import { IVectorRepository } from "@/application/interfaces/IVectorRepository";
import QAVectorModel from "../models/QAVector";
import { PipelineStage } from "mongoose";

export class VectorRepositoryImpl implements IVectorRepository {
    async findSimilarQuestions (queryVector: number[]){
        const agg = [
            {
              '$vectorSearch': {
                'index': 'vector_index',
                'path': 'embedding',
                'queryVector': queryVector,
                exact: true,
                limit: 1
              }
            }, {
              '$project': {
                '_id': 0,
                'answer': 1, 
                'question': 1,
                'score': {
                  '$meta': 'vectorSearchScore'
                }
              }
            }
          ];
          const result = await QAVectorModel.aggregate(agg as PipelineStage[]);
          return result[0]
        }
}