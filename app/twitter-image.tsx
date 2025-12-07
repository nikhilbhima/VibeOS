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
          background: 'linear-gradient(135deg, #0c0b0a 0%, #1a1918 50%, #0c0b0a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(201, 165, 116, 0.08) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        {/* Logo - Stacked Chevrons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <svg
            width="160"
            height="160"
            viewBox="0 0 512 512"
            fill="none"
          >
            <rect width="512" height="512" rx="112" fill="#0c0b0a" />
            <path
              d="M 128 160 L 256 304 L 384 160"
              stroke="url(#goldGrad)"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M 144 208 L 256 336 L 368 208"
              stroke="url(#goldGrad)"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M 160 256 L 256 368 L 352 256"
              stroke="#c9a574"
              strokeWidth="40"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8d5b7" />
                <stop offset="50%" stopColor="#c9a574" />
                <stop offset="100%" stopColor="#8b7355" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Brand Name */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              background: 'linear-gradient(135deg, #e8d5b7 0%, #c9a574 50%, #8b7355 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            VibeOS
          </div>

          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 500,
              letterSpacing: '0.05em',
              display: 'flex',
            }}
          >
            The Ultimate Vibe-Coding System
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            fontSize: 22,
            color: 'rgba(201, 165, 116, 0.8)',
            fontWeight: 500,
            display: 'flex',
          }}
        >
          Plan better. Build faster. Ship smarter.
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
