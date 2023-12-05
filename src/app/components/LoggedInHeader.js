"use client";

import { PlusIcon, Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

export default function LoggedInHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const openQrModal = () => {
    const event = new CustomEvent('openQrModal', { detail: {} })

    document.dispatchEvent(event)
  }

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="inset-x-0 top-0">
      <nav className="flex items-center justify-between p-6 lg:px-3 relative" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/dashboard" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="/logo.svg"
              alt=""
            />
          </a>
        </div>
        <div className="flex flex-1 justify-end items-center">
          <button
            onClick={openQrModal}
            type="button"
            className="mr-4 inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
          >
            <PlusIcon className="h-5 w-5"/> <span className="hidden lg:block">QR Code</span>
          </button>
          <button
            onClick={openMenu}
            type="button"
            className="lg:hidden"
          >
            <Bars3Icon className="h-7 w-7"/>
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="hidden lg:block"
          >
            <UserCircleIcon className="h-7 w-7"/>
          </button>
          {isMenuOpen && (
            <div className="lg:hidden fixed h-screen w-screen bg-white inset-x-0 top-0 z-50">
              <div className="h-full w-full relative divide-y divide-gray-500/10">
                <nav className="flex items-center justify-between p-6">
                  <Link href="/dashboard" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt=""
                    />
                  </Link>
                  <button
                    className=""
                    onClick={closeMenu}
                    type="button"
                  >
                    <XMarkIcon className="h-7 w-7"/>
                  </button>
                </nav>

                <div className="flow-root">
                  <div className="divide-y divide-gray-500/10">
                    <div className="p-6">
                      <Link
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Settings
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        Sign Out
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isMenuOpen && (
            <div className="invisible lg:visible absolute w-[200px] bg-white top-16 right-0 z-50 rounded-md border">
              <div className="h-full w-full relative divide-y divide-gray-500/10">
                <div className="flow-root">
                  <div>
                    <Link
                      href="#"
                      className="block rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/api/auth/signout"
                      className="block rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Sign Out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}