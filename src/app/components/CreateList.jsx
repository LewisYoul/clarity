import { useState } from 'react';
import { XCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export default function CreateList({ onCreate }) {
  const [name, setName] = useState('')
  const [collaborators, setCollaborators] = useState([])
  const [error, setError] = useState(false)
  
  const saveList = async () => {
    console.log('collaborators', collaborators)
    console.log('name', name)
    if (name.length === 0) {
      setError(true)
      
    } else {
      setError(false)

      console.log('name', name)

      const body = JSON.stringify({ name: name, collaborators: collaborators })

      console.log('body', body)
      try {
        const res = await fetch(`/api/teams`, {
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json'
          }
        })
  
        const json = await res.json()
        
        console.log('json', json)

        onCreate()
      } catch (error) {
        console.error('Error updating list:', error)
      }
    }
  }

  const handleAddCollaborator = () => {
    setCollaborators([...collaborators, ''])
  }

  const handleCollaboratorChange = (index, value) => {
    const newCollaborators = [...collaborators]
    newCollaborators[index] = value
    setCollaborators(newCollaborators)
  }

  const handleRemoveCollaborator = (index) => {
    const newCollaborators = collaborators.filter((_, i) => i !== index)
    setCollaborators(newCollaborators)
  }

  return (
    <div className="pt-4 px-4 w-screen flex justify-center">
      <div className="bg-white mt-0 md:mt-8 w-full md:w-[860px] rounded-md py-4 px-4">
        <div className="max-w-6xl m-auto">
          <h1 className="text-center text-2xl">New List</h1>

          <input autoFocus className="mt-4 border w-full rounded-sm px-2 py-1" onChange={(e => setName(e.target.value))} type="text" placeholder="Enter a name for your list" />
          {error && <div className="text-red-500">Please enter a name for your list</div>}
        </div>
        <p className="text-right">Collaborators (Optional)</p>
        {collaborators.map((collaborator, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              value={collaborator}
              onChange={(e) => handleCollaboratorChange(index, e.target.value)}
              placeholder="Enter collaborator's email"
              className="flex-grow border"
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => handleRemoveCollaborator(index)}
              >
                <XCircleIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={handleAddCollaborator}
        >
          <span className="flex items-center">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add Collaborator
          </span>
        </button>
        <div className="flex justify-end mt-4">
          <button
            onClick={saveList}
            type="button"
            className="inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}