"use server";

import { signOut } from "maidana07/lib/prisma/auth";

export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/login"
  });
}
