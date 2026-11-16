import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { db, schema } from "@/db";

const inviteCode = process.env.INVITE_CODE?.trim() || null;

function baseURL() {
  if (process.env.BETTER_AUTH_URL) return process.env.BETTER_AUTH_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export const auth = betterAuth({
  baseURL: baseURL(),
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 días: que la familia no tenga que loguearse seguido
  },
  hooks: {
    // Si hay INVITE_CODE, sólo puede registrarse quien lo conozca.
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email" || !inviteCode) return;
      if (ctx.headers?.get("x-invite-code")?.trim() !== inviteCode) {
        throw new APIError("FORBIDDEN", { message: "El código de invitación no es correcto." });
      }
    }),
  },
  plugins: [nextCookies()],
});

export const isInviteCodeRequired = inviteCode !== null;
