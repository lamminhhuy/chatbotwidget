import { useState, type FormEvent } from "react"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { Input } from "./ui/input"

interface ChatInputProps {
  handleSendMessage: (content: string) => void
  isLoading: boolean
}

export default function ChatInput({ handleSendMessage, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      handleSendMessage(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex items-center gap-2">
        <Input
          type="text"
          color="#00000"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <Button type="submit"className="bg-blue-800 hover:bg-blue-400" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
      </div>
    </form>
  )
}

