import { motion } from "framer-motion"

interface ToggleButtonProps {
  isOpen: boolean
  toggleChat: () => void
}

export default function ToggleButton({ isOpen, toggleChat }: ToggleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleChat}
      className="bg-blue-500 text-white w-12 h-12 mt-2 rounded-full shadow-lg flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        )}
      </svg>
    </motion.button>
  )
}

