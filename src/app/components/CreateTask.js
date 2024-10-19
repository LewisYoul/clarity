import { useState } from 'react';

export default function CreateTask({ onCreate }) {
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  
  const saveTask = async () => {
    if (title.length === 0) {
      setError(true)
      
    } else {
      setError(false)

      console.log('title', title)

      const body = JSON.stringify({ title: title })

      console.log('body', body)
      try {
        const res = await fetch(`/api/tasks`, {
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
        console.error('Error updating QR code:', error)
      }
    }
  }

  return (
    <div className="bg-white mt-0 md:mt-8 w-screen md:w-[860px] rounded-md py-4 px-4">
      <div className="max-w-6xl m-auto">
        <h1 className="text-center text-2xl">New Task</h1>

        <input autoFocus className="mt-4 border w-full rounded-sm px-2 py-1" onChange={(e => setTitle(e.target.value))} type="text" placeholder="What do you need to do?" />
        {error && <div className="text-red-500">Please enter a title for your task</div>}
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={saveTask}
          type="button"
          className="inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
        >
          Save
        </button>
      </div>
    </div>
  )
}