"use client"

import { useContext } from 'react'
import { PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import { ModalContext } from '../contexts/modalContext'
import { ListsContext } from '../contexts/ListsProvider'
import CreateList from './CreateList'

export default function ListList() {
  const { setModalContent } = useContext(ModalContext)
  const { teamsData, changeList } = useContext(ListsContext)

  const openNewWorkspaceModal = () => {
    setModalContent(<CreateList onCreate={() => {
      setModalContent(null)
      // You might want to update the teamsData here if necessary
    }}/>)
  }

  if (!teamsData) return null; // or a loading spinner

  return (
    <div className="w-[200px] hidden md:block">
      {teamsData.teams.length > 1 && (
        <div>
          <button
            onClick={openNewWorkspaceModal}
            className="inline-flex items-center justify-between w-full rounded-lg px-3 pt-1.5 text-sm leading-7 text-gray-400">
            LISTS
            <span className="ml-2">
              <PlusIcon className="w-4 h-4" />
            </span>
          </button>
          {teamsData.teams.map((team) => (
            <button
              onClick={() => changeList(team.id)}
              key={team.id}
              className={`${teamsData.currentTeam.id === team.id ? 'bg-gray-50' : null} inline-flex items-center w-full text-left rounded-lg px-3 py-1.5 text-sm leading-7 text-gray-900 hover:bg-gray-50`}
            >
              <UserIcon className="w-4 h-4 mr-1" />{team.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
