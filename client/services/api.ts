import { BASE_URL } from "@/contants/common";
import type { Author, BaseMessageSchema, ViewMessage } from "../types/chat"
import axios from 'axios';




export async function sendMessage(content: string): Promise<ViewMessage> {

  const {data: {data}} = await axios.post(`${BASE_URL}/api/v1/chat`,{
    content
  }, {withCredentials: true})

  return data.message
}

export function createUserMessage(content: string, author: Author): ViewMessage {
  return {
    id:'',
    author,
    content,
    metadata: null 
  }
}



