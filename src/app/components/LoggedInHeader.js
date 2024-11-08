"use client";

import { signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback, useContext } from 'react'
import CreateList from './CreateList'
import { ListsContext } from '../contexts/ListsProvider'
import { ModalContext } from '../contexts/modalContext'
import { MobileMenuContext } from '../contexts/MobileMenuProvider'
import ListListItem from './ListListItem'

export default function LoggedInHeader({ initialTeam }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  // const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)
  const menuRef = useRef()
  const mobileMenuRef = useRef()
  const teamMenuRef = useRef()
  const mobileTeamMenuRef = useRef()
  const { teamsData, changeList } = useContext(ListsContext)
  const { setModalContent } = useContext(ModalContext)
  const { isTeamMenuOpen, setIsTeamMenuOpen } = useContext(MobileMenuContext)

  const handleOutsideClick = useCallback((event) => {
    console.log('handleOutsideClick', event.target)

    const alertRoot = document.getElementById('alert-root')

    // These different menus need extracting to their own contexts
    if (alertRoot?.contains(event.target)) { return }
    if (menuRef?.current?.contains(event.target)) { return }
    if (mobileMenuRef?.current?.contains(event.target)) { return }
    if (teamMenuRef?.current?.contains(event.target)) { return }
    if (mobileTeamMenuRef?.current?.contains(event.target)) { return }
    if (isMenuOpen) { closeMenu() }
    // if (isTeamMenuOpen) { closeTeamMenu() }
  }, [isMenuOpen])

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

  const openTeamMenu = () => {
    console.log('openTeamMenu')
    setIsTeamMenuOpen(true)
  }

  const closeTeamMenu = () => {
    setIsTeamMenuOpen(false)
  }

  const menuclass = isMenuOpen ? 'lg:visible' : ''

  return (
    <header className="inset-x-0 top-0">
      <nav className="flex items-center justify-between px-4 py-3 lg:px-3 relative" aria-label="Global">
        <div className="flex lg:flex-1">
          <div onClick={() => { setIsTeamMenuOpen(true) }} className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              className="h-10 w-auto"
              src="/logo.svg"
              alt=""
            />
            <span className="text-md text-gray-300">{teamsData?.currentTeam?.name}</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center text-gray-300">
          <button
            onClick={openMenu}
            type="button"
            className="lg:hidden"
          >
            <UserCircleIcon className="h-7 w-7"/>
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="hidden lg:block"
          >
            <UserCircleIcon className="h-7 w-7"/>
          </button>
          <div 
            className={`lg:hidden fixed h-screen w-screen inset-x-0 top-0 z-40 text-gray-300 ${
              isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* Background overlay with fade transition */}
            <div 
              className={`absolute inset-0 bg-gray-500/70 transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {/* Menu panel with slide transition */}
            <div 
              className={`absolute bg-gray-900 w-3/4 h-full right-0 transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div ref={menuRef} className="h-full w-full relative divide-y divide-gray-500/10">
                <nav className="flex items-center justify-end px-4 py-3">
                  <button
                    className="h-9"
                    onClick={closeMenu}
                    type="button"
                  >
                    <UserCircleIcon className="h-7 w-7"/>
                  </button>
                </nav>

                <div className="flow-root">
                  <div className="divide-y divide-gray-500/10">
                    <div className="p-6">
                      <Link
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => { signOut({ callbackUrl: '/' }) }}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-300 hover:bg-gray-800"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div ref={mobileMenuRef} className={`invisible absolute w-[200px] bg-gray-900 top-16 right-0 z-40 border border-gray-700 ${menuclass}`}>
            <div className="h-full w-full relative divide-y divide-gray-500/10">
              <div className="flow-root">
                <div>
                  <Link
                    href="#"
                    className="inline-flex items-center w-full rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-300 hover:bg-gray-800"
                  >
                    <Cog8ToothIcon className="w-4 h-4 mr-1" /> Settings
                  </Link>
                  <button
                    onClick={() => { signOut({ callbackUrl: '/' }) }}
                    className="inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-300 hover:bg-gray-800"
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
