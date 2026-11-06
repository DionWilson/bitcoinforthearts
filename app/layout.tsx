import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
import SiteFooter from "@/components/SiteFooter";
import SiteBackground from "@/components/SiteBackground";
import { socialLinks } from "@/lib/socials";
import AutoDonatePopup from "@/components/AutoDonatePopup";
import CookieBanner from "@/components/CookieBanner";
import ConsentAnalytics from "@/components/ConsentAnalytics";

// Local files, not next/font/google. Google sometimes returns an
// extensionless font URL that makes the Turbopack build fail.
const roboto = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/roboto/files/roboto-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-roboto",
});

const playfair = localFont({
  src: [
    {
      path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/@fontsource/playfair-display/files/playfair-display-latin-700-normal.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-playfair",
});

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
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
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
        // Square share preview that already lives in the social pack —
        // black "BITCOIN FOR THE / ARTS" + orange Arts script on cream,
        // with breathing room around the type so platform crops don't
        // clip the corners. See public/brand-kit/README.md for the full
        // social asset directory.
        url: "/social/BFTA-social-post-cream-orange-2160.png",
        width: 2160,
        height: 2160,
        alt: "Bitcoin for the Arts",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bitcoin for the Arts",
    description:
      "Supporting artists with Bitcoin micro-grants, workshops, residencies, and productions — with radical transparency.",
    images: ["/social/BFTA-social-post-cream-orange-2160.png"],
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
    logo: "https://bitcoinforthearts.org/brand-kit/square-bugs/square-cream-orange-alt.png",
    ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.href) } : {}),
  };

  return (
    <html lang="en" className={`${roboto.variable} ${playfair.variable}`}>
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
        <ScrollToTop />
        <Navigation />
        <AutoDonatePopup />
        <div className="min-h-[calc(100svh-64px)]">{children}</div>
        <SiteFooter />
        <CookieBanner />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
