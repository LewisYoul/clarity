import LoggedInHeader from "../components/LoggedInHeader"
import { PrismaClient } from "@prisma/client"
import { PlusIcon, ArrowDownTrayIcon, PencilIcon } from '@heroicons/react/24/outline'
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'

export default async function Dashboard() {
  const session = await getServerSession(options)

  const prisma = new PrismaClient()
  const qrs = await prisma.QRCode.findMany({
    where: {
      teamId: session.team.id
    }
  })

  return (
    <div className="bg-white h-full min-h-screen ">
      <LoggedInHeader />

      <div className="max-w-6xl m-auto">
        {qrs.length === 0 ? (
          <div className="w-full">
            <div className="flex justify-center mt-4">
              <p className="block mx-auto">You don&apos;t have any QR codes yet, click the button below to create one!</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="mr-4 inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5"/> New QR Code
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {qrs.map((qr) => (
              <div key={qr.id} className="border rounded-md bg-slate-50 relative shadow-md">
                <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Static
                </span>
                <div className="flex justify-center">
                  <div className="mt-4">
                    <div className="bg-white h-40 w-40">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"></img>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <p className="text-sm ">{qr.link}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 flex text-sm border-t">
                  <button className="flex-1 justify-center py-4 inline-flex items-center ml-1">
                    <PencilIcon className="mr-1 h-4 w-4" aria-hidden="true" /> Edit
                  </button>
                  <button className="flex-1 justify-center py-4 inline-flex items-center border-r border-l pr-3 pl-3">
                    <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> PNG
                  </button>
                  <button className="flex-1 justify-center py-4 inline-flex items-center mr-1">
                    <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> SVG
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}