"use client";

import QRCodeStyling from "qr-code-styling";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import { ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export default function QrCodeGenerator() {
  const router = useRouter()
  const ref = useRef(null);
  const [qrCodeOptions, setQrCodeOptions] = useState({
    width: 200,
    height: 200,
    margin: 10,
    data: "https://example.com",
    backgroundOptions: {
      color: 'white',
    },
    dotsOptions: {
      type: 'rounded'
    }
  });

  const [qrCode] = useState(new QRCodeStyling(qrCodeOptions));

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    qrCode.update(qrCodeOptions);
  }, [qrCode, qrCodeOptions])

  const generateQrCode = (e) => {
    let data = e.target.value

    if (e.target.value === '') { data = 'https://example.com' }

    let margin = 10

    if (data.length <= 11) {
      margin = 8
    }

    setQrCodeOptions({
      width: 200,
      height: 200,
      data: data,
      margin: margin,
      backgroundOptions: {
        color: 'white',
      }
    })
  }

  const downloadQrCode = (extension) => {
    qrCode.download({
      extension: extension
    })
  }

  return(
    <Card>
      <label htmlFor="link" className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
        <LinkIcon className="h-3 w-3 mr-1" aria-hidden="true" /> Link
      </label>
      <div className="mt-2">
        <input
          onChange={generateQrCode}
          type="text"
          name="link"
          id="link"
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
        />
      </div>

      <div className="flex justify-center w-full mt-6">
        <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
      </div>

      <div className="flex justify-center w-full mt-6 mb-4">
        <button
          onClick={() => { downloadQrCode('png') }}
          type="button"
          className="mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> PNG
        </button>
        <button
          onClick={() => { downloadQrCode('svg') }}
          type="button"
          className="ml-1 inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> SVG
        </button>
      </div>
    </Card>

  )
}