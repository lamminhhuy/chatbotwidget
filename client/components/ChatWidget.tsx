"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import ToggleButton from "./ToggleButton";
import { Prompt, Role, ViewMessage } from "../types/chat";
import { sendMessage, createUserMessage, fetchPrompts } from "../services/api";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ViewMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = async (content: string) => {
    if (content.trim() === "") return;
  
    const userMessage = createUserMessage(content, { role: Role.User });
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    setIsLoading(true);
  
    const timeoutId = setTimeout(() => {
      alert(
        "This service is hosted on a free third-party provider, which may cause request delays of 50 seconds or more."
      );
    }, 7000);
  
    try {
      const botReply = await sendMessage(content);
      clearTimeout(timeoutId); 
      setMessages((prevMessages) => [...prevMessages, botReply]);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchPromptHandler = async () => {
      try {
        const data = await fetchPrompts();
        setPrompts(data); 
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    };
    
    fetchPromptHandler();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-lg shadow-lg lg:w-[400px] sm:w-96 h-[500px] flex flex-col"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
              {messages.map((message: ViewMessage) => (
                <ChatBubble key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="text-center text-gray-500">
                  <span className="animate-pulse">Bot is typing...</span>
                </div>
              )}
                  {messages.length === 0  &&   <div className="absolute bottom-0 left-0 w-full p-4 bg-gray-100 rounded-t-lg">
       
                <h3 className="text-sm font-semibold mb-2">Suggested Prompts:</h3>
                <div className="flex flex-wrap gap-2">
                 { prompts.map((prompt, index) => (
                    <button
                      key={index}
                      className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                      onClick={() => handleSendMessage(prompt.text)}
                    >
                      {prompt.text}
                    </button>
                  ))}
                </div>
              </div>}
            </div>
            <ChatInput handleSendMessage={handleSendMessage} isLoading={isLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      <ToggleButton isOpen={isOpen} toggleChat={toggleChat} />
    </div>
  );
}
