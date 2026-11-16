import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import Header from "@/components/Header";
import { paletteBootScript, themeBootScript } from "@/lib/boot-scripts";
import { DEFAULT_PALETTE } from "@/lib/palettes";
import { SITE_NAME } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-fraunces" });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito" });

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: "Las recetas de mamá, siempre a mano.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" data-palette={DEFAULT_PALETTE} className={`${fraunces.variable} ${nunito.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript + paletteBootScript }} />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 md:py-10">{children}</main>
        <footer className="border-t border-line bg-brand-50/60 py-6 text-center text-sm text-muted print:hidden dark:bg-transparent">
          Hecho con cariño para guardar las recetas de mamá 🧡
        </footer>
      </body>
    </html>
  );
}
