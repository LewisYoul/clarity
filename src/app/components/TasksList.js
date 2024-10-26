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
    showToast('Task created')
  }

  if (tasks === null || tasks === undefined) return (
    <div>Loading...</div>
  )

  return(
    <div className="pb-4 mt-4 md:mt-14">
      <div className="flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-1/2">
          <div className="flex justify-between items-center">
            <CreateTask onCreate={onTaskCreated}/>
          </div>
          <div className="mt-2">
            {tasks.map((task, taskIdx) => (
              <TaskListItem key={`task-${taskIdx}`} task={task} onChange={fetchTasks} />
            ))}
          </div>
        </div>
      </div>

      {
        tasks.length === 0 && (
          <div className="w-full px-8 pt-10">
            <div className="flex justify-center text-center mt-4">
              <p className="block mx-auto text-gray-500">We couldn&apos;t find any Tasks, use the input above to create one!</p>
            </div>
          </div>
        )
      }
    </div>
  )
}