import { useContext } from 'react'
import { NotificationContext } from '../contexts/notificationContext'
import { AlertContext } from '../contexts/alertContext'
import Popover from './Popover'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

export default function TaskListItem({ task, onChange }) {
  const { setNotificationContent } = useContext(NotificationContext)
  const { setAlertContent } = useContext(AlertContext)

  let popoverItems = [
    {
      label: 'Edit',
      onClick: () => {},
    },
    {
      label: 'Delete',
      onClick: () => {
        setAlertContent({
          title: 'Delete task',
          message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
          confirmText: 'Delete',
          cancelText: 'Cancel',
          onConfirm: () => {
            const deleteTask = async () => {
              try {
                const response = await fetch(`/api/tasks?id=${task.id}`, {
                  method: 'DELETE',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });

                if (!response.ok) {
                  throw new Error('Failed to delete task');
                }

                onChange();
                setAlertContent(null);
              } catch (error) {
                console.error('Error deleting task:', error);
                setNotificationContent({
                  title: 'Error',
                  message: 'Failed to delete the task. Please try again.'
                });
              }
            };

            deleteTask();
          }
        })
      },
      color: 'red'
    },
  ]

  const handleChange = async (e) => {
    const isCompleted = e.target.checked

    try {
      const response = await fetch(`/api/tasks?id=${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completedAt: isCompleted ? new Date().toISOString() : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      if (isCompleted) {
        setNotificationContent({
          title: 'Task completed',
          message: `"${task.title}" has been completed!`
        })
      }

      onChange()
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const labelClasses = task.completedAt ? 'line-through text-gray-400' : 'text-gray-300'

  return(
    <div className="relative flex items-start py-4 border-b border-gray-700 px-4 items-center">
      <div className="flex h-6 items-center">
        {/* <CheckCircleIcon className="h-4 w-4 text-green-400" /> */}
        <input
          onChange={handleChange}
          id={`task-${task.id}`}
          name={`task-${task.id}`}
          type="checkbox"
          checked={!!task.completedAt}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="min-w-0 flex-1 text-sm leading-6 ml-3">
        <label htmlFor={`task-${task.id}`} className={labelClasses}>
          {task.title.length > 0 ? task.title : <span className="text-gray-400">No Title</span>}
        </label>
      </div>
      <Popover items={popoverItems} classes="relative ml-3" />
    </div>
  )
}