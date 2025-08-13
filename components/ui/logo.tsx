import { motion } from "framer-motion"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-sm",
    md: "w-8 h-8 text-lg",
    lg: "w-12 h-12 text-xl"
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center`}
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-white font-bold">V</span>
      </motion.div>
      {showText && (
        <div className={`font-bold tracking-tight ${textSizes[size]}`}>
          Veri<span className="text-purple-400">Cred</span>
        </div>
      )}
    </div>
  )
} 