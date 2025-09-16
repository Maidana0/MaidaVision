"use server";

import { myLoginSchema } from "maidana07/lib/zod/schema";
import { signIn } from "maidana07/lib/prisma/auth";
import executeAction from "maidana07/utils/executeAction";
import { redirect } from "next/navigation";

export default async function loginUserAction(values: unknown, callbackUrl: string = "/") {
  const validated = myLoginSchema.safeParse(values);
  if (!validated.success) return { error: "Datos inválidos" };

  const res = await executeAction({
    actionFn: async () => {
      await signIn("credentials", {
        email: validated.data.email,
        password: validated.data.password,
        redirect: false,
      });
    },
    errorMessage: "Error al iniciar sesión",
    successMessage: "Sesión iniciada correctamente",
  });

  if (!res.success) return { error: res.message };
  redirect(callbackUrl);
}
