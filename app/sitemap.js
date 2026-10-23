import data from '@/data/data.json';
import { siteUrl } from '@/lib/site';

export default function sitemap() {
  const organizations = [...new Set(data.openSource.repos.map((repo) => repo.split('/')[0].toLowerCase()))];

  return [
    {
      url: siteUrl.origin,
      images: [`${siteUrl.origin}/pixel-avatar.png`],
    },
    ...organizations.map((organization) => ({
      url: `${siteUrl.origin}/opensource/${organization}`,
    })),
  ];
}
