import { options } from "./api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import Header from "./components/Header"
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic'
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

          <div className="w-full py-16 flex items-center justify-between px-6 pt-14 lg:px-8">
            <div className="text-left flex-2">
              <h1 className="text-5xl font-bold text-gray-300">
                <span className="text-gray-300">Manage Tasks</span>
                <span className="text-palqrblue"> with Your Voice <img src="/speaker.svg" alt="BusyFinch Logo" className="h-8 w-8 inline-block" /></span>
              </h1>
              <p className="mt-6 text-md leading-8 text-gray-400">
                Typing takes ages. Save time by cutting out the middleman and streamline your task management.
              </p>
            </div>
            <img src="/voice-hero.svg" alt="BusyFinch Logo" className="flex-1h-72 w-72" />
          </div>


        </div>
      </div>
    )
  } else {
    redirect("dashboard")
  }
}
