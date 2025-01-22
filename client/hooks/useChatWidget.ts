import { useState } from "react"

export function useChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => setIsOpen(!isOpen)

  return { isOpen, toggleChat }
}

