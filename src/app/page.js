import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import Header from "./components/Header"
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic'
import Link from 'next/link'

const LoggedOutQrCodeGenerator = dynamic(() => import('./components/qr-code-generators/LoggedOutQrCodeGenerator'), {
  ssr: false
})

export default async function Home() {
  const session = await getServerSession(options)

  if (session === null) {
    return (
      <div className="bg-gray-900 h-screen">
        <div className="max-w-5xl m-auto">
          <Header />

          <div className="w-full py-16 flex items-center justify-between px-6 pt-8 lg:pt-14 lg:px-8 lg:flex-row flex-col">
            <div className="text-left flex-2">
              {/* desktop */}
              <div className="hidden lg:block">
                <h1 className="text-5xl font-bold text-gray-300">
                  <span className="text-gray-300 font-gabarito">Manage Tasks with</span><br />
                  <span className="text-palqrblue font-gabarito flex items-center"> Just Your Voice <img src="/speaker.svg" alt="BusyFinch Logo" className="h-8 w-8 ml-2" /></span>
                </h1>
                <p className="mt-5 text-md mb-6 leading-8 text-gray-300">
                  Typing takes ages. Save time by cutting out the middleman and streamline your task management.
                </p>
              </div>

              {/* mobile */}
              <div className="lg:hidden">
                <h1 className="text-5xl font-bold text-gray-300">
                  <span className="text-gray-300 font-gabarito">Manage Tasks with</span>
                  <span className="text-palqrblue font-gabarito items-center"> Just Your Voice <img src="/speaker.svg" alt="BusyFinch Logo" className="h-8 w-8 inline mb-1" /></span>
                </h1>
                <p className="mt-5 text-md mb-6 leading-8 text-gray-300">
                  Typing takes ages. Save time by cutting out the middleman and streamline your task management.
                </p>
              </div>

              <Link href="/sign-up" className="mt-6 bg-palqrblue text-white px-4 py-2 rounded-md">Get Started</Link>
            </div>
            <img src="/voice-hero.svg" alt="BusyFinch Logo" className="flex-1 h-72 w-72 mt-12 lg:mt-0" />
          </div>


        </div>
      </div>
    )
  } else {
    redirect("dashboard")
  }
}
