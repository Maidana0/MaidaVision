"use client"
import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      title={"Volver arriba"}
      aria-label="Volver arriba"
      onClick={scrollToTop}
      className={`fixed transition-all bottom-12 right-6 z-50 p-2.5 rounded-full text-foreground shadow-sm shadow-foreground
         ${visible ? "opacity-100 hover:bg-primary/50 cursor-pointer" : "opacity-0 pointer-events-none"
        }`}
    >
      <ArrowUp className="md:size-6 size-5" />
    </button>
  )
}