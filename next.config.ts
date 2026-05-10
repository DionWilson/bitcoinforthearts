import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure PDFKit's built-in font metrics are bundled for serverless.
  // Without this, /api/admin/applications/[id]/pdf can 500 on Vercel with:
  // ENOENT ... node_modules/pdfkit/js/data/Helvetica.afm
  outputFileTracingIncludes: {
    '/api/admin/applications/[id]/pdf': ['./node_modules/pdfkit/js/data/*'],
  },

  // Brand-kit reorganization (April 2026) moved every BFTA logo / lockup
  // / social icon into public/brand-kit/. The old root-level URLs were
  // copy-pasted into email signatures, social bios, partner sites, and
  // Slack messages, so we 308-permanent-redirect each one to its new
  // home. Search engines will learn the new URLs; humans never see a 404.
  async redirects() {
    return [
      // Research portal migration
      { source: '/artists/research', destination: '/research', permanent: true },

      // Social platform glyphs used in email signatures
      { source: '/X.png',        destination: '/brand-kit/social-icons/x.png',         permanent: true },
      { source: '/IG.png',       destination: '/brand-kit/social-icons/instagram.png', permanent: true },
      { source: '/FB.png',       destination: '/brand-kit/social-icons/facebook.png',  permanent: true },
      { source: '/TT.png',       destination: '/brand-kit/social-icons/tiktok.png',    permanent: true },
      { source: '/black-in.png', destination: '/brand-kit/social-icons/linkedin.png',  permanent: true },
      { source: '/nostr.PNG',                       destination: '/brand-kit/social-icons/nostr.png',                permanent: true },
      { source: '/nostr.png',                       destination: '/brand-kit/social-icons/nostr.png',                permanent: true },
      { source: '/nostr_logo_wht_blk_rnd.png',      destination: '/brand-kit/social-icons/nostr-white-on-black.png', permanent: true },
      { source: '/nostr_logo_blk_wht_rnd_lg.png',   destination: '/brand-kit/social-icons/nostr-black-on-white.png', permanent: true },
      { source: '/nostr_logo_prpl_wht_rnd_lg.png',  destination: '/brand-kit/social-icons/nostr-purple-on-white.png',permanent: true },

      // Main lockups (the most likely-to-be-shared brand asset)
      { source: '/BFTA-main-lockup-cream-orange-2.png', destination: '/brand-kit/main-lockups/main-cream-orange.png',     permanent: true },
      { source: '/BFTA-main-lockup-cream-orange-1.png', destination: '/brand-kit/main-lockups/main-cream-orange-alt.png', permanent: true },
      { source: '/BFTA-main-lockup-cream-black.png',    destination: '/brand-kit/main-lockups/main-cream-black.png',      permanent: true },
      { source: '/BFTA-main-lockup-black-cream.png',    destination: '/brand-kit/main-lockups/main-black-cream.png',      permanent: true },
      { source: '/BFTA-main-lockup-black-orange.png',   destination: '/brand-kit/main-lockups/main-black-orange.png',     permanent: true },
      { source: '/BFTA-main-lockup-black-orange-1.png', destination: '/brand-kit/main-lockups/main-black-orange.png',     permanent: true },
      { source: '/BFTA-main-lockup-black-orange-2.png', destination: '/brand-kit/main-lockups/main-black-orange-alt.png', permanent: true },
      { source: '/BFTA-main-lockup-orange.png',         destination: '/brand-kit/main-lockups/main-orange.png',           permanent: true },
      { source: '/BFTA-main-lockup-green.png',          destination: '/brand-kit/main-lockups/main-green.png',            permanent: true },
      { source: '/BFTA-main-lockup-green-1.png',        destination: '/brand-kit/main-lockups/main-green.png',            permanent: true },
      { source: '/BFTA-main-lockup-green-2.png',        destination: '/brand-kit/main-lockups/main-green-alt.png',        permanent: true },
      { source: '/BFTA-main-lockup-transparent-light.png', destination: '/brand-kit/derived/main-transparent-light.png',  permanent: true },
      { source: '/BFTA-main-lockup-transparent-dark.png',  destination: '/brand-kit/derived/main-transparent-dark.png',   permanent: true },

      // Square BFTA bugs (favicon source, used in nav/footer/popup/etc.)
      { source: '/BFTA-bug-square-cream-orange-1.png', destination: '/brand-kit/square-bugs/square-cream-orange.png',      permanent: true },
      { source: '/BFTA-bug-square-cream-orange-2.png', destination: '/brand-kit/square-bugs/square-cream-orange-alt.png',  permanent: true },
      { source: '/BFTA-bug-square-cream-black.png',    destination: '/brand-kit/square-bugs/square-cream-black.png',       permanent: true },
      { source: '/BFTA-bug-square-black-cream.png',    destination: '/brand-kit/square-bugs/square-black-cream.png',       permanent: true },
      { source: '/BFTA-bug-square-black-orange.png',   destination: '/brand-kit/square-bugs/square-black-orange.png',      permanent: true },
      { source: '/BFTA-bug-square-black-orange-1.png', destination: '/brand-kit/square-bugs/square-black-orange.png',      permanent: true },
      { source: '/BFTA-bug-square-black-orange-2.png', destination: '/brand-kit/square-bugs/square-black-orange-alt.png',  permanent: true },
      { source: '/BFTA-bug-square-orange.png',         destination: '/brand-kit/square-bugs/square-orange.png',            permanent: true },
      { source: '/BFTA-bug-square-green-1.png',        destination: '/brand-kit/square-bugs/square-green.png',             permanent: true },
      { source: '/BFTA-bug-square-green-2.png',        destination: '/brand-kit/square-bugs/square-green-alt.png',         permanent: true },

      // Inline BFTA bugs
      { source: '/BFTA-bug-inline-cream-orange-1.png', destination: '/brand-kit/inline-bugs/inline-cream-orange.png',      permanent: true },
      { source: '/BFTA-bug-inline-cream-orange-2.png', destination: '/brand-kit/inline-bugs/inline-cream-orange-alt.png',  permanent: true },
      { source: '/BFTA-bug-inline-cream-white.png',    destination: '/brand-kit/inline-bugs/inline-cream-white.png',       permanent: true },
      { source: '/BFTA-bug-inline-black-cream.png',    destination: '/brand-kit/inline-bugs/inline-black-cream.png',       permanent: true },
      { source: '/BFTA-bug-inline-black-orange.png',   destination: '/brand-kit/inline-bugs/inline-black-orange.png',      permanent: true },
      { source: '/BFTA-bug-inline-black-orange-1.png', destination: '/brand-kit/inline-bugs/inline-black-orange.png',      permanent: true },
      { source: '/BFTA-bug-inline-black-orange-2.png', destination: '/brand-kit/inline-bugs/inline-black-orange-alt.png',  permanent: true },
      { source: '/BFTA-bug-inline-orange.png',         destination: '/brand-kit/inline-bugs/inline-orange.png',            permanent: true },
      { source: '/BFTA-bug-inline-green-1.png',        destination: '/brand-kit/inline-bugs/inline-green.png',             permanent: true },
      { source: '/BFTA-bug-inline-green-2.png',        destination: '/brand-kit/inline-bugs/inline-green-alt.png',         permanent: true },

      // Brand Guidelines PDF
      { source: '/BFTA%20Brand%20Guidelines.pdf', destination: '/brand-kit/guidelines/BFTA-Brand-Guidelines.pdf', permanent: true },
      { source: '/BFTA Brand Guidelines.pdf',     destination: '/brand-kit/guidelines/BFTA-Brand-Guidelines.pdf', permanent: true },

      // Stale gold logos (deleted in this reorg). Anyone with a stale link
      // gets the modern cream-orange main lockup instead of a 404.
      { source: '/resources/logos/bitcoin-for-the-arts-logo-gold.png',  destination: '/brand-kit/main-lockups/main-cream-orange.png', permanent: true },
      { source: '/resources/logos/bitcoin-for-the-arts-logo-white.png', destination: '/brand-kit/main-lockups/main-black-cream.png',  permanent: true },
      { source: '/resources/logos/bitcoin-for-the-arts-logo.svg',       destination: '/brand-kit/main-lockups/main-cream-orange.png', permanent: true },
      { source: '/resources/logos/exports/:file*',                       destination: '/brand-kit/main-lockups/main-cream-orange.png', permanent: true },
    ];
  },
};

export default nextConfig;
