"use client";

import { useEffect, useState } from "react";
import QrCodeGenerator from "./qr-code-generators/QrCodeGenerator";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  const openQrModal = () => {
    setShowModal(true)
  }

  const closeQrModal = (event) => {
    setShowModal(false)
  }

  useEffect(() => {
    document.addEventListener('openQrModal', openQrModal)
  }, [])

  useEffect(() => {
    document.addEventListener('closeQrModal', closeQrModal)
  }, [])

  if (!showModal) {
    return null
  }

  return (
    <div className="fixed h-screen w-full bg-gray-300 bg-opacity-75 z-10 flex justify-center">
      <div className="w-[600px] h-96 bg-white bg-opacity-100 mt-12 rounded-md relative">
        <div className="absolute -top-3 -right-3 bg-white rounded-full">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700"
            onClick={() => setShowModal(false)}
          >
            <span className="sr-only">Close modal</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <QrCodeGenerator />
      </div>
    </div>
  )
}