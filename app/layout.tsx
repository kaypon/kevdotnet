import type { Metadata, Viewport } from "next";
import { Archivo_Black, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { TerminalShortcut } from "@/components/TerminalShortcut";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-terminal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAN — Kevin van der Poll",
  description:
    "A one-page halftone poster introducing Kevin van der Poll — Miami-based builder of useful systems and AI tools.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f1ead3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${shareTechMono.variable}`}>
      <body>
        <TerminalShortcut />
        {children}
      </body>
    </html>
  );
}
