import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PromptButtonProps {
  text: string,
  onClick: () => void;
}

export function PromptButton({ text,onClick }: PromptButtonProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Button
        variant="outline"
        className="w-full justify-start text-left hover:bg-blue-500 hover:text-white transition-colors duration-300"
        onClick={onClick}
      >
        {text}
      </Button>
    </motion.div>
  )
}

