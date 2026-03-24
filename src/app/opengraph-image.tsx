import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'STORY & Co. | ストーリーアンドカンパニー'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFDF7',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: '#18bed7',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#2d2a24',
              letterSpacing: '-0.02em',
              display: 'flex',
            }}
          >
            STORY & Co.
          </div>
          <div
            style={{
              fontSize: '24px',
              fontWeight: 500,
              color: '#666',
              letterSpacing: '0.08em',
              display: 'flex',
            }}
          >
            体験をデザインすることで、人生に出会いと変化を
          </div>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontSize: '18px',
            color: '#999',
            display: 'flex',
          }}
        >
          storyandco.co
        </div>
      </div>
    ),
    { ...size }
  )
}
