import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import GithubLogin from "./buttons/github-login"
import GoogleLogin from "./buttons/google-login"
import Link from "next/link"
import AuthForm from "./auth-form"
import loginAction from "maidana07/actions/login-action"

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


          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <GithubLogin />
            <GoogleLogin />
          </div>

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
