"use client";

import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function LoggedInHeader() {
  const openQrModal = () => {
    const event = new CustomEvent('openQrModal', { detail: {} })

    document.dispatchEvent(event)
  }

  return (
    <header className="inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <button
            onClick={openQrModal}
            type="button"
            className="mr-4 inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5"/> QR Code
          </button>
          <Link href="/api/auth/signout">Sign Out</Link>
        </div>
      </nav>
    </header>
  )
}