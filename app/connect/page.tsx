import type { Metadata } from "next";
import ConnectForm from "./ConnectForm";

export const metadata: Metadata = {
  title: "Newsletter Signup | Bitcoin for the Arts",
  description:
    "Subscribe to the Bitcoin for the Arts newsletter for updates on grants, programming, events, and artist stories.",
};

export default function ConnectPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[#7e57c2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <div className="mx-auto inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/90">
            Bitcoin for the Arts &nbsp;·&nbsp; Newsletter
          </div>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Subscribe to the Newsletter
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80 font-[var(--font-display)] italic">
            Get updates on grants, events, artist stories, and programming.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-xl px-6 py-12 sm:py-16">
        <ConnectForm />
      </section>
    </main>
  );
}
