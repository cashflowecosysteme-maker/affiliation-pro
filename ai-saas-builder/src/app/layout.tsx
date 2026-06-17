import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NyXia • Ta partenaire Cercle du Miroir™",
  description: "Offre à tes clientes une présence qui ne s'éteint jamais. NyXia prolonge ta douceur, ton écoute et ton accompagnement jour après jour, tout en te laissant enfin l'espace de respirer.",
  keywords: [ "NyXia",
    "assistante IA",
    "praticienne",
    "thérapeute",
    "coach",
    "accompagnante",
    "IA thérapeute",
    "soutien client",
    "accompagnement personnalisé",
    "Cercle du Miroir"],
  authors: [{ name: "Diane Boyer" }],
  icons: {
    icon: [
      { url: "/FavIcon.png", type: "image/png" },
    ],
    apple: "/FavIcon.png",
  },
  openGraph: {
    title: "AffiliationPro - Ton Programme d'Affiliation en 5 Minutes",
    description: "Alternative à l'affiliation Systeme.io. Crée ton programme avec 3 niveaux de commissions.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
// Force deploy 1774654200
