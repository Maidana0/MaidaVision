import { Loader2 } from "lucide-react"

type PropsLoader = {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Loader = ({ className = "", size = "md" }: PropsLoader) => {
  return (
    <div className={`flex justify-center p-4 ${className}`} >
      <Loader2 className={`animate-spin ${size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8"}`} />
    </div>
  )
}

export default Loader