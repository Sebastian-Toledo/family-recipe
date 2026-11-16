import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser, safeNext } from "@/lib/session";
import AuthForm from "@/components/AuthForm";

export const metadata: Metadata = { title: "Ingresar" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getUser()) redirect(next);
  return <AuthForm mode="login" next={next} />;
}
