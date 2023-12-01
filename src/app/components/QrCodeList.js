"use client";

import { useEffect, useState } from "react";
import { ArrowDownTrayIcon, PencilIcon, PlusIcon  } from '@heroicons/react/24/outline'

export default function QrCodeList() {
  const [qrs, setQrs] = useState(null);
  
  const fetchQrCodes = async () => {
    const res = await fetch('/api/qrCodes')
    const json = await res.json()

    setQrs(json.data)
  }

  useEffect(() => {
    
    fetchQrCodes()
  }, [setQrs])

  useEffect(() => {
    document.addEventListener('triggerQrCodeFetch', fetchQrCodes)
  }, [])

  if (qrs === null) return (
    <div>Loading...</div>
  )

  return(
    qrs.length === 0 ? (
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
                  <img src={qr.svgFile.url}></img>
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
    )
  )
}