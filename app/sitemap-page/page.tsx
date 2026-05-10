import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Site Map | Bitcoin for the Arts",
  description:
    "Complete directory of all pages on the Bitcoin for the Arts website.",
};

type SitemapSection = {
  heading: string;
  links: { href: string; label: string }[];
};

const sections: SitemapSection[] = [
  {
    heading: "Home",
    links: [{ href: "/", label: "Home" }],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/about/reason-for-formation", label: "Reason for Formation" },
      { href: "/about/governance", label: "Governance" },
      { href: "/about/leadership", label: "Leadership" },
      { href: "/about/leadership/dion-wilson", label: "Dion Wilson" },
      { href: "/about/leadership/avi-burra", label: "Avi Burra" },
      { href: "/about/leadership/cheryl-mcginnis", label: "Cheryl McGinnis" },
      { href: "/about/leadership/ahmed-klink", label: "Ahmed Klink" },
      { href: "/about/leadership/kyle-shirkness", label: "Kyle Shirkness" },
    ],
  },
  {
    heading: "Grants",
    links: [
      { href: "/grants", label: "Grants Overview" },
      { href: "/grants/guidelines", label: "Grant Guidelines" },
      { href: "/grants/faq", label: "Grant FAQ" },
      { href: "/grants/apply", label: "Apply for a Grant" },
    ],
  },
  {
    heading: "Programming",
    links: [{ href: "/programming", label: "Programming" }],
  },
  {
    heading: "Education",
    links: [
      { href: "/education", label: "Education Overview" },
      { href: "/education/open", label: "Open Curriculum" },
      { href: "/education/webinar", label: "Webinar" },
    ],
  },
  {
    heading: "Artists",
    links: [
      { href: "/artists", label: "Artist Hub" },
      { href: "/artists/why-bitcoin", label: "Why Bitcoin?" },
    ],
  },
  {
    heading: "Research",
    links: [
      { href: "/research", label: "Research Portal" },
      {
        href: "/research/state-of-arts-funding-2026",
        label: "The State of Arts Funding 2026",
      },
      { href: "/research/the-arpa-cliff", label: "The ARPA Cliff" },
      {
        href: "/research/sound-money-for-the-arts",
        label: "Sound Money for the Arts",
      },
    ],
  },
  {
    heading: "Stories",
    links: [
      { href: "/stories", label: "Artist Stories" },
      { href: "/stories/kenneth-burris", label: "Kenneth Burris" },
      { href: "/stories/man-like-kweks", label: "Man Like Kweks" },
      { href: "/stories/beth-alta-fletcher", label: "Beth Alta Fletcher" },
      { href: "/stories/hitomi-matsui", label: "Hitomi Matsui" },
      { href: "/stories/aksana-zasinets", label: "Aksana Zasinets (5Ksana)" },
      { href: "/stories/a13mw-zap-animations", label: "A13MW \u2013 Zap Animations" },
      { href: "/stories/matt-finlay", label: "Matt Finlay" },
      { href: "/stories/benjamin-ella", label: "Benjamin Ella" },
      { href: "/stories/share-your-story", label: "Share Your Story" },
    ],
  },
  {
    heading: "Events",
    links: [{ href: "/events", label: "Events" }],
  },
  {
    heading: "Get Involved",
    links: [
      { href: "/get-involved", label: "Get Involved" },
      { href: "/get-involved/volunteer", label: "Volunteer" },
      { href: "/get-involved/feedback", label: "Feedback" },
      {
        href: "/get-involved/diy-fundraising-guide",
        label: "DIY Fundraising Guide",
      },
    ],
  },
  {
    heading: "Donate",
    links: [
      { href: "/donate", label: "Donate" },
      { href: "/donate/monthly", label: "Monthly Giving" },
      { href: "/donate/guides/daf", label: "Donor-Advised Fund" },
      { href: "/donate/guides/ira-qcd", label: "IRA / QCD" },
      { href: "/donate/guides/securities", label: "Securities" },
      { href: "/donate/guides/life-insurance", label: "Life Insurance" },
      { href: "/donate/guides/estate-planning", label: "Estate Planning" },
      { href: "/donate/guides/royalties-ip", label: "Royalties & IP" },
    ],
  },
  {
    heading: "Transparency",
    links: [
      { href: "/transparency", label: "Transparency Dashboard" },
      {
        href: "/transparency/bitcoin-education-initiative-proposal",
        label: "Bitcoin Education Initiative Proposal",
      },
      {
        href: "/transparency/sovereign-artist-residency-proposal",
        label: "Sovereign Artist Residency Proposal",
      },
    ],
  },
  {
    heading: "Legal & Account",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Use" },
      { href: "/contact", label: "Contact" },
      { href: "/billing", label: "Billing Portal" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Site Map
          </h1>
          <p className="mt-3 max-w-2xl text-base text-white/75">
            A complete directory of every page on bitcoinforthearts.org.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold tracking-tight">
                {section.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                    >
                      <span
                        className="h-1 w-1 shrink-0 rounded-full bg-accent/50 transition-colors group-hover:bg-accent"
                        aria-hidden="true"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
