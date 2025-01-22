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
  author: Author
  content: string
  metadata: Record<any,any> | null
}

export interface ViewMessage extends BaseMessageSchema {
  id: string
}

 