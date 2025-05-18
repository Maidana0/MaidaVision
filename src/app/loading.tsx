"use client"

import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="flex flex-col items-center gap-4"
      >
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="text-lg font-semibold text-primary">Cargando...</span>
      </motion.div>
    </div>
  )
}