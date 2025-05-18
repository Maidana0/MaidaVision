"use client"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-muted/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4" >
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <span className="text-lg font-medium text-primary">Cargando...</span>
      </div>
    </div>
  )
}