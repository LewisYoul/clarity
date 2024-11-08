import { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { ListsContext } from './ListsProvider';

export const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const { teamsData } = useContext(ListsContext)
  const [openTasks, setOpenTasks] = useState(null)
  const [completedTasks, setCompletedTasks] = useState(null)

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
    if (!teamsData) return
    fetchTasks()
  }, [fetchTasks, teamsData])

  return (
    <TasksContext.Provider value={{ fetchTasks, openTasks, completedTasks }}>
      {children}
    </TasksContext.Provider>
  )
}

export default TasksProvider