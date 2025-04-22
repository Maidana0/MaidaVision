import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import GithubLogin from "./buttons/github-login"
import GoogleLogin from "./buttons/google-login"
import AuthForm from "./auth-form"
import Link from "next/link"
import registerUserAction from "maidana07/actions/register-user-action"

const RegisterForm = async () => {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>
          Login with your Github or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="grid gap-6">

            <AuthForm
              type="register"
              onSubmitAction={registerUserAction}
              submitText="Registrarse"
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
             ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Inicia sesión
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RegisterForm