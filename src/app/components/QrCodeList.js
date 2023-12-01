"use client";

import { useEffect, useState } from "react";
import QrCode from "./QrCode";
import { PlusIcon  } from '@heroicons/react/24/outline'

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
          <QrCode qr={qr} key={`qr-${qr.id}`} />
        ))}
      </div>
    )
  )
}