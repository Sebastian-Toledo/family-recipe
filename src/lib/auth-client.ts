import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

// Better Auth responde en inglés: traducimos los errores más comunes.
const MESSAGES: Record<string, string> = {
  INVALID_EMAIL_OR_PASSWORD: "Email o contraseña incorrectos.",
  USER_ALREADY_EXISTS: "Ya existe una cuenta con ese email.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Ya existe una cuenta con ese email.",
  INVALID_EMAIL: "El email no es válido.",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 6 caracteres.",
  PASSWORD_TOO_LONG: "La contraseña es demasiado larga.",
};

export function authErrorMessage(error: { code?: string; message?: string; status?: number }): string {
  if (error.code && MESSAGES[error.code]) return MESSAGES[error.code];
  if (error.status === 403 && error.message) return error.message;
  if (error.status === 429) return "Demasiados intentos. Esperá un minuto y probá de nuevo.";
  return "No pudimos completar la operación. Probá de nuevo.";
}
