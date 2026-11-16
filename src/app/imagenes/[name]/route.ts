import fs from "node:fs/promises";
import path from "node:path";
import { LOCAL_UPLOADS_DIR } from "@/lib/storage";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

/** Sirve las fotos guardadas en local (data/uploads). En producción las fotos viven en Vercel Blob. */
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const ext = path.extname(name).toLowerCase();
  if (!/^[\w-]+\.(jpg|png|webp)$/i.test(name) || !CONTENT_TYPES[ext]) {
    return new Response("No encontrada", { status: 404 });
  }
  try {
    const file = await fs.readFile(path.join(LOCAL_UPLOADS_DIR, name));
    return new Response(new Uint8Array(file), {
      headers: { "Content-Type": CONTENT_TYPES[ext], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("No encontrada", { status: 404 });
  }
}
