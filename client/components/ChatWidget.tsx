"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ChatBubble from "./ChatBubble"
import ChatInput from "./ChatInput"
import ToggleButton from "./ToggleButton"
import { Role, ViewMessage } from "../types/chat"
import { sendMessage, createUserMessage } from "../services/api"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ViewMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)

  const handleSendMessage = async (content: string) => {
    if (content.trim() === "") return

    const userMessage = createUserMessage(content, { role: Role.User })
    setMessages((prevMessages) => [...prevMessages, userMessage])

    setIsLoading(true)
    try {
      const botReply = await sendMessage(content)
      setMessages((prevMessages) => [...prevMessages, botReply])
    } catch (error) {
      console.error("Failed to send message:", error)
      // Optionally, add an error message to the chat
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-lg w-80 sm:w-96 h-[500px] flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message: ViewMessage) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="text-center text-gray-500">
                  <span className="animate-pulse">Bot is typing...</span>
                </div>
              )}
            </div>
            <ChatInput handleSendMessage={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleButton isOpen={isOpen} toggleChat={toggleChat} />
    </div>
  )
}

