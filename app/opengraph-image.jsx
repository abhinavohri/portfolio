import { ImageResponse } from 'next/og';
import data from '@/data/data.json';
import { siteUrl } from '@/lib/site';

export const alt = `${data.name} — ${data.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: '#010409',
          backgroundImage:
            'radial-gradient(circle at 18% 18%, rgba(34, 211, 238, 0.16), transparent 34%), radial-gradient(circle at 88% 78%, rgba(16, 185, 129, 0.14), transparent 30%), linear-gradient(rgba(88, 166, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88, 166, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 36px 36px, 36px 36px',
          color: '#c9d1d9',
          fontFamily: 'monospace',
          padding: '48px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-110px',
            right: '-50px',
            width: '360px',
            height: '360px',
            display: 'flex',
            border: '1px solid rgba(34, 211, 238, 0.22)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid #30363d',
            borderRadius: '22px',
            background: 'rgba(13, 17, 23, 0.94)',
            boxShadow: '0 28px 80px rgba(0, 0, 0, 0.45)',
          }}
        >
          <div
            style={{
              height: '68px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 28px',
              borderBottom: '2px solid #21262d',
              color: '#8b949e',
              fontSize: '20px',
            }}
          >
            <div style={{ display: 'flex', gap: '11px' }}>
              <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#ff7b72' }} />
              <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#d29922' }} />
              <span style={{ width: '13px', height: '13px', borderRadius: '50%', background: '#3fb950' }} />
            </div>
            <div style={{ display: 'flex' }}>
              {data.openSource.username}@portfolio : ~/about
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3fb950' }}>
              <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#3fb950' }} />
              online
            </div>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'stretch',
              padding: '50px 54px 48px',
              gap: '48px',
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', color: '#7ee787', fontSize: '28px', marginBottom: '20px' }}>
                $ whoami
              </div>
              <div style={{ display: 'flex', fontSize: '68px', fontWeight: 700, lineHeight: 1.05, color: '#f0f6fc' }}>
                {data.name}
              </div>
              <div style={{ display: 'flex', color: '#58a6ff', fontSize: '34px', marginTop: '14px' }}>
                {data.role}
              </div>
              <div
                style={{
                  display: 'flex',
                  color: '#8b949e',
                  fontSize: '21px',
                  lineHeight: 1.45,
                  marginTop: '28px',
                }}
              >
                {data.tagline}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6e7681', fontSize: '19px', marginTop: '34px' }}>
                <span style={{ color: '#22d3ee' }}>{'//'}</span>
                {siteUrl.hostname.replace(/^www\./, '')}
              </div>
            </div>

            <div
              style={{
                width: '360px',
                height: '390px',
                position: 'relative',
                display: 'flex',
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
                <defs>
                  <linearGradient id="core" x1="112" y1="106" x2="248" y2="254" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#3fb950" />
                  </linearGradient>
                  <linearGradient id="route" x1="34" y1="36" x2="326" y2="324" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#58a6ff" stopOpacity="0.15" />
                    <stop offset="0.5" stopColor="#22d3ee" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#3fb950" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                <circle cx="180" cy="180" r="151" stroke="#1f6feb" strokeOpacity="0.16" strokeDasharray="4 12" />
                <circle cx="180" cy="180" r="119" stroke="#22d3ee" strokeOpacity="0.14" />
                <circle cx="180" cy="180" r="88" stroke="#3fb950" strokeOpacity="0.12" strokeDasharray="3 8" />

                <path d="M180 91V42H276V74" stroke="url(#route)" strokeWidth="2" />
                <path d="M241 119L294 66" stroke="url(#route)" strokeWidth="2" />
                <path d="M269 180H327" stroke="url(#route)" strokeWidth="2" />
                <path d="M241 241L298 298" stroke="url(#route)" strokeWidth="2" />
                <path d="M180 269V320H91V291" stroke="url(#route)" strokeWidth="2" />
                <path d="M119 241L62 298" stroke="url(#route)" strokeWidth="2" />
                <path d="M91 180H33" stroke="url(#route)" strokeWidth="2" />
                <path d="M119 119L63 63" stroke="url(#route)" strokeWidth="2" />

                <path d="M180 91L257 135L257 225L180 269L103 225V135L180 91Z" fill="#0d1821" stroke="url(#core)" strokeWidth="2" />
                <path d="M180 112L239 146V214L180 248L121 214V146L180 112Z" fill="#071017" stroke="#58a6ff" strokeOpacity="0.42" />
                <path d="M180 133L221 157V203L180 227L139 203V157L180 133Z" fill="url(#core)" fillOpacity="0.12" stroke="url(#core)" strokeWidth="2" />

                <path d="M160 171L180 151L200 171" stroke="#7ee787" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M160 190L180 210L200 190" stroke="#22d3ee" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="180" cy="180" r="6" fill="#f0f6fc" />
                <circle cx="180" cy="180" r="13" stroke="#f0f6fc" strokeOpacity="0.32" />

                <g fill="#0d1117" stroke="#22d3ee" strokeWidth="2">
                  <rect x="164" y="26" width="32" height="32" rx="8" />
                  <rect x="288" y="48" width="32" height="32" rx="8" />
                  <rect x="311" y="164" width="32" height="32" rx="8" />
                  <rect x="288" y="280" width="32" height="32" rx="8" />
                  <rect x="164" y="304" width="32" height="32" rx="8" />
                  <rect x="40" y="280" width="32" height="32" rx="8" />
                  <rect x="17" y="164" width="32" height="32" rx="8" />
                  <rect x="40" y="48" width="32" height="32" rx="8" />
                </g>

                <g fill="#7ee787">
                  <circle cx="180" cy="42" r="4" />
                  <circle cx="304" cy="64" r="4" />
                  <circle cx="327" cy="180" r="4" />
                  <circle cx="304" cy="296" r="4" />
                  <circle cx="180" cy="320" r="4" />
                  <circle cx="56" cy="296" r="4" />
                  <circle cx="33" cy="180" r="4" />
                  <circle cx="56" cy="64" r="4" />
                </g>

                <g fill="#22d3ee">
                  <circle cx="180" cy="91" r="4" />
                  <circle cx="241" cy="119" r="4" />
                  <circle cx="269" cy="180" r="4" />
                  <circle cx="241" cy="241" r="4" />
                  <circle cx="180" cy="269" r="4" />
                  <circle cx="119" cy="241" r="4" />
                  <circle cx="91" cy="180" r="4" />
                  <circle cx="119" cy="119" r="4" />
                </g>
              </svg>

              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  left: '18px',
                  display: 'flex',
                  color: '#6e7681',
                  fontSize: '14px',
                  letterSpacing: '0.16em',
                }}
              >
                AGENT NETWORK / 01
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '18px',
                  display: 'flex',
                  gap: '8px',
                  color: '#7ee787',
                  fontSize: '15px',
                }}
              >
                <span style={{ color: '#22d3ee' }}>{'<'}</span>
                plan / tools / memory / verify
                <span style={{ color: '#22d3ee' }}>{'/>'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
