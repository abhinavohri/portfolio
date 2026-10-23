const configuredUrl = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = new URL(
  configuredUrl
    ? `${configuredUrl.includes('://') ? '' : 'https://'}${configuredUrl}`
    : 'http://localhost:3000',
);

export const isPreview = process.env.VERCEL_ENV === 'preview';
