import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { db, schema } from "@/db";

const inviteCode = process.env.INVITE_CODE?.trim() || null;

// Registro cerrado por defecto: sólo entra la cuenta de ADMIN_EMAIL (la crea scripts/setup.ts).
// Con ALLOW_SIGNUP=true se puede volver a abrir (y combinar con INVITE_CODE).
const signUpOpen = process.env.ALLOW_SIGNUP === "true";

// Ingreso con Google: sólo si están las credenciales. Con el registro cerrado, Google
// sólo deja entrar a cuentas que ya existen (o sea, al email de ADMIN_EMAIL).
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleEnabled = Boolean(googleClientId && googleClientSecret);

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
    disableSignUp: !signUpOpen,
    minPasswordLength: 6,
    autoSignIn: true,
  },
  socialProviders: googleEnabled
    ? {
        google: {
          clientId: googleClientId!,
          clientSecret: googleClientSecret!,
          disableSignUp: !signUpOpen,
        },
      }
    : {},
  account: {
    // Si entrás con Google usando el mismo email que tu cuenta, se vinculan solas.
    accountLinking: { enabled: true, trustedProviders: ["google"] },
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
export const isSignUpOpen = signUpOpen;
export const isGoogleEnabled = googleEnabled;
