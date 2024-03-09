"use client";

import { useEffect, useState, useRef } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline'
import CreditPack from "./CreditPack";

const packs = [
  {
    type: 'single',
    numberOfQrCodes: 1,
    price: 2
  },
  {
    type: 'basic',
    numberOfQrCodes: 3,
    price: 5
  },
  {
    type: 'medium',
    numberOfQrCodes: 5,
    price: 8
  },
  {
    type: 'large',
    numberOfQrCodes: 10,
    price: 15
  },
]

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef()

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = (event) => {
    setShowModal(false)
  }

  const handleOutsideClick = (event) => {
    if (modalRef.current.contains(event.target)) { return }

    closeModal()
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
    <div onClick={handleOutsideClick} className="fixed h-screen w-full bg-gray-500 bg-opacity-50 z-10 flex justify-center">
      <div ref={modalRef} className="w-[540px] h-screen md:h-[860px] md:mt-12 pb-12 rounded-md relative bg-white overflow-scroll">
        <div className="absolute top-0 right-0 pt-3 pr-3">
          <button
            type="button"
            className="inline-flex items-center justify-center text-gray-800 hover:text-gray-500"
            onClick={closeModal}
          >
            <span className="sr-only">Close modal</span>
            <XMarkIcon className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>

        <h1 className="mt-10 text-center text-xl mb-4 font-semibold">Choose your credit pack</h1>
        <h1 className="mt-4 mb-6 text-gray-600 text-center text-md">All packs are one time purchases. There are no recurring fees.</h1>
        {
          packs.map((pack) => {
            return <CreditPack key={`pack-${pack.type}`} packType={pack.type} numberOfQrCodes={pack.numberOfQrCodes} price={pack.price} />
          })
        }

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