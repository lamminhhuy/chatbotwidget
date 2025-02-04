
export class SimilarityService  {
     cosineSimilarity(vec1: number[], vec2: number[]): number {
      const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
      const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
      const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));
      return dotProduct / (magnitude1 * magnitude2);
    }
  }