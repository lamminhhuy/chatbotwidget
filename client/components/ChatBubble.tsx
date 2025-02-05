import { ViewMessage } from "@/types/chat"
import { motion } from "framer-motion"

interface ChatBubbleProps {
  message: ViewMessage
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.author.role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className="flex items-end space-x-2">
        {!isUser && (
          <img
            src={"/banner.png"}
            alt={message.author.name}
            className="w-8 h-8 rounded-full object-contain"
          />
        )}
        <div
          className={`rounded-lg p-3 ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
        >
       <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      </div>
    </motion.div>
  )
}

