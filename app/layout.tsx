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
  // Resolves the OG image and og:url into absolute URLs for link-preview
  // crawlers.
  metadataBase: new URL("https://kevdotnet.net"),
  title: "Kevin van der Poll",
  description:
    "Kevin van der Poll - Nomadic artist & builder of useful systems and AI tools.",
  openGraph: {
    siteName: "Kevin van der Poll",
    title: "Kevin van der Poll",
    description:
      "Kevin van der Poll - Nomadic artist & builder of useful systems and AI tools.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@kevdottxt",
    creator: "@kevdottxt",
  },
};

// Person + WebSite schema — helps search engines tie this domain to Kevin's
// name, and surface the social profiles as sameAs links.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Kevin van der Poll",
      url: "https://kevdotnet.net",
      jobTitle: "Digital toolmaker",
      sameAs: [
        "https://github.com/kaypon",
        "https://www.linkedin.com/in/kevinvanderpoll/",
        "https://x.com/kevdottxt",
        "https://www.instagram.com/kevdotpng/",
      ],
    },
    {
      "@type": "WebSite",
      name: "Kevin van der Poll",
      url: "https://kevdotnet.net",
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
