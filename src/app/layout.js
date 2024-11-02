import { Space_Grotesk, Gabarito } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'

const PageWrapper = dynamic(() => import('./components/PageWrapper'), {
  ssr: false
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})
const gabarito = Gabarito({ 
  subsets: ['latin'],
  variable: '--font-gabarito'
})

export const metadata = {
  title: 'BusyFinch',
  description: 'Create and manage your tasks and todo lists by using only your voice. No typing, no clicking, just talking.',
}

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-white" lang="en">
      <body className={`h-full ${spaceGrotesk.variable} ${gabarito.variable} font-sans`}>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  )
}
