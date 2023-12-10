"use client";

import Card from "../Card";
import { useState } from "react";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import QrCodeForm from "./QrCodeForm";

export default function QrCodeGenerator() {
  const [qrCode, setQrCode] = useState()
  const downloadQrCode = (extension) => {
    qrCode.download({
      extension: extension
    })
  }

  return(
    <Card>
      <QrCodeForm onChange={setQrCode}/>

      <div className="flex justify-center w-full mt-6 mb-4">
        <button
          onClick={() => { downloadQrCode('png') }}
          type="button"
          className="mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> PNG
        </button>
        <button
          onClick={() => { downloadQrCode('svg') }}
          type="button"
          className="ml-1 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> SVG
        </button>
      </div>
    </Card>

  )
}