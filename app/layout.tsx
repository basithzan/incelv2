import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Incel Travel',
  description: 'Your trusted travel partner',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

import { SmoothScroll } from '../components/SmoothScroll';
import { MouseFollower } from '../components/MouseFollower';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <SmoothScroll>
          {/* <MouseFollower />  - Commenting out for now as it can be buggy with iframes/video. Enabling later if requested specially */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}


