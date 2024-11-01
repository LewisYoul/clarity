"use client";

import { signOut } from "next-auth/react"
import { Bars3Icon, XMarkIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon, PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback, useContext } from 'react'
import CreateList from './CreateList'
import { ListsContext } from '../contexts/ListsProvider'
import { ModalContext } from '../contexts/modalContext'


export default function LoggedInHeader({ initialTeam }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)
  const menuRef = useRef()
  const mobileMenuRef = useRef()
  const teamMenuRef = useRef()
  const mobileTeamMenuRef = useRef()
  const { teamsData, changeList } = useContext(ListsContext)
  const { setModalContent } = useContext(ModalContext)


  const handleOutsideClick = useCallback((event) => {
    console.log('handleOutsideClick', event.target)
    if (menuRef?.current?.contains(event.target)) { return }
    if (mobileMenuRef?.current?.contains(event.target)) { return }
    if (teamMenuRef?.current?.contains(event.target)) { return }
    if (mobileTeamMenuRef?.current?.contains(event.target)) { return }
    if (isMenuOpen) { closeMenu() }
    if (isTeamMenuOpen) { closeTeamMenu() }
  }, [isMenuOpen, isTeamMenuOpen])

  const openNewWorkspaceModal = () => {
    setIsTeamMenuOpen(false)
    setModalContent(<CreateList onCreate={() => {
      setModalContent(null)
      // You might want to update the teamsData here if necessary
    }}/>)
  }

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
          <div onClick={openTeamMenu} className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              className="h-9 w-auto"
              src="/logo.svg"
              alt=""
            />
            <span className="text-md">{teamsData?.currentTeam?.name}</span>
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center">
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
          {isMenuOpen && (
            <div className="lg:hidden fixed h-screen w-screen bg-white inset-x-0 top-0 z-50">
              <div ref={menuRef} className="h-full w-full relative divide-y divide-gray-500/10">
                <nav className="flex items-center justify-between px-4 py-3">
                  <div onClick={closeMenu} className="-m-1.5 p-1.5 flex items-center gap-2">
                    <img
                      className="h-9 w-auto"
                      src="/logo.svg"
                      alt=""
                    />
                    <span className="text-md">{teamsData?.currentTeam?.name}</span>
                  </div>
                  <button
                    className=""
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

          {isTeamMenuOpen && teamsData && (
            <div className="lg:hidden fixed h-screen w-screen bg-white inset-x-0 top-0 z-50">
              <div ref={mobileTeamMenuRef} className="h-full w-full relative divide-y divide-gray-500/10">
                <nav className="flex items-center justify-between px-4 py-3">
                  <div onClick={closeTeamMenu} className="-m-1.5 p-1.5 flex items-center gap-2">
                    <img
                      className="h-9 w-auto"
                      src="/logo.svg"
                      alt=""
                    />
                    <span className="text-md">{teamsData?.currentTeam?.name}</span>
                  </div>

                  <button
                    className=""
                    onClick={closeTeamMenu}
                    type="button"
                  >
                    <UserCircleIcon className="h-7 w-7"/>
                  </button>
                </nav>

                <div className="flow-root">
                  <div className="divide-y divide-gray-500/10">
                    <div className="p-6">
                      <button
                        onClick={openNewWorkspaceModal}
                        className="inline-flex items-center justify-between w-full rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-400 hover:bg-gray-50"
                      >
                        New List
                        <PlusIcon className="w-4 h-4 ml-2" />
                      </button>
                      {teamsData.teams.map((team) => (
                        <button
                          onClick={() => {
                            changeList(team.id)
                          }}
                          key={team.id}
                          className={`${teamsData.currentTeam.id === team.id ? 'bg-gray-50' : ''} inline-flex items-center w-full text-left rounded-lg px-3 py-2.5 text-sm leading-7 text-gray-900 hover:bg-gray-50`}
                        >
                          <UserIcon className="w-4 h-4 mr-1" />{team.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={mobileMenuRef} className={`invisible absolute w-[200px] bg-white top-16 right-0 z-50 rounded-md border ${menuclass}`}>
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
