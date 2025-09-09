import { Skeleton } from "maidana07/components/ui/skeleton";

interface AuthFormSkeletonProps {
  type: "login" | "register";
}

const AuthFormSkeleton = ({ type }: AuthFormSkeletonProps) => {
  return (
    <div className={`${type === "register"
      ? "grid grid-cols-1 w-full md:grid-cols-2 gap-6"
      : "space-y-6"
      }`}>

      {/* Name field (only for register) */}
      {type === "register" && (
        <div>
          <div className="flex items-center mb-2">
            <Skeleton className="h-4 w-16" /> {/* Label */}
            <Skeleton className="h-3 w-14 ml-auto" /> {/* "Opcional" */}
          </div>
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      )}

      {/* Email field */}
      <div>
        <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Password field */}
      <div>
        <Skeleton className="h-4 w-20 mb-2" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Confirm Password field (only for register) */}
      {type === "register" && (
        <div>
          <Skeleton className="h-4 w-36 mb-2" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      )}

      {/* Submit Button */}
      <Skeleton className="h-10 w-full col-span-full max-w-4/6 mx-auto bg-primary text-primary-foreground shadow-xs" />
    </div>
  );
}


export default AuthFormSkeleton