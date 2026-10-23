import data from '@/data/data.json';
import favicon from '@/data/assets/favicon.png';

export default function manifest() {
  return {
    name: `${data.name} Portfolio`,
    short_name: data.name,
    description: data.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#010409',
    theme_color: '#0d1117',
    icons: [{
      src: favicon.src,
      sizes: 'any',
      type: 'image/png',
    }],
  };
}
