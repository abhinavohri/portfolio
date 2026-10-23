import { ImageResponse } from 'next/og';
import data from '@/data/data.json';

export const alt = `${data.name} — ${data.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#010409',
          color: '#c9d1d9',
          fontFamily: 'monospace',
          padding: '64px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '3px solid #30363d',
            borderRadius: '20px',
            padding: '72px',
            background: '#0d1117',
          }}
        >
          <div style={{ display: 'flex', color: '#7ee787', fontSize: 34, marginBottom: 28 }}>
            $ whoami
          </div>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
            {data.name}
          </div>
          <div style={{ display: 'flex', color: '#58a6ff', fontSize: 38, marginTop: 18 }}>
            {data.role}
          </div>
          <div style={{ display: 'flex', color: '#8b949e', fontSize: 25, marginTop: 34 }}>
            {data.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
