import type { Metadata, Viewport } from "next";
import { Archivo_Black } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { TerminalShortcut } from "@/components/TerminalShortcut";
import { TerminalFab } from "@/components/TerminalFab";
import { NavTracker } from "@/components/NavTracker";

const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  // Swap for the custom domain when one lands — resolves the OG image and
  // og:url into absolute URLs for link-preview crawlers.
  metadataBase: new URL("https://kevdotnet.vercel.app"),
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
    site: "@kevdotpng",
    creator: "@kevdotpng",
  },
};

// Person + WebSite schema — helps search engines tie this domain to Kevin's
// name and the VAN persona, and surface the social profiles as sameAs links.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Kevin van der Poll",
      alternateName: "VAN",
      url: "https://kevdotnet.vercel.app",
      jobTitle: "Digital toolmaker",
      sameAs: [
        "https://github.com/kaypon",
        "https://www.linkedin.com/in/kevinvanderpoll/",
        "https://x.com/kevdotpng",
        "https://www.instagram.com/kevdotpng/",
      ],
    },
    {
      "@type": "WebSite",
      name: "VAN — Kevin van der Poll",
      url: "https://kevdotnet.vercel.app",
    },
  ],
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
        <NavTracker />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <TerminalShortcut />
        {children}
        <TerminalFab />
        <Analytics />
      </body>
    </html>
  );
}
