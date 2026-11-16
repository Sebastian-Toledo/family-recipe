import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isInviteCodeRequired } from "@/lib/auth";
import { getUser, safeNext } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "Crear cuenta" };

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getUser()) redirect(next);
  return <AuthForm mode="register" next={next} inviteCodeRequired={isInviteCodeRequired} />;
}
