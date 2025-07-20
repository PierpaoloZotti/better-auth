"use server";
import { db } from "@/db/drizzle";
import { user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "Login realizado com sucesso" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Erro desconhecido" };
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });
    return { success: true, message: "Cadastro realizado com sucesso" };
  } catch (error) {
    const e = error as Error;
    return { success: false, message: e.message || "Erro desconhecido" };
  }
};

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!currentUser) {
    redirect("/login");
  }

  return {
    ...session,
    currentUser,
  };
};

export const isAdmin = async () => {
  const { currentUser } = await getCurrentUser();
  const isAdmin = currentUser.role === "admin";
  return isAdmin;
};
