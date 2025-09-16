import { Loader2 } from "lucide-react"
import cn from "maidana07/utils/cn";

type PropsLoader = {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

const Loader = ({ className = "", size = "md", text }: PropsLoader) => {
  return (
    <div className={cn(
      "flex justify-center items-center align-middle gap-2 p-4",
      className
    )} >
      <Loader2 className={`animate-spin ${size === "sm" ? "h-4 w-4" : size === "md" ? "h-6 w-6" : "h-8 w-8"}`} />
      {text && <span className="animate-pulse">{text}</span>}
    </div>
  )
}

export default Loader