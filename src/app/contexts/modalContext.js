import { useState, createContext, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'

export const ModalContext = createContext();

const ModalProvider = ({children})=>{
  const [modalContent, setModalContent] = useState()
  const modalRef = useRef()

  const handleOutsideClick = (event) => {
    if (modalRef.current.contains(event.target)) { return }

    setModalContent(null)
  }

  return (
      <ModalContext.Provider value={{ setModalContent }}>
        {modalContent && <div onClick={handleOutsideClick} className="fixed h-screen w-full bg-gray-500 bg-opacity-50 z-10 flex justify-center">
          <div ref={modalRef} className="h-[0px]">
            <div className="absolute top-0 right-0 pt-3 pr-3 z-20">
              <button
                type="button"
                className="inline-flex items-center justify-center text-gray-800 hover:text-gray-500"
                onClick={() => setModalContent(null)}
              >
                <span className="sr-only">Close modal</span>
                <XMarkIcon className="h-8 w-8" aria-hidden="true" />
              </button>
            </div>
            {modalContent}
          </div>
        </div>}

        {children}
      </ModalContext.Provider>
  )
}

export default ModalProvider;

