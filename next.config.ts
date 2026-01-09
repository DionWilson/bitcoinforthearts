import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure PDFKit's built-in font metrics are bundled for serverless.
  // Without this, /api/admin/applications/[id]/pdf can 500 on Vercel with:
  // ENOENT ... node_modules/pdfkit/js/data/Helvetica.afm
  outputFileTracingIncludes: {
    '/api/admin/applications/[id]/pdf': ['./node_modules/pdfkit/js/data/*'],
  },
};

export default nextConfig;
