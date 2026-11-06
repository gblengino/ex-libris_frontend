import { Suspense } from "react";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import AuthProviderLoader from "@/components/providers/AuthProviderLoader";

import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Ex Libris | Plataforma de Reseñas Literarias",
    template: "%s | Ex Libris",
  },
  description:
    "Una plataforma dedicada a la lectura, el análisis y la crítica literaria.",
  };
  
  
export default async function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <AuthProviderLoader>
              {children}
            </AuthProviderLoader>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}