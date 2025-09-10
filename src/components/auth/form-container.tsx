import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "maidana07/components/ui/card"
import Link from "next/link"
import loginAction from "maidana07/actions/login-action"
import registerUserAction from "maidana07/actions/register-user-action"
import ContinueWith from "./continue-with"
import AuthFormSkeleton from "maidana07/components/skeletons/auth-form-skeleton"
import dynamic from "next/dynamic"


const FormContainer = ({ type, callbackUrl }: { type: "register" | "login", callbackUrl?: string }) => {

  const AuthForm = dynamic(() => import("maidana07/components/auth/auth-form"), {
    loading: () => <AuthFormSkeleton type={type} />
  })

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
                  submittingText="Iniciando sesión..."
                  onSubmitAction={loginAction}
                  submitText="Iniciar Sesión"
                  callbackUrl={callbackUrl}
                />
              )
              : (
                <AuthForm
                  type="register"
                  submittingText="Registrando usuario..."
                  onSubmitAction={registerUserAction}
                  submitText="Registrarse"
                  callbackUrl={callbackUrl}
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
              Al hacer clic en &ldquo;Continuar&rdquo;, aceptas nuestros
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
