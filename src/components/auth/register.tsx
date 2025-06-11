import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import AuthForm from "./auth-form"
import Link from "next/link"
import registerUserAction from "maidana07/actions/register-user-action"
import ContinueWith from "./continue-with"

const RegisterForm = async () => {
  return (
    <Card className="py-6">
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

            <ContinueWith />

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