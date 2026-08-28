import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/data/services';
import { getAllCitySlugs } from '@/data/cities';
import { getAllPostSlugs } from '@/data/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://expressclean.uz';
  const serviceSlugs = getAllServiceSlugs();
  const citySlugs = getAllCitySlugs();
  const postSlugs = getAllPostSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ru/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
  ];

  // Generate entries for each service page (both uz and ru locales)
  const servicePages: MetadataRoute.Sitemap = serviceSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/xizmatlar/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ru/xizmatlar/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ]);

  // Generate entries for each city page (both uz and ru locales)
  const cityPages: MetadataRoute.Sitemap = citySlugs.flatMap((city) => [
    {
      url: `${baseUrl}/hududlar/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ru/hududlar/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
  ]);

  // Generate entries for each blog post (both uz and ru locales)
  const blogPostPages: MetadataRoute.Sitemap = postSlugs.flatMap((slug) => [
    {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ru/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...servicePages, ...cityPages, ...blogPostPages];
}
