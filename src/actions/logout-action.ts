"use server";

import { signOut } from "maidana07/lib/prisma/auth";
import { redirect } from "next/navigation";

export async function logoutAction() {
  await signOut({
    redirect: false,
  });
  redirect("/login");
}
