import { Inter } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'

const PageWrapper = dynamic(() => import('./components/PageWrapper'), {
  ssr: false
})

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BusyFinch',
  description: 'BusyFinch',
}

export default function RootLayout({ children }) {
  console.log('IS IT ME YOURE LOOKING FOR')
  return (
    <html className="h-full bg-white" lang="en">
      <body className={`h-full ${inter.className}`}>
        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  )
}
