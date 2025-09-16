"use server";

import { myRegisterSchema } from "maidana07/lib/zod/schema";
import prisma from "maidana07/lib/prisma/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "maidana07/lib/prisma/auth";
import executeAction from "maidana07/utils/executeAction";
import { redirect } from "next/navigation";

export default async function registerUserAction(values: unknown, callbackUrl: string = "/") {
  const validated = myRegisterSchema.safeParse(values);
  if (!validated.success) return { error: "Datos inválidos" };

  const { name, email, password } = validated.data;

  const res = await executeAction({
    successMessage: "Registro exitoso",
    errorMessage: "Error al registrar usuario",
    actionFn: async () => {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) throw new Error("Ya existe un usuario con ese correo");

      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.create({ data: { name, email, password: hashedPassword } });

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    },
  });

  if (!res.success) return { error: res.message };
  redirect(callbackUrl);
}
