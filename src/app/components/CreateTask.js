import { useRef } from 'react';

export default function CreateTask({ onCreate }) {
  const ref = useRef()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = ref.current.value

    // console.log('submit')

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

      ref.current.value = ''
      onCreate()
    } catch (error) {
      console.error('Error updating QR code:', error)
    }
  }

  return (
    <form className="w-full flex items-center" onSubmit={handleSubmit}>
      <input ref={ref} type="text" className="w-full bg-gray-800 rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:border-blue-400 text-gray-300" placeholder="+ Add Task" />
    </form>
  )
}