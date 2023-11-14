import LoggedInHeader from "../components/LoggedInHeader"
import Card from "../components/Card"
import { ArrowDownTrayIcon, PencilIcon } from '@heroicons/react/24/outline'

export default async function Dashboard() {
  const qrs = [1,2,3,4,5,6,7,8,9,10]

  return (
    <div className="bg-white h-full min-h-screen ">
      <LoggedInHeader />

      <div className="max-w-6xl m-auto">
        <div className="grid grid-cols-4 gap-6">
          {qrs.map((n) => {
            return (
              <div key={n} className="border rounded-md bg-slate-50 relative shadow-md">
                <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  Static
                </span>
                <div className="flex justify-center">
                  <div className="mt-4">
                    <div className="bg-white h-40 w-40">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"></img>
                    </div>
                    <div className="mt-3 flex justify-center">
                      <p className="text-sm ">https://google.com/{n}</p>
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
            )
          })}
        </div>
      </div>
    </div>
  )
}