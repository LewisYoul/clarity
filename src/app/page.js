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
      <div className="bg-white h-screen">
        <div className="max-w-6xl m-auto">
          <Header />

          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-3xl py-16">
              <div className="text-center">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                  Keep track of your tasks
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Obtain clarity by adding the things you need to do
                </p>
              </div>
            </div>
            </div>

        </div>
      </div>
    )
  } else {
    redirect("dashboard")
  }
}
