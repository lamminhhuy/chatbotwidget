import { motion } from "framer-motion"

export function ShimmerPrompt() {
  return (
    <div className="w-full h-10 bg-gray-200 rounded-md overflow-hidden relative">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.5,
          ease: "linear",
        }}
      />
    </div>
  )
}

