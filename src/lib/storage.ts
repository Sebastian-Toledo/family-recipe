import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { del, put } from "@vercel/blob";

export const ALLOWED_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};
export const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

export const LOCAL_UPLOADS_DIR = path.join(process.cwd(), "data", "uploads");
const LOCAL_PREFIX = "/imagenes/";

// Si el proyecto tiene un Blob Store de Vercel conectado, las fotos van ahí.
// Si no (en local), se guardan en data/uploads y las sirve la ruta /imagenes/[name].
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function saveImage(file: File): Promise<string> {
  const name = `${crypto.randomUUID()}${ALLOWED_IMAGE_TYPES[file.type]}`;
  if (useBlob()) {
    const blob = await put(`recetas/${name}`, file, { access: "public", contentType: file.type });
    return blob.url;
  }
  await fs.mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_UPLOADS_DIR, name), Buffer.from(await file.arrayBuffer()));
  return `${LOCAL_PREFIX}${name}`;
}

export async function deleteImage(url: string | null) {
  if (!url) return;
  try {
    if (url.startsWith(LOCAL_PREFIX)) {
      await fs.rm(path.join(LOCAL_UPLOADS_DIR, path.basename(url)), { force: true });
    } else if (useBlob() && url.includes(".blob.vercel-storage.com/")) {
      await del(url);
    }
  } catch (err) {
    console.error("No se pudo borrar la imagen", url, err);
  }
}
