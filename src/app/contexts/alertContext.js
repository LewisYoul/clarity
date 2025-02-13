import { useState, createContext, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/outline'

export const AlertContext = createContext();

const AlertProvider = ({children})=>{
  const [alertContent, setAlertContent] = useState(null)

  return (
    <AlertContext.Provider value={{ setAlertContent }}>
      <>
        {alertContent && <div id="alert-root" className="relative z-50">
          <div
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
            <div className="flex z-50 min-h-full items-end justify-center p-4 text-center sm:items-start sm:p-0">
              <div
                className="relative z-50 transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    onClick={() => setAlertContent(null)}
                    className="rounded-md bg-gray-900 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div as="h3" className="text-base font-semibold leading-6 text-gray-100">
                      {alertContent.title}
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        {alertContent.message}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={() => alertContent.onConfirm()}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    {alertContent.confirmText}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAlertContent(null)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto"
                  >
                    {alertContent.cancelText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </>

      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider;

