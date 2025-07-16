import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import Link from "next/link"
import AuthForm from "./auth-form"
import loginAction from "maidana07/actions/login-action"
import registerUserAction from "maidana07/actions/register-user-action"
import ContinueWith from "./continue-with"

const FormContainer = ({ type }: { type: "register" | "login" }) => {

  return (
    <Card className="py-6">
      <CardHeader className="text-center mb-5">
        <CardTitle className="text-xl">
          {type === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
        </CardTitle>
        <CardDescription>
          {type === "login" ? "Inicia sesión para continuar" : "Regístrate para comenzar"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {
            type === "login"
              ? (
                <AuthForm
                  type="login"
                  onSubmitAction={loginAction}
                  submitText="Iniciar Sesión"
                />
              )
              : (
                <AuthForm
                  type="register"
                  onSubmitAction={registerUserAction}
                  submitText="Registrarse"
                />
              )
          }

          <ContinueWith />

          <div className="text-center text-sm">
            {type === "login" ? "¿No tenés cuenta? " : "¿Ya tienes cuenta? "}
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="underline underline-offset-4"
            >
              {type === "login" ? "Registrate" : "Inicia sesión"}
            </Link>
          </div>

          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            <p>
              Al hacer clic en "Continuar", aceptas nuestros
              <a href="#">Términos de servicio</a>{" "}
              y nuestra
              <a href="#">Política de privacidad</a>.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

export default FormContainer
