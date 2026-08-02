import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import MidwestVolunteerForm from '../MidwestVolunteerForm';

export const metadata: Metadata = {
  title: 'Volunteer at the Midwest Bitcoin Summit',
  description:
    'Volunteer with Bitcoin For The Arts at the Midwest Bitcoin Summit, September 23 and 24, 2026 in Columbus, Ohio. Booth support, stage and audio, videography and documentation, or wherever needed. Free conference admission, BFTA gear, and meals for volunteers.',
  openGraph: {
    title: 'Volunteer with BFTA at the Midwest Bitcoin Summit',
    description:
      'Sept 23 and 24, 2026 in Columbus. Booth, stage, and videography volunteers wanted. Free admission, gear, and meals.',
    type: 'website',
  },
};

const roles = [
  {
    title: 'Booth Support',
    body:
      'Rotating shifts across the two show days. Greet attendees, staff the merchandise counter, guide people to programming, and help run the Lightning wallet activation station. Best for social, energetic humans who like meeting strangers.',
  },
  {
    title: 'Stage and Audio Support',
    body:
      'Assist during Ainsley Costello\u2019s performance and any additional Secondary Stage acts. Cabling, mic checks, monitors, general stagehand work. Best for anyone with live-sound, event production, or theater experience.',
  },
  {
    title: 'Videography and Documentation',
    body:
      'Capture the performances, the book reading, the film Q\u0026A, attendee reactions, and general b-roll. This footage becomes the professionally produced Midwest recap and future BFTA storytelling. Best for anyone with a camera, a phone with a stabilizer, or documentary instincts.',
  },
  {
    title: 'Wherever Needed',
    body:
      'Load-in on Tuesday, September 22 and load-out on Thursday evening, September 24, are the big ones. Also floor floaters during the show days. Best for people who want in but do not have a specific specialty yet.',
  },
];

const perks = [
  'Free admission to the Midwest Bitcoin Summit for the day or days you volunteer.',
  'BFTA event gear (t-shirt, tote, whatever else we settle on).',
  'Meals provided during your shift.',
  'On-camera credit in the professionally produced Midwest recap.',
  'Written reference letter available on request.',
  'Networking with Bitcoin-native artists, filmmakers, and the BFTA production team.',
];

export default function MidwestVolunteerPage() {
  const heroImage = '/support%20artist.JPG';

  return (
    <main className="bg-background">
      {/* Full-bleed hero using the same background art as /get-involved/volunteer */}
      <section className="relative h-[420px] w-full overflow-hidden sm:h-[520px]">
        <Image
          src={heroImage}
          alt="A working artist supported by Bitcoin For The Arts."
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-4xl px-6 pb-12 sm:pb-16">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              BFTA at the Midwest Bitcoin Summit · Sept 23 and 24, 2026 · Columbus, OH
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
              Volunteer at Bitcoin Arts Park.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Two days, live performances, a film cinema, a book reading, and a peer-to-peer Lightning silent auction. Help us build it. Free pass, gear, meals, and a front-row seat to the Bitcoin arts movement.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Who this is for */}
        <section>
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Who this is for
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A small handful of great humans.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">
            This is a volunteer role. Bitcoin For The Arts is a small nonprofit producing Bitcoin Arts Park with a lean core team, and we are looking for up to five great volunteers to help us hold it all together.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted">
            We are asking for volunteers who are <strong className="text-foreground">already planning to attend the Midwest Bitcoin Summit</strong>, or who <strong className="text-foreground">live in the Columbus area</strong>. If you need a short ride from your Columbus-area home to the venue, we can cover a rideshare or a short train trip within roughly a 15-mile radius of the venue. Beyond that we cannot cover travel or lodging. Everything else, the free pass, the gear, the meals, the credit, and the story, is on us.
          </p>
        </section>

        {/* Roles */}
        <section className="mt-14">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            The Roles
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Where volunteers plug in.
          </h2>

          <ol className="mt-8 space-y-6">
            {roles.map((role, idx) => (
              <li
                key={role.title}
                className="border-l-4 border-accent/70 pl-5"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Role {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                  {role.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{role.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* What volunteers get */}
        <section className="mt-14 rounded-2xl border border-border bg-surface/60 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            What Volunteers Get
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            The BFTA volunteer package.
          </h2>
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-muted">
            {perks.map((perk) => (
              <li key={perk} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Sign up form */}
        <section id="signup" className="mt-14 scroll-mt-24 rounded-2xl border border-accent/30 bg-background p-6 sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            Sign Up
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Volunteer with BFTA.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Tell us a little about you and how you can help. We will follow up as the September event gets closer with role assignments and the run-of-show. Questions? Email{' '}
            <a
              href="mailto:volunteer@bitcoinforthearts.org?subject=Midwest%20volunteer%20question"
              className="font-semibold underline underline-offset-4"
            >
              volunteer@bitcoinforthearts.org
            </a>
            .
          </p>

          <div className="mt-8">
            <MidwestVolunteerForm />
          </div>
        </section>

        {/* Cross-link band */}
        <section className="mt-14 rounded-2xl border border-border bg-background p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wide text-muted">
            Other Ways to Be Part of Midwest
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Sponsor or apply for a grant.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            If you would rather back the event with dollars or in-kind support, our sponsor page walks through nine tiers and a range of in-kind asks. If you are a working artist, our grant application is open year-round.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/midwest"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90"
            >
              Sponsor Midwest →
            </Link>
            <Link
              href="/grants/apply"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-foreground/20 bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
            >
              Apply for a BFTA Grant →
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
