"use client"

import { useContext } from 'react'
import { PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import { ModalContext } from '../contexts/modalContext'
import { ListsContext } from '../contexts/ListsProvider'
import CreateList from './CreateList'
import Popover from './Popover'
import { AlertContext } from '../contexts/alertContext'
import { NotificationContext } from '../contexts/notificationContext'

function ListListItem({ list }) {
  const { setAlertContent } = useContext(AlertContext)
  const { setNotificationContent } = useContext(NotificationContext)
  const { teamsData, changeList, fetchLists } = useContext(ListsContext)

  let popoverItems = [
    {
      label: 'Edit',
      onClick: () => {}
    },
  ]

  if (list.name !== 'Personal') {
    popoverItems.push({
      label: 'Delete',
      color: 'red',
      onClick: () => {
        setAlertContent({
          title: 'Delete list',
          message: `Are you sure you want to delete this list? All associated tasks will also be deleted.`,
          confirmText: 'Delete',
          cancelText: 'Cancel',
          onConfirm: () => {
            const deleteList = async () => {
              try {
                const response = await fetch(`/api/teams?id=${list.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error('Failed to delete list');
                }

                console.log('response', response)

                fetchLists();
                setAlertContent(null);
              } catch (error) {
                console.error('Error deleting list:', error);
                setNotificationContent({
                  title: 'Error',
                  message: 'Failed to delete the list. Please try again.'
                });
              }
            };

            deleteList();
          }
        })
      }
    })
  }

  return (
    <div key={list.id} className={`${teamsData.currentTeam.id === list.id ? 'bg-gray-800' : null} flex justify-between items-center hover:bg-gray-800`}>
      <button
        onClick={() => changeList(list.id)}
        className={`inline-flex items-center w-full text-left px-4 py-1.5 text-sm leading-7 text-gray-300`}
      >
        <UserIcon className="w-4 h-4 mr-1" />{list.name}
      </button>

      <Popover items={popoverItems} classes="relative mr-3" />
    </div>
  )
}

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
            <ListListItem key={team.id} list={team} />
          ))}
        </>
      )}
    </div>
  )
}
