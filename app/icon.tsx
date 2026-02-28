import { ImageResponse } from 'next/og';
import { theme } from '@/config/theme';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        background: theme.dark.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.dark.accent,
        fontFamily: 'monospace',
      }}
    >
      $
    </div>,
    {
      ...size,
    }
  );
}
