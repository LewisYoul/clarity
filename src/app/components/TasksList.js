"use client";

import { useCallback, useEffect, useState, useContext } from "react";
import QrCode from "./QrCode";
import { PlusIcon  } from '@heroicons/react/24/outline'
import { showToast } from "../utils/toastUtils";
import debounce from 'debounce';
import { ModalContext } from "../contexts/modalContext"
import CreateTask from "./CreateTask";
import TaskListItem from "./TaskListItem";

export default function Tasks() {
  const { setModalContent } = useContext(ModalContext)
  const [tasks, setTasks] = useState(null);
  
  const fetchTasks = useCallback(async () => {
    const url = `/api/tasks`

    try {
      const res = await fetch(url)

      if (!res.ok) throw new Error()

      const json = await res.json()
  
      setTasks(json.data)
    } catch (error) {
      console.error(error)

      showToast('There was a problem loading your tasks. If the problem persists please contact us.')
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const onTaskCreated = () => {
    fetchTasks()
    setModalContent(null)
    showToast('Task created')
  }

  const openNewTaskModal = () => {
    setModalContent(<CreateTask onCreate={onTaskCreated}/>)
  }


  if (tasks === null || tasks === undefined) return (
    <div>Loading...</div>
  )

  return(
    <div className="pb-4 mt-14">
      {
        tasks.length === 0 ? (
          <div className="w-full px-8 pt-10">
            <div className="flex justify-center text-center mt-4">
              <p className="block mx-auto text-gray-500">We couldn&apos;t find any Tasks, click the button below to create one!</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={openNewTaskModal}
                type="button"
                className="mr-4 inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5"/> New Task
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-full px-6 md:px-0 md:w-1/2">
              <div className="flex justify-between items-center">
                <legend className="text-base font-semibold leading-6 text-gray-900">Tasks</legend>
                <button
                  onClick={openNewTaskModal}
                  type="button"
                  className="inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon className="h-5 w-5"/> New Task
                </button>
              </div>
              <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
                {tasks.map((task, taskIdx) => (
                  <TaskListItem key={`task-${taskIdx}`} task={task} onChange={fetchTasks} />
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}