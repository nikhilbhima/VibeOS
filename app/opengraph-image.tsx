import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'VibeOS - The Ultimate Vibe-Coding System'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#f5f0e8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 60,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Decorative circles in background */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(201, 165, 116, 0.15)',
            top: -100,
            right: 100,
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(201, 165, 116, 0.1)',
            bottom: -50,
            right: 300,
            display: 'flex',
          }}
        />

        {/* Logo Icon */}
        <div
          style={{
            width: 160,
            height: 160,
            backgroundColor: '#0c0b0a',
            borderRadius: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 8,
            }}
          >
            <div style={{ display: 'flex', fontSize: 50, color: '#c9a574', opacity: 0.35, marginBottom: -30, fontWeight: 700 }}>
              V
            </div>
            <div style={{ display: 'flex', fontSize: 50, color: '#c9a574', opacity: 0.65, marginBottom: -30, fontWeight: 700 }}>
              V
            </div>
            <div style={{ display: 'flex', fontSize: 50, color: '#c9a574', fontWeight: 700 }}>
              V
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#c9a574',
              display: 'flex',
            }}
          >
            VibeOS
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#666',
              fontWeight: 500,
              display: 'flex',
            }}
          >
            The Ultimate Vibe-Coding System
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#999',
              fontWeight: 400,
              display: 'flex',
              marginTop: 4,
            }}
          >
            Plan better • Build faster • Ship smarter
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
