import { Space_Grotesk, Gabarito } from 'next/font/google'
import './globals.css'
import dynamic from 'next/dynamic'
import Script from 'next/script'

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
  title: 'BusyFinch | Manage Tasks and To-Do Lists with your Voice',
  description: 'Typing takes ages. Create and manage your tasks and to-do lists by using your voice. Increase your productivity through speech.',
  openGraph: {
    title: 'BusyFinch | Manage Tasks and To-Do Lists with your Voice',
    description: 'Typing takes ages. Create and manage your tasks and to-do lists by using your voice. Increase your productivity through speech.',
    url: 'https://busyfinch.com',
  }
}

export default function RootLayout({ children }) {
  return (
    <html className="h-full bg-white" lang="en">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TJTSX6H8');
          `}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q784CT4R7T"></Script>
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q784CT4R7T');
          `}
        </Script>
      </head>
      <body className={`h-full ${spaceGrotesk.variable} ${gabarito.variable} font-sans`}>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TJTSX6H8" height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe>
        </noscript>

        <PageWrapper>
          {children}
        </PageWrapper>
      </body>
    </html>
  )
}
