export interface Author {
  role: Role
  name?: string
  avatar?: string
}

export enum Role {
  User = "user",
  Assistant = "model",
}

export interface BaseMessageSchema {
  author: Role
  content: string
  metadata: Record<any,any> | null
}

export interface ViewMessage extends BaseMessageSchema {
  id: string
}

export interface Prompt {
  text: string,
  category: string
}
 export  interface QA {
   question: string
   answer: string
 }