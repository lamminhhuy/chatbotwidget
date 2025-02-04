import { BASE_URL } from "@/contants/common";
import type { Author, Prompt, ViewMessage } from "../types/chat"
import axios from 'axios';


export async function fetchPrompts(): Promise<Prompt[]> {

  const {data: {data}} = await axios.get<{data :{prompts:Prompt[]}}>(`${BASE_URL}/api/v1/prompt`)
  return data.prompts
}

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



