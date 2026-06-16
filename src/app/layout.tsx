import type { Metadata } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://resinova.com.tr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RESINOVA — Şeffaflığın Yeni Standardı",
    template: "%s | RESINOVA",
  },
  description:
    "Profesyonel ahşap ustaları ve tasarımcılar için geliştirilmiş ultra berrak epoksi sistemleri. Türkiye'nin premium epoksi markası.",
  keywords: [
    "epoksi reçine",
    "river table",
    "ahşap epoksi",
    "epoksi masa",
    "şeffaf epoksi",
    "profesyonel epoksi",
    "resinova",
  ],
  authors: [{ name: "RESINOVA", url: SITE_URL }],
  creator: "RESINOVA",
  publisher: "RESINOVA",
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "tr-TR": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "RESINOVA",
    url: SITE_URL,
    title: "RESINOVA — Şeffaflığın Yeni Standardı",
    description:
      "Profesyonel ahşap ustaları ve tasarımcılar için geliştirilmiş ultra berrak epoksi sistemleri.",
    images: [
      {
        url: `${SITE_URL}/images/logos/logo-altin-uzun.png`,
        width: 1200,
        height: 630,
        alt: "RESINOVA — Premium Epoksi Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@resinova",
    creator: "@resinova",
    title: "RESINOVA — Şeffaflığın Yeni Standardı",
    description:
      "Profesyonel ahşap ustaları için ultra berrak epoksi sistemleri.",
    images: [`${SITE_URL}/images/logos/logo-altin-uzun.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full antialiased"
        style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
