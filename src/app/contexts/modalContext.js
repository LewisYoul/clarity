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
            {modalContent}
          </div>
        </div>}

        {children}
      </ModalContext.Provider>
  )
}

export default ModalProvider;

