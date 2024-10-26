"use client"

import { useState, useEffect, useContext } from 'react'
import { PlusIcon, UserIcon } from '@heroicons/react/24/outline'
import { ModalContext } from '../contexts/modalContext'
import CreateList from './CreateList'

export default function ListList() {
  const { setModalContent } = useContext(ModalContext)
  const [teamsData, setTeamsData] = useState(null);

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

  const openNewWorkspaceModal = () => {
    setModalContent(<CreateList onCreate={() => {
      setModalContent(null)
      window.location.href = '/dashboard';
    }}/>)
  }

  return (
    <div className="w-[200px] hidden md:block">
      {teamsData?.teams.length > 1 && (
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
              onClick={() => {changeList(team.id)}}
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