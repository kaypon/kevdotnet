import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Archivo_Black } from "next/font/google";
import "./globals.css";

const lobster = localFont({
  src: "./fonts/Lobster-Regular.ttf",
  variable: "--font-lobster",
  display: "swap",
  weight: "400",
  style: "normal",
});

const pacifico = localFont({
  src: "./fonts/Pacifico-Regular.ttf",
  variable: "--font-pacifico",
  display: "swap",
  weight: "400",
  style: "normal",
});

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VAN — Useful Systems / Strange Ideas",
  description:
    "VAN makes useful systems, strange ideas, and work worth looking at.",
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
    <html
      lang="en"
      className={`${lobster.variable} ${pacifico.variable} ${archivoBlack.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
