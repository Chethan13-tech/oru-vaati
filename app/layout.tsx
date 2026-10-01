import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Oru Vaati — Authentic Tamil Nadu Food & Conscious Craving',
  description: 'Experience genuine Tamil Nadu cuisine from Chennai, Coimbatore, Madurai, Salem & Thanjavur kitchens with mindful craving pauses, transparent calories, and live simulated delivery.',
  keywords: ['Tamil Nadu food delivery', 'authentic South Indian tiffin', 'Madurai bun parotta', 'Dindigul biryani', 'mindful dining', 'Oru Vaati', 'healthy food ordering'],
  authors: [{ name: 'Oru Vaati Culinary Collective' }],
  openGraph: {
    title: 'Oru Vaati — Crave Consciously',
    description: 'Authentic Tamil Nadu culinary heritage delivered fresh, with conscious pauses and honest nutrition.',
    url: 'https://oruvaati.app',
    siteName: 'Oru Vaati',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#17342e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
