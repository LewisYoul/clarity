import { useState, createContext, useEffect } from 'react';
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const NotificationContext = createContext();

const NotificationProvider = ({children})=>{
  const [notificationContent, setNotificationContent] = useState()

  useEffect(() => {
    let timeoutId;

    if (notificationContent) {
      timeoutId = setTimeout(() => {
        setNotificationContent(null);
      }, 3000);
    }

    // Cleanup function to clear the timeout if the component unmounts or notificationContent changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [notificationContent]);


  return (
      <NotificationContext.Provider value={{ setNotificationContent }}>
        {!!notificationContent && <>
          <div
            aria-live="assertive"
            className="z-50 pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
          >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
              <div className="pointer-events-auto w-full max-w-sm overflow-hidden bg-gray-900 border border-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <CheckCircleIcon aria-hidden="true" className="h-6 w-6 text-green-400" />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-white">{notificationContent.title}</p>
                      <p className="mt-1 text-sm text-gray-500">{notificationContent.message}</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setNotificationContent(null)
                        }}
                        className="inline-flex bg-gray-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>}

        {children}
      </NotificationContext.Provider>
  )
}

export default NotificationProvider;

