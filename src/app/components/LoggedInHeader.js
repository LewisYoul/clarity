"use client";

import { signOut } from "next-auth/react"
import { PlusIcon, Bars3Icon, XMarkIcon, UserCircleIcon, ArrowLeftOnRectangleIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useRef, useEffect, useCallback, useContext } from 'react'
import CreateList from './CreateList'
import { ModalContext } from '../contexts/modalContext'


export default function LoggedInHeader({ initialTeam }) {
  const { setModalContent } = useContext(ModalContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef()
  const [teamsData, setTeamsData] = useState(null);


  const handleOutsideClick = useCallback((event) => {
    if (menuRef?.current?.contains(event.target)) { return }

    if (isMenuOpen) { closeMenu() }
  }, [isMenuOpen])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('/api/teams');
        if (response.ok) {
          const { data } = await response.json();
          console.log('data', data)
          setTeamsData(data);
        } else {
          console.error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const openNewWorkspaceModal = () => {
    closeMenu()
    setModalContent(<CreateList onCreate={() => {
      setModalContent(null)
      window.location.href = '/dashboard';
    }}/>)
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
        {teamsData && teamsData.teams && (
          <select
            className="ml-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            defaultValue={teamsData.currentTeam.id}
          >
            {teamsData.teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        )}
        </div>
        <div className="flex flex-1 justify-end items-center">
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
                  <button
                    onClick={openNewWorkspaceModal}
                    className="inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />New List
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