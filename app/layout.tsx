import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteBackground from "@/components/SiteBackground";
import { socialLinks } from "@/lib/socials";
import AutoDonatePopup from "@/components/AutoDonatePopup";

export const metadata: Metadata = {
  metadataBase: new URL("https://bitcoinforthearts.org"),
  title: {
    default: "Bitcoin for the Arts",
    template: "%s • Bitcoin for the Arts",
  },
  description:
    "A nonprofit supporting artists with Bitcoin micro-grants, workshops, residencies, and productions — with radical transparency.",
  applicationName: "Bitcoin for the Arts",
  icons: {
    icon: [
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://bitcoinforthearts.org",
    title: "Bitcoin for the Arts",
    description:
      "Supporting artists with Bitcoin micro-grants, workshops, residencies, and productions — with radical transparency.",
    images: [
      {
        url: "/resources/logos/bitcoin-for-the-arts-logo-gold.png",
        width: 512,
        height: 512,
        alt: "Bitcoin for the Arts logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bitcoin for the Arts",
    description:
      "Supporting artists with Bitcoin micro-grants, workshops, residencies, and productions — with radical transparency.",
    images: ["/resources/logos/bitcoin-for-the-arts-logo-gold.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Mobile styling toggle:
  // Default ON (more vibrant mobile color). Set NEXT_PUBLIC_MOBILE_VIBRANT=0 to revert.
  const mobileVibrant = process.env.NEXT_PUBLIC_MOBILE_VIBRANT !== '0';

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bitcoin For The Arts, Inc.",
    url: "https://bitcoinforthearts.org",
    logo: "https://bitcoinforthearts.org/resources/logos/bitcoin-for-the-arts-logo-gold.png",
    ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
  };

  return (
    <html lang="en">
      <body
        className={[
          'antialiased bg-background text-foreground relative',
          mobileVibrant ? 'mobile-vibrant' : '',
        ].join(' ')}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteBackground />
        <Navigation />
        <AutoDonatePopup />
        <div className="min-h-[calc(100svh-64px)]">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
