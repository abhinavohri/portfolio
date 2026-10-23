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
                width: '310px',
                display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
                padding: '28px',
                border: '1px solid #30363d',
                borderRadius: '16px',
                background: '#090d13',
              }}
            >
              <div style={{ display: 'flex', color: '#6e7681', fontSize: '17px', letterSpacing: '0.12em', marginBottom: '22px' }}>
                CURRENT FOCUS
              </div>
              {data.focusAreas.map((area, index) => (
                <div
                  key={area}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '13px',
                    color: index === 0 ? '#7ee787' : '#c9d1d9',
                    fontSize: '22px',
                    marginBottom: index === data.focusAreas.length - 1 ? 0 : '18px',
                  }}
                >
                  <span style={{ color: index === 0 ? '#3fb950' : '#22d3ee' }}>{'>'}</span>
                  {area}
                </div>
              ))}
              <div style={{ display: 'flex', width: '100%', height: '1px', background: '#21262d', margin: '26px 0 20px' }} />
              <div style={{ display: 'flex', color: '#58a6ff', fontSize: '17px' }}>
                building / shipping / learning
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
