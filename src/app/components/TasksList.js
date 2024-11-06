"use client";

import { useCallback, useEffect, useState, useContext } from "react";
import { showToast } from "../utils/toastUtils";
import CreateTask from "./CreateTask";
import TaskListItem from "./TaskListItem";
import { ListsContext } from "../contexts/ListsProvider";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline"

export default function Tasks() {
  const { teamsData } = useContext(ListsContext)
  const [openTasks, setOpenTasks] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  
  const fetchTasks = useCallback(async () => {
    const url = `/api/tasks`

    try {
      const res = await fetch(url)

      if (!res.ok) throw new Error()

      const json = await res.json()
  
      setOpenTasks(json.data.openTasks)
      setCompletedTasks(json.data.completedTasks)
    } catch (error) {
      console.error(error)

      showToast('There was a problem loading your tasks. If the problem persists please contact us.')
    }
  }, [])

  useEffect(() => {
    fetchTasks()
    // This will get new tasks when the list is changed
  }, [fetchTasks, teamsData])

  const onTaskCreated = () => {
    fetchTasks()
    showToast('Task created')
  }

  if (openTasks === null) return (
    <div>Loading...</div>
  )

  return(
    <div className="pb-4 mt-6">
      <div className="flex justify-center">
        <div className="w-full px-6 md:px-0 md:w-1/2">
          <div className="flex justify-between items-center">
            <CreateTask onCreate={onTaskCreated}/>
          </div>
          <div className="mt-2">
            {openTasks.map((task, taskIdx) => (
              <TaskListItem key={`task-${taskIdx}`} task={task} onChange={fetchTasks} />
            ))}
          </div>

          {completedTasks.length > 0 && (
            <div className="mt-2">
              <button 
                onClick={() => setShowCompleted(!showCompleted)}
                className="flex items-center font-semibold p-4 text-sm w-full text-gray-300"
              >
                <span>{showCompleted ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}</span>
                <span className="ml-2 text-gray-300">Completed</span>
              </button>
              {showCompleted && (
                <div>
                  {completedTasks.map((task, taskIdx) => (
                    <TaskListItem key={`task-${taskIdx}`} task={task} onChange={fetchTasks} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {
        openTasks.length === 0 && completedTasks.length === 0 && (
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