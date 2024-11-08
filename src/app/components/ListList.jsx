"use client"

import { useContext } from 'react'
import { PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import { ModalContext } from '../contexts/modalContext'
import { ListsContext } from '../contexts/ListsProvider'
import CreateList from './CreateList'
import ListListItem from './ListListItem'

export default function ListList() {
  const { setModalContent } = useContext(ModalContext)
  const { teamsData, fetchLists } = useContext(ListsContext)

  const openNewWorkspaceModal = async () => {
    setModalContent(<CreateList onCreate={async () => {
      await fetchLists()
      setModalContent(null)
    }}/>)
  }

  console.log('teamsData', teamsData)
  if (!teamsData) return null; // or a loading spinner

  return (
    <div className="w-64 hidden md:block h-full">
      {teamsData.teams.length > 0 && (
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
            <ListListItem key={team.id} list={team} />
          ))}
        </>
      )}
    </div>
  )
}
