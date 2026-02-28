import { ImageResponse } from 'next/og';
import { theme } from '@/config/theme';

export const runtime = 'edge';

export const alt = 'Karan Popat - Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 64,
        background: theme.dark.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.dark.foreground,
        fontFamily: 'monospace',
        padding: '40px',
      }}
    >
      <div style={{ color: theme.dark.accent, marginBottom: '20px' }}>$ popatkaran</div>
      <div style={{ fontSize: 48, textAlign: 'center' }}>Engineering Digital Excellence</div>
      <div style={{ fontSize: 32, color: theme.dark.muted, marginTop: '20px' }}>
        Full-Stack Developer
      </div>
    </div>,
    {
      ...size,
    }
  );
}
