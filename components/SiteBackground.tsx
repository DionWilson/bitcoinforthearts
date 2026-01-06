export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Mobile gets a little more color pop */}
      <div className="absolute inset-x-0 -top-32 h-[520px] sm:hidden bg-[linear-gradient(135deg,rgba(126,87,194,0.28),rgba(247,147,26,0.22),transparent)]" />
      {/* Mobile “sunset” wash (enabled via body.mobile-vibrant) */}
      <div className="mobile-vibrant-sunset absolute inset-x-0 -top-40 h-[640px] bg-[linear-gradient(180deg,rgba(255,255,255,0.0),rgba(247,147,26,0.16),rgba(126,87,194,0.22))]" />

      {/* Abstract “wave” gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(247,147,26,0.30),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(126,87,194,0.30),transparent_45%),radial-gradient(circle_at_40%_85%,rgba(38,166,154,0.18),transparent_55%)] sm:bg-[radial-gradient(circle_at_20%_20%,rgba(247,147,26,0.22),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(126,87,194,0.22),transparent_45%),radial-gradient(circle_at_40%_85%,rgba(38,166,154,0.14),transparent_55%)]" />

      {/* Soft wash for readability (stronger on desktop) */}
      <div className="absolute inset-0 bg-background/40 sm:bg-background/55" />
    </div>
  );
}

