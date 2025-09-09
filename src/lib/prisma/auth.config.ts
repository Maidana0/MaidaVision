import type { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials";
import { myLoginSchema } from "../zod/schema";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const validated = myLoginSchema.safeParse(credentials);
        if (!validated.success) throw new Error("Datos inválidos");

        const { email, password } = validated.data;
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("Correo o contraseña incorrectos");
        }

        const isValid = await bcrypt.compare(password, user.password || "");
        if (!isValid) {
          throw new Error("Correo o contraseña incorrectos");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    // maxAge: 7 * 24 * 60 * 60, // 7 días
    maxAge: 60 * 60, // 1 hora
  },
} satisfies NextAuthConfig;
