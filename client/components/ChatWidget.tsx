"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ToggleButton from "./ToggleButton";
import { Prompt, Role, ViewMessage } from "../types/chat";
import { sendMessage, createUserMessage, fetchPrompts } from "../services/api";
import { ShimmerPrompt } from "./ShimmerPrompt";
import { PromptButton } from "./PromptButton";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ViewMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPromptLoading, setIsPromptLoading] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const toggleChat = async () => { 
    setIsOpen(!isOpen)

    if(!isOpen)
    {

    try {
      setIsPromptLoading(true)
      const data = await fetchPrompts();
      setPrompts(data);
      setIsPromptLoading(false)
    } catch (error) {
      console.error("Error fetching prompts:", error);
    }
  }
  };

  const handleSendMessage = async (content: string) => {
    if (content.trim() === "") return;
    
    const userMessage = createUserMessage(content,  Role.User);
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    try {
      const botReply: string = await sendMessage(content);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: `bot-${Date.now()}`,
          author: Role.Assistant,
          content: botReply,
          metadata: {}, 
        },
      ]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChatMessages = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
      {messages.map((message) => (
        <ChatBubble key={message.id} message={message} />
      ))}
      {isLoading && (
        <div className="text-center text-gray-500">
          <span className="animate-pulse">Bot is typing...</span>
        </div>
      )}
   
    </div>
  );

  const renderSuggestedPrompts = () => (
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 rounded-t-lg">
      <div className="flex flex-wrap gap-2">
   {isPromptLoading ? <>
   <ShimmerPrompt/>
    <ShimmerPrompt/> </> :
        (prompts.map((prompt, index) => (
          <PromptButton
          text={prompt.text}
            onClick={() => handleSendMessage(prompt.text)}
          />
        )))}
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 px-[10px]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-lg lg:w-[550px] sm:w-96 h-[500px] flex flex-col"
          >
            {renderChatMessages()}
            <ChatInput handleSendMessage={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleButton isOpen={isOpen} toggleChat={toggleChat} />
    </div>
  );
}