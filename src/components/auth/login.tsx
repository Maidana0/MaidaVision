import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import Link from "next/link"
import AuthForm from "./auth-form"
import loginAction from "maidana07/actions/login-action"
import ContinueWith from "./continue-with"

const LoginForm = () => {

  return (
    <Card className="py-6">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Github or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <AuthForm
            type="login"
            onSubmitAction={loginAction}
            submitText="Iniciar Sesión"
          />

          <ContinueWith />

          <div className="text-center text-sm">
            ¿No tenés cuenta?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Registrate
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm
