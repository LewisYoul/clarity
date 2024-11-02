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
    <div className="w-64 hidden md:block h-full">
      {teamsData.teams.length > 1 && (
        <>
          <div
            className="inline-flex items-center justify-between w-full rounded-lg px-4 py-2 text-sm leading-7 text-gray-400">
            LISTS
            <button
              onClick={openNewWorkspaceModal}
              className="ml-2 hover:bg-gray-800 rounded-md p-1 text-gray-300"
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
          {teamsData.teams.map((team) => (
            <button
              onClick={() => changeList(team.id)}
              key={team.id}
              className={`${teamsData.currentTeam.id === team.id ? 'bg-gray-800' : null} inline-flex items-center w-full text-left px-4 py-1.5 text-sm leading-7 text-gray-300 hover:bg-gray-800`}
            >
              <UserIcon className="w-4 h-4 mr-1" />{team.name}
            </button>
          ))}
        </>
      )}
    </div>
  )
}
