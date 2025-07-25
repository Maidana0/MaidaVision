import LoginForm from "maidana07/components/auth/form-container"
import BgGradient from "maidana07/components/ui/bg-gradient"
import { auth } from "maidana07/lib/prisma/auth"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Iniciar Sesión",
  description: "Inicia sesión para comenzar a disfrutar de las funcionalidades de Maidanavision",
  keywords: ["Maidanavision", "Iniciar Sesión", "Accede a tu cuenta"],
  openGraph: {
    title: "Iniciar Sesión",
    description: "Inicia sesión para disfrutar las funcionalidades de Maidanavision"
  }
}

const Page = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="flex flex-col items-center justify-center py-10 p-6">
      <BgGradient />

      <div className={"flex flex-col max-w-sm gap-6"}>
        <LoginForm type="login" />
      </div>

    </div>
  )
}

export default Page