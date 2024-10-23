"use client";

import { signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import ListMenu from './ListMenu'


export default function LoggedInHeader({ initialTeam }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)
  const menuRef = useRef()
  const teamMenuRef = useRef()


  const handleOutsideClick = useCallback((event) => {
    if (menuRef?.current?.contains(event.target)) { return }
    if (teamMenuRef?.current?.contains(event.target)) { return }
    if (isMenuOpen) { closeMenu() }
    if (isTeamMenuOpen) { closeTeamMenu() }
  }, [isMenuOpen, isTeamMenuOpen])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeTeamMenu = () => {
    setIsTeamMenuOpen(false)
  }

  const menuclass = isMenuOpen ? 'lg:visible' : ''

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
          <ListMenu />


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

          {isTeamMenuOpen && (
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
                    onClick={closeTeamMenu}
                    type="button"
                  >
                    <XMarkIcon className="h-7 w-7"/>
                  </button>
                </nav>

                <div className="flow-root">
                  <div className="divide-y divide-gray-500/10">
                    <div className="p-6">
                      <button
                        onClick={openNewWorkspaceModal}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        New List
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={menuRef} className={`invisible absolute w-[200px] bg-white top-16 right-0 z-50 rounded-md border ${menuclass}`}>
            <div className="h-full w-full relative divide-y divide-gray-500/10">
              <div className="flow-root">
                <div>
                  <Link
                    href="#"
                    className="inline-flex items-center w-full rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <Cog8ToothIcon className="w-4 h-4 mr-1" /> Settings
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: '/' }) }}
                    className="inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <ArrowLeftOnRectangleIcon className="w-4 h-4 mr-1" />Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}