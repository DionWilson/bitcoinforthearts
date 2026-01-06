import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-xl">
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          404
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The page you’re looking for doesn’t exist (or moved). Use the navigation
          above, or head back home.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90 border border-accent/60"
          >
            Go to homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:bg-surface"
          >
            Contact
          </Link>
        </div>
      </div>
      </div>
    </main>
  );
}

