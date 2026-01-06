import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bitcoinforthearts.org';
  const now = new Date();

  const routes = [
    '/',
    '/about',
    '/about/leadership',
    '/about/leadership/dion-wilson',
    '/get-involved',
    '/get-involved/diy-fundraising-guide',
    '/grants',
    '/grants/faq',
    '/programming',
    '/artists',
    '/artists/research',
    '/events',
    '/stories',
    '/donate',
    '/donate/guides/life-insurance',
    '/donate/guides/securities',
    '/donate/guides/ira-qcd',
    '/donate/guides/daf',
    '/donate/guides/estate-planning',
    '/donate/guides/royalties-ip',
    '/contact',
    '/privacy-policy',
  ];

  return routes.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: url === '/' ? 1 : 0.7,
  }));
}

