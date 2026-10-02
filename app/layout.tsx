import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'WOWDamn  Holographic Commerce OS',
    description: 'The most powerful commerce operating system ever built.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          >html lang="en">
            >body>{children}>/body>
      >/html>
    )
}
