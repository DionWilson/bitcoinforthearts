import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'Privacy policy for bitcoinforthearts.org.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy policy
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This policy describes how bitcoinforthearts.org handles information.
            If you have questions, email{' '}
            <a
              href="mailto:hello@bitcoinforthearts.org"
              className="underline underline-offset-2"
            >
              hello@bitcoinforthearts.org
            </a>
            .
          </p>

          <div className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
            <h2>What we collect</h2>
            <ul>
              <li>
                <strong>Contact submissions</strong>: If you email us or use a form,
                we receive the information you provide (like your name, email, and
                message).
              </li>
              <li>
                <strong>Basic analytics (optional)</strong>: We may use privacy-
                respectful, aggregated analytics to understand site usage. If we do,
                we aim to avoid collecting personally identifying information.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to inquiries and collaborate on grants/programming.</li>
              <li>To operate and improve the website.</li>
              <li>To comply with legal obligations where applicable.</li>
            </ul>

            <h2>Donations</h2>
            <p>
              Bitcoin transactions are public by nature. If you donate using Bitcoin,
              your wallet address and transaction details may be visible on public
              block explorers. We do not control third-party block explorers.
            </p>

            <h2>Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with
              service providers only as needed to operate the site and communications,
              and only under appropriate safeguards.
            </p>

            <h2>Data retention</h2>
            <p>
              We retain messages and related correspondence as long as necessary for
              communication, recordkeeping, and program operations.
            </p>

            <h2>Updates</h2>
            <p>
              We may update this policy from time to time. The version posted here is
              the current one.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

