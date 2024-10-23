import { PlusIcon, UserIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import CreateList from './CreateList'
import { useState, useRef, useCallback, useEffect, useContext } from 'react'
import Link from 'next/link'
import { ModalContext } from '../contexts/modalContext'

export default function ListMenu() {
  const { setModalContent } = useContext(ModalContext)
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false)
  const [teamsData, setTeamsData] = useState(null);
  const teamMenuRef = useRef()

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

  const handleOutsideClick = useCallback((event) => {
    if (teamMenuRef?.current?.contains(event.target)) { return }
    if (isTeamMenuOpen) { setIsTeamMenuOpen(false) }
  }, [isTeamMenuOpen])

  const openNewWorkspaceModal = () => {
    setIsTeamMenuOpen(false)
    setModalContent(<CreateList onCreate={() => {
      setModalContent(null)
      window.location.href = '/dashboard';
    }}/>)
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const teamMenuClass = isTeamMenuOpen ? 'lg:visible' : ''

  const changeList = async (teamId) => {
    try {
      const response = await fetch(`/api/users`, {
        method: 'PUT',
        body: JSON.stringify({ currentTeamId: teamId })
      })

      if (response.ok) {
        console.log('List changed successfully')
        window.location.href = '/dashboard';
      } else {
        console.error('Failed to change list')
      }
    } catch (error) {
      console.error('Error changing list:', error)
    }
  }


  return (
    <div className="relative">
      <button onClick={() => setIsTeamMenuOpen(!isTeamMenuOpen)} className=" inline-flex items-center mr-4 border-r border-gray-300 pr-4">
        <UserIcon className="w-4 h-4 mr-1" /> <span>{teamsData?.currentTeam?.name}</span> {isTeamMenuOpen ? <ChevronUpIcon className="w-4 h-4 ml-1" /> : <ChevronDownIcon className="w-4 h-4 ml-1" />}
      </button>
      <div ref={teamMenuRef} className={`invisible absolute w-[200px] bg-white top-9 right-8 z-50 rounded-md border ${teamMenuClass}`}>
        <div className="h-full w-full relative divide-y divide-gray-500/10">
          <div className="flow-root">
            <Link
              href="#"
              className="inline-flex items-center w-full rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
            >
              <Cog8ToothIcon className="w-4 h-4 mr-1" /> List Settings
            </Link>
            <hr />
            {teamsData?.teams.length > 1 && (
              <div>
                <div className="inline-flex items-center w-full rounded-lg px-3 pt-1.5 text-sm leading-7 text-gray-400">
                  CHANGE LIST
                </div>
                {teamsData.teams.map((team) => (
                  <button
                    onClick={() => {changeList(team.id)}}
                    key={team.id}
                    className="inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <UserIcon className="w-4 h-4 mr-1" />{team.name}
                  </button>
                ))}
              </div>
            )}
              <hr />
              <div>
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

      {/* TODO: Make it so the mobile menu doesn't close immediately when you click it */}
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
                onClick={() => setIsTeamMenuOpen(false)}
                type="button"
              >
                <XMarkIcon className="h-7 w-7"/>
              </button>
            </nav>

            <div className="flow-root">
              {teamsData?.teams.length > 1 && (
                <div>
                  <div className="inline-flex items-center w-full rounded-lg px-3 pt-1.5 text-sm leading-7 text-gray-400">
                    CHANGE LIST
                  </div>
                  {teamsData.teams.map((team) => (
                    <button
                      onClick={() => {changeList(team.id)}}
                      key={team.id}
                      className="inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      <UserIcon className="w-4 h-4 mr-1" />{team.name}
                    </button>
                  ))}
                </div>
              )}
              <hr />
              <div>
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
      )}
    </div>
  )
}