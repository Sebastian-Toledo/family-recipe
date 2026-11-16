import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El cliente de libSQL usa binarios nativos: que Next no intente empaquetarlo.
  serverExternalPackages: ["@libsql/client", "libsql"],
  // Evita que Next confunda la raíz del proyecto si hay otro package-lock.json más arriba.
  turbopack: { root: process.cwd() },
  // Oculta el círculo "N" de desarrollo (los errores se siguen mostrando igual).
  devIndicators: false,
  experimental: {
    serverActions: {
      // Las fotos se achican en el navegador antes de subirse; esto es un margen de seguridad.
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
