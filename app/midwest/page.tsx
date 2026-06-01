import type { Metadata } from 'next';
import Link from 'next/link';
import FullBleedHero from '@/components/FullBleedHero';

export const metadata: Metadata = {
  title: 'BFTA at the Midwest Bitcoin Summit',
  description:
    'Bitcoin for the Arts joins the curatorial team behind Generations, the gallery and live programming inside the Midwest Bitcoin Summit. September 23–24, 2026, Greater Columbus Convention Center, Columbus, Ohio. Sponsor a working artist for $2,500 or support BFTA\u2019s curatorial presence at tier.',
  openGraph: {
    title: 'Where Culture Meets Sound Money — BFTA at the Midwest Bitcoin Summit',
    description:
      'BFTA × Midwest Bitcoin Summit · September 23–24, 2026 · Columbus, OH. Sponsor a working artist for $2,500 or support BFTA\u2019s curatorial presence inside Generations.',
    type: 'website',
  },
};

export default function MidwestPage() {
  const heroImage = '/21-artist.jpg';
  const sponsorEmail = 'info@bitcoinforthearts.org';
  const ein = '41-2642260';

  const pathBTiers = [
    { name: 'Presenting Sponsor', price: '$25,000' },
    { name: 'Curatorial Sponsor', price: '$7,500' },
    { name: 'Programming Sponsor', price: '$5,000' },
    { name: 'Friend of BFTA at Midwest', price: '$1,000' },
  ];

  const generationsZones = [
    {
      name: 'HRF Freedom Tech Lounge',
      description:
        'A lounge anchored by live developer activity, freedom-tech artifacts, and a large mirroring display, presented in partnership with the Human Rights Foundation.',
    },
    {
      name: 'B4C Gallery',
      description:
        'The curated heart of the show — roughly 810 square feet of gallery space hung in museum register, featuring living artists and selected historical works.',
    },
    {
      name: 'BTCTC Play Area',
      description:
        'A tactile, family-friendly zone presented by Bitcoin Trading Cards. Tables for four featured products, hands-on for all ages.',
    },
    {
      name: 'The Community Lounge',
      description:
        'The social heart of the floor, combining the BSN Opportunity Engine and BCH Grassroots — lounge seating, a reading library, and a small project-presentation setup.',
    },
  ];

  const faqs = [
    {
      q: 'What is BFTA\u2019s role at the Midwest Bitcoin Summit?',
      a: 'Bitcoin for the Arts is joining as a curatorial partner — featuring artists, programming live work, and bringing the BFTA mission directly into the conference floor inside Generations, the gallery curated by Kyle Knight.',
    },
    {
      q: 'Can a single sponsor combine Path A and Path B?',
      a: 'Yes. A sponsor can name a specific artist (Path A) and take a curatorial tier (Path B) on the same agreement. The two stack.',
    },
    {
      q: 'Are sponsorships tax-deductible?',
      a: `Yes. Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN ${ein}. Sponsorships are tax-deductible to the full extent allowed by law.`,
    },
    {
      q: 'When are artist and sponsor announcements going public?',
      a: 'Artists and sponsors will be named publicly only after each is confirmed in writing. Subscribers to the BFTA newsletter are first to hear as pieces lock in.',
    },
    {
      q: 'How do I get in touch?',
      a: `Email us at ${sponsorEmail}. Warm introductions are prioritized over cold outreach.`,
    },
  ];

  return (
    <main className="bg-background">
      <FullBleedHero
        imageSrc={heroImage}
        imageAlt="Bitcoin for the Arts at the Midwest Bitcoin Summit · September 23–24, 2026, Columbus, Ohio."
        label="BFTA × Midwest Bitcoin Summit · Sept 23–24 · Columbus, OH"
        title="Where Culture Meets Sound Money."
        description="Bitcoin for the Arts is co-curating Generations, the gallery and live programming inside the Midwest Bitcoin Summit. Two days. Working artists. The audience that already understands sound money — meeting the artists who deserve it."
        titleClassName="text-3xl sm:text-5xl"
        priority
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${sponsorEmail}?subject=Midwest%20Summit%20Sponsorship`}
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
          >
            Sponsor an Artist →
          </a>
          <Link
            href="/connect"
            className="inline-flex items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            Subscribe to Updates →
          </Link>
        </div>
      </FullBleedHero>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {/* ── Why Columbus, Why Now ────────────────────── */}
        <section className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Why Columbus, Why Now
          </div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Bringing the culture in.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Bitcoin conferences have grown into serious institutions. What has been quietly missing alongside them is a curatorial counterpart — a serious cultural room, with serious working artists, treated as central to the programming rather than peripheral to it. <em>Generations</em> is that room, and Columbus is where Bitcoin for the Arts is going to help build it.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Curated by Kyle Knight — a producer with deep roots in the Bitcoin culture world — <em>Generations</em> is a 60×60 installation organized around four named zones, with anchor partnerships from the Human Rights Foundation, Bitcoin Trading Cards, and BSN. BFTA is joining as a curatorial partner: featuring artists, programming live work, and bringing the BFTA mission directly into the conference floor.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            The audience is the reason. The room at the Midwest Summit is a crowd of Bitcoiners who already understand sound money — and who are, by every definition, the future patron base for the next generation of working artists. Bringing real artists into that room, paid in Bitcoin, supported by infrastructure that lets the audience zap them in real time, is exactly the kind of moment our 501(c)(3) was built to create.
          </p>
        </section>

        {/* ── Two Sponsor Paths ────────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            How To Sponsor
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Two clean paths.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            Any Bitcoin company, family office, or individual patron can pick the path that fits.
            Sponsorships are tax-deductible to the full extent allowed by law — Bitcoin for the Arts, Inc. is a 501(c)(3) tax-exempt nonprofit, EIN <strong className="text-foreground">{ein}</strong>.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Path A */}
            <div className="rounded-2xl border-2 border-accent bg-surface/60 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                Path A
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                Sponsor a Specific Artist
              </h3>
              <div className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
                $2,500
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">
                per artist
              </div>
              <p className="mt-6 text-base leading-relaxed text-muted">
                The sponsor&apos;s name and the artist&apos;s name appear together on the program. The artist is paid directly. The sponsor knows exactly which working artist their dollars put on stage in Columbus.
              </p>
              <a
                href={`mailto:${sponsorEmail}?subject=Path%20A%20%E2%80%94%20Sponsor%20a%20Specific%20Artist`}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90"
              >
                Sponsor an Artist →
              </a>
            </div>

            {/* Path B */}
            <div className="rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                Path B
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                Sponsor BFTA&apos;s Curatorial Presence
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                Tiered sponsorship that supports the broader BFTA programming we&apos;re bringing to Columbus — across the artists, the experience, and the curatorial presence inside <em>Generations</em>.
              </p>
              <ul className="mt-6 space-y-3">
                {pathBTiers.map((tier) => (
                  <li
                    key={tier.name}
                    className="flex items-baseline justify-between border-b border-border pb-2 text-sm"
                  >
                    <span className="font-semibold text-foreground">{tier.name}</span>
                    <span className="font-mono tabular-nums text-muted">{tier.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Tailored sponsorships above the Presenting tier are also welcome — please reach out.
              </p>
              <a
                href={`mailto:${sponsorEmail}?subject=Path%20B%20%E2%80%94%20Curatorial%20Sponsorship`}
                className="mt-6 inline-flex items-center justify-center rounded-md bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors hover:opacity-90"
              >
                Discuss a Tier →
              </a>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
            Our Midwest fundraising target is <strong className="text-foreground">$70,000–$80,000</strong> — the level that lets us bring working artists into Columbus and pay them like the working professionals they are.
          </p>
        </section>

        {/* ── The Generations Brief ────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            The Curatorial Frame
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Generations.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted">
            <em>Generations</em> is a curated cultural installation inside the Midwest Bitcoin Summit, organized as four named zones across roughly a 60×60 footprint. It is curated by <strong className="text-foreground">Kyle Knight</strong>, with anchor partnerships from the <strong className="text-foreground">Human Rights Foundation</strong>, <strong className="text-foreground">Bitcoin Trading Cards</strong>, and <strong className="text-foreground">BSN</strong>. Bitcoin for the Arts is joining as a curatorial partner.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {generationsZones.map((zone) => (
              <div
                key={zone.name}
                className="rounded-2xl border border-border bg-surface/60 p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {zone.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{zone.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <section className="mt-16">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            FAQ
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A few quick answers.
          </h2>

          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <div key={faq.q} className="py-6">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {faq.q}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer CTA ──────────────────────────────── */}
        <section className="mt-16 rounded-2xl border border-border bg-surface/60 p-8 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Stay close to this
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Be in the room when the lineup locks.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Subscribers to the BFTA newsletter are the first to hear as artists and sponsors confirm. Get on the list, and follow our long-form research on the arts-funding economy on Substack.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/connect"
              className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Subscribe to Updates →
            </Link>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Donate →
            </Link>
            <Link
              href="/research"
              className="inline-flex items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Read the Research →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
