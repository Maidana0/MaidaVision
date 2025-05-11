import { GalleryVerticalEnd } from "lucide-react"

import LoginForm from "maidana07/components/auth/login"
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          MaidaVision
        </a>

        <div className={"flex flex-col gap-6"}>
          <LoginForm />

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
            and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page