import type { Metadata, Viewport } from "next";
import { Archivo_Black } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TerminalShortcut } from "@/components/TerminalShortcut";
import { TerminalFab } from "@/components/TerminalFab";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  // Swap for the custom domain when one lands — resolves the OG image and
  // og:url into absolute URLs for link-preview crawlers.
  metadataBase: new URL("https://kevssite.vercel.app"),
  title: "VAN — Kevin van der Poll",
  description:
    "A one-page halftone poster introducing Kevin van der Poll — Miami-based builder of useful systems and AI tools.",
  openGraph: {
    siteName: "VAN — Kevin van der Poll",
    title: "VAN — Kevin van der Poll",
    description:
      "A one-page halftone poster introducing Kevin van der Poll — Miami-based builder of useful systems and AI tools.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2f2f0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivoBlack.variable}>
      <body>
        <TerminalShortcut />
        {children}
        <TerminalFab />
        <Analytics />
      </body>
    </html>
  );
}
