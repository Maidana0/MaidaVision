import RegisterForm from "maidana07/components/auth/form-container"
import BgGradient from "maidana07/components/ui/bg-gradient";
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation";

export const metadata = {
  title: "Registrarse",
  description: "Crea tu cuenta para comenzar a disfrutar de las funcionalidades de Maidanavision",
  keywords: ["Maidanavision", "Registrarse", "Crea tu cuenta"],
  openGraph: {
    title: "Registrarse",
    description: "Crea tu cuenta para disfrutar las funcionalidades de Maidanavision"
  }
}

const Page = async () => {
  const session = await auth();
  if (session) redirect("/")

  return (
    <div className="flex flex-col items-center justify-center py-10 p-6">
      <BgGradient />

      <div className={"flex w-sm md:w-lg max-w-full flex-col gap-6"}>
        <RegisterForm type="register" />
      </div>

    </div>
  )
}

export default Page;