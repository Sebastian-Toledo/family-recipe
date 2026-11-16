import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-fraunces" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: { default: "Recetario de mamá", template: "%s · Recetario de mamá" },
  description: "Las recetas de la familia, siempre a mano.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${fraunces.variable} ${nunito.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 md:py-10">{children}</main>
        <footer className="border-t border-line py-6 text-center text-sm text-muted print:hidden">
          Hecho con cariño para guardar las recetas de la familia 🧡
        </footer>
      </body>
    </html>
  );
}
