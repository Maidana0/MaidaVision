import { GalleryVerticalEnd } from "lucide-react"

import RegisterForm from "maidana07/components/auth/register-form"
import { auth } from "maidana07/lib/auth"
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();
  if (session) redirect("/")

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          MaidaVision
        </a>
        <RegisterForm />
      </div>
    </div>
  )
}

export default Page;