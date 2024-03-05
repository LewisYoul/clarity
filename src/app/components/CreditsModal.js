"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function Modal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    console.log('cm')

    setShowModal(true)
  }

  const closeModal = (event) => {
    setShowModal(false)
  }

  useEffect(() => {
    document.addEventListener('openCreditsModal', openModal)
  }, [])

  useEffect(() => {
    document.addEventListener('closeCreditsModal', closeModal)
  }, [])

  if (!showModal) {
    return null
  }

  return (
    <div className="fixed h-screen w-full bg-gray-500 bg-opacity-50 z-10 flex justify-center">
      <div className="absolute top-0 right-0 pt-2 pr-2">
        <button
          type="button"
          className="inline-flex items-center justify-center text-white"
          onClick={closeModal}
        >
          <span className="sr-only">Close modal</span>
          <XMarkIcon className="h-10 w-10" aria-hidden="true" />
        </button>
      </div>

      <div className="w-[540px] h-screen md:h-[860px] md:mt-12 rounded-md relative bg-white">
        <h1 className="mt-10 text-center text-xl mb-4 font-semibold">Choose your credit pack</h1>
        <h1 className="mt-4 text-gray-600 text-center text-md">All packs are one time purchases. There are no recurring fees.</h1>
        <div className="pb-2 mt-6">
          <div className="border rounded-md hover:border-black hover:cursor-pointer mx-10 px-8 py-4">
            <h1 className="text-l mb-4">Single</h1>
            <p className="inline-flex items-center"><span className="font-bold text-3xl">$2</span><span className=" ml-4 text-gray-400">1 QR Code</span></p>
          </div>
        </div>
        <div className="pb-2 mt-2">
          <div className="border hover:border-black hover:cursor-pointer rounded-md mx-10 px-8 py-4">
            <h1 className="text-l mb-4">Standard</h1>
            <p className="inline-flex items-center"><span className="font-bold text-3xl">$5</span><span className=" ml-4 text-gray-400">3 QR Codes</span></p>
          </div>
        </div>
        <div className="pb-2 mt-2">
          <div className="border rounded-md hover:border-black hover:cursor-pointer mx-10 px-8 py-4">
            <h1 className="text-l mb-4">Large</h1>
            <p className="inline-flex items-center"><span className="font-bold text-3xl">$8</span><span className=" ml-4 text-gray-400">5 QR Codes</span></p>
          </div>
        </div>
        <div className="pb-2 mt-2">
          <div className="border rounded-md hover:border-black hover:cursor-pointer mx-10 px-8 py-4">
            <h1 className="text-l mb-4">Extra Large</h1>
            <p className="inline-flex items-center"><span className="font-bold text-3xl">$15</span><span className=" ml-4 text-gray-400">10 QR Codes</span></p>
          </div>
        </div>

        <div className="mx-10 py-4 text-md">
          <h1 className="font-bold mb-2">How credits work</h1>
          <ul>
            <li className="inline-flex items-center"><div className="h-3 w-3 bg-green-500 rounded-full"></div><span className="ml-2">Each QR code costs 1 credit to create</span></li>
            <li className="inline-flex items-center"><div className="h-3 w-3 bg-green-500 rounded-full"></div><span className="ml-2">Credits will be added to your account immediately</span></li>
            <li className="inline-flex items-center"><div className="h-3 w-3 bg-green-500 rounded-full"></div><span className="ml-2">Credits will expire a year after purchase</span></li>
          </ul>
        </div>
      </div>
    </div>
  )
}