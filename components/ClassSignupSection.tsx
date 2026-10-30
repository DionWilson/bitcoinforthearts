import Link from 'next/link';
import EducationWorkshopInterestForm from '@/components/EducationWorkshopInterestForm';
import { FALL_2026_CLASSES, type ClassSignupSource } from '@/lib/education-classes';

export default function ClassSignupSection({
  source,
  id = 'class-signup',
  layout = 'band',
}: {
  source: ClassSignupSource;
  id?: string;
  layout?: 'band' | 'card';
}) {
  const content = (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-accent">
          Fall 2026 classes &bull; About one hour each
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          Four classes on sound money.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          What money is, why purchasing power keeps shrinking, and how sound money and new payment
          rails bridge the arts from the traditional system to the digital age. Built for working
          artists and open to anyone. You do not have to be an artist to take a seat.
        </p>

        <ol className="mt-6 divide-y divide-border border-y border-border">
          {FALL_2026_CLASSES.map((c) => (
            <li key={c.number} className="flex gap-4 py-3">
              <span className="text-lg font-semibold text-accent">{c.number}</span>
              <span>
                <span className="block text-sm font-semibold">{c.title}</span>
                <span className="block text-xs text-muted">{c.date} · {c.time}</span>
              </span>
            </li>
          ))}
        </ol>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Live online webinars, every class on a Monday at 7:00 PM Eastern, with time for questions. One session also meets in person in New
          York; the address goes to everyone registered as soon as the room is set.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold">
          <Link href="/education/webinar" className="underline underline-offset-4">
            Preview the lessons
          </Link>
          <a href="/proposals/bfta-2027-education-proposal.html" className="underline underline-offset-4">
            2027 education proposal
          </a>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <div className="text-sm font-semibold tracking-tight">Reserve your seat</div>
          <p className="mt-1 text-xs text-muted">Free. We’ll email the webinar link before each class.</p>
          <div className="mt-5">
            <EducationWorkshopInterestForm source={source} />
          </div>
        </div>
      </div>
    </div>
  );

  if (layout === 'card') {
    return (
      <section
        id={id}
        className="scroll-mt-28 rounded-3xl border border-border bg-surface/90 p-6 shadow-sm sm:p-8"
      >
        {content}
      </section>
    );
  }

  return (
    <section id={id} className="scroll-mt-28 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-14">{content}</div>
    </section>
  );
}
