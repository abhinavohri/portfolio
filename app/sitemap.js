import data from '@/data/data.json';
import avatar from '@/data/assets/avatar.png';
import { siteUrl } from '@/lib/site';

export default function sitemap() {
  const organizations = [...new Set(data.openSource.repos.map((repo) => repo.split('/')[0].toLowerCase()))];

  return [
    {
      url: siteUrl.origin,
      images: [new URL(avatar.src, siteUrl).toString()],
    },
    ...organizations.map((organization) => ({
      url: `${siteUrl.origin}/opensource/${organization}`,
    })),
  ];
}
