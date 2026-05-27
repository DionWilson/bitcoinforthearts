import Link from 'next/link';

export default function NewsletterSignupFooter() {
  return (
    <section
      aria-label="Stay connected"
      className="mb-10 rounded-2xl border border-black/15 bg-background p-5 text-foreground shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <div className="text-xs font-semibold uppercase tracking-wide">
            Stay Connected
          </div>
          <div className="mt-2 text-sm leading-relaxed">
            Get occasional updates on grants, programming, and events.
            Sign up to stay in the loop.
          </div>
        </div>

        <Link
          href="/connect"
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-6 py-2 text-sm font-semibold text-accent-fg transition-colors hover:opacity-90 whitespace-nowrap"
        >
          Sign up for updates
        </Link>
      </div>
    </section>
  );
}
