# Recetario de mamá 🍮

Un recetario familiar para guardar las recetas de mamá en formato digital y tenerlas siempre a mano.

- **Cualquiera puede ver y buscar recetas** (por nombre, ingrediente o autor) y filtrarlas por categoría.
- **Para cargar recetas hace falta una cuenta.** Por ahora el registro está cerrado: sólo entra la cuenta configurada en `ADMIN_EMAIL` (ver [Quién puede entrar](#quién-puede-entrar)). Sólo quien cargó una receta puede editarla o borrarla.
- Cada usuario guarda sus **favoritas**.
- Cada receta tiene foto, tiempo, porciones, ingredientes con subtítulos ("Para la masa:"), pasos numerados y "el secreto".
- En la receta podés ir tachando ingredientes, compartir el link o imprimirla.
- Funciona en celular y tiene modo oscuro automático.

## Levantarlo en local

Necesitás **Node.js 20.9 o superior**.

```bash
npm install
npm run dev
```

Abrí **<http://localhost:3000>**. Todo (la web y el servidor) corre en ese único puerto.

La primera vez, `npm run dev` hace solo lo siguiente:

- crea `.env.local` con un secreto aleatorio,
- crea la base de datos en `data/recetario.db`,
- carga 3 recetas de ejemplo y un usuario de prueba:

| Email                  | Contraseña |
| ---------------------- | ---------- |
| `demo@recetario.local` | `demo1234` |

Para empezar de cero, frená el servidor y borrá la carpeta `data/`.

## Quién puede entrar

El registro está cerrado: no hay botón de "Crear cuenta". La única cuenta es la que definís en variables de entorno, así el usuario y la contraseña nunca quedan en el código ni en GitHub:

| Variable         | Qué es                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| `ADMIN_EMAIL`    | Tu email. Con esto se crea la cuenta.                                   |
| `ADMIN_PASSWORD` | Tu contraseña (mínimo 8). Si no la ponés, se entra sólo con Google.     |
| `ADMIN_NAME`     | Opcional: el nombre que se muestra.                                     |

En local van en `.env.local` (no se sube a GitHub); en producción, en Vercel → **Settings → Environment Variables**. La cuenta se crea (o se le actualiza la contraseña) en cada `npm run dev` y en cada deploy.

### Entrar con Google (opcional)

1. En <https://console.cloud.google.com>, creá un proyecto → **APIs y servicios → Pantalla de consentimiento de OAuth** (tipo *Externo*; completá nombre y tu email).
2. **Credenciales → Crear credenciales → ID de cliente de OAuth → Aplicación web**, con este **URI de redireccionamiento autorizado**:
   - `https://TU-DOMINIO.vercel.app/api/auth/callback/google`
   - (y para probar en local: `http://localhost:3000/api/auth/callback/google`)
3. Copiá el ID y el secreto a `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET`.

Google sólo deja entrar a cuentas que ya existen, o sea, a la de `ADMIN_EMAIL` (usá el mismo email de Google).

Para abrir el registro a la familia más adelante: `ALLOW_SIGNUP=true` y, si querés, `INVITE_CODE` con un código.

## Scripts

| Comando               | Qué hace                                                        |
| --------------------- | --------------------------------------------------------------- |
| `npm run dev`         | Prepara la base y levanta la app en modo desarrollo.            |
| `npm run build`       | Aplica migraciones y genera la versión de producción.           |
| `npm start`           | Sirve la versión de producción (después de `build`).            |
| `npm run typecheck`   | Revisa los tipos de TypeScript.                                 |
| `npm run db:generate` | Crea una migración nueva después de cambiar `src/db/schema.ts`. |
| `npm run db:studio`   | Abre Drizzle Studio para ver y editar la base desde el navegador.|
| `npm run db:examples` | Agrega las 23 recetas de ejemplo que falten (`-- --remove` las borra todas). |

## Stack

| Parte          | Tecnología                                                                   |
| -------------- | ---------------------------------------------------------------------------- |
| Web y servidor | [Next.js 16](https://nextjs.org) (App Router, Server Actions) + React 19 + TypeScript |
| Estilos        | [Tailwind CSS 4](https://tailwindcss.com) + íconos [Lucide](https://lucide.dev) |
| Usuarios       | [Better Auth](https://better-auth.com) (email y contraseña)                  |
| Base de datos  | SQLite con [Drizzle ORM](https://orm.drizzle.team): archivo local en desarrollo, [Turso](https://turso.tech) en producción |
| Fotos          | Carpeta `data/uploads` en local, [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) en producción |

```
src/
  app/            páginas (inicio, receta, nueva/editar, favoritas, mis recetas, ingresar, registrarse)
  components/     piezas de la interfaz (tarjetas, formulario, menú, etc.)
  db/             esquema de la base (schema.ts) y conexión
  lib/            autenticación, consultas, acciones del servidor, fotos, categorías
drizzle/          migraciones SQL (se aplican solas)
scripts/          preparación de la base y datos de ejemplo
```

## Publicarlo gratis (Vercel + Turso)

Con los planes gratuitos alcanza de sobra para un recetario familiar.

### 1. Subir el código a GitHub

Asegurate de que el repo use tu email personal y no el del trabajo:

```bash
git config user.email "tu-email-personal@gmail.com"
```

### 2. Crear la base en Turso

La forma más simple: al importar el proyecto en Vercel, agregá la integración **Turso** (o después, desde **Storage**). Crea la base y carga solas las variables, que la app también acepta: `DATABASE_TURSO_DATABASE_URL` y `DATABASE_TURSO_AUTH_TOKEN` si le pusiste el prefijo `DATABASE`, o `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`. No actives la opción de crear una rama de la base por deploy.

A mano, sin la integración:

1. Creá una cuenta en <https://turso.tech> e instalá la CLI (`turso`).
2. Ejecutá:

   ```bash
   turso db create recetario
   turso db show recetario --url        # → DATABASE_URL (libsql://...)
   turso db tokens create recetario     # → DATABASE_AUTH_TOKEN
   ```

### 3. Crear el proyecto en Vercel

1. En <https://vercel.com>, entrá con tu GitHub personal y elegí **Add New → Project → family-recipe**.
2. En **Environment Variables**, cargá:
   - `DATABASE_URL` y `DATABASE_AUTH_TOKEN` (de Turso; no hacen falta si usaste la integración)
   - `BETTER_AUTH_SECRET`: generalo con `npx @better-auth/cli secret`
   - `ADMIN_EMAIL` y `ADMIN_PASSWORD`: tu cuenta (ver [Quién puede entrar](#quién-puede-entrar))
   - `GOOGLE_CLIENT_ID` y `GOOGLE_CLIENT_SECRET` (opcional): para entrar con Google
3. En **Storage → Create → Blob**, conectá un Blob Store al proyecto. Vercel agrega `BLOB_READ_WRITE_TOKEN` sola.
4. Hacé deploy. El build aplica las migraciones en Turso automáticamente.

En producción no se cargan los datos de ejemplo: entrás con la cuenta de `ADMIN_EMAIL` y empezás a cargar recetas.

> Si tu dominio no es el `.vercel.app` principal, definí también `BETTER_AUTH_URL` con la URL pública.
