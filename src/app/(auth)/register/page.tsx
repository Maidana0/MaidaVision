import RegisterForm from "maidana07/components/auth/register"
import BgGradient from "maidana07/components/ui/bg-gradient";
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation";

const Page = async () => {

  const session = await auth();
  if (session) redirect("/")

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <BgGradient />

      <div className={"flex w-sm md:w-lg max-w-full flex-col gap-6"}>
        <RegisterForm />

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
          and <a href="#">Privacy Policy</a>.
        </div>
      </div>

    </div>
  )
}

export default Page;