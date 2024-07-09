import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { useRef, useState, useEffect, useCallback } from "react"

export default function Popover({ items }) {
  const popoverRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleOutsideClick = useCallback((event) => {
    if (popoverRef?.current?.contains(event.target)) { return }

    if (isOpen) { setIsOpen(false) }
  }, [isOpen])

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  }, [handleOutsideClick])

  const toggleOptionsPopover = () => {
    setIsOpen(!isOpen)
  }

  const visibilityClass = isOpen ? 'visible' : 'invisible'

  return(
    <div onClick={toggleOptionsPopover} className="absolute top-2 right-2 cursor-pointer">
      <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />

      <div ref={popoverRef} className={`${visibilityClass} absolute top-6 right-0 bg-white z-50 rounded-md border`}>
        <div className="h-full w-full relative divide-y divide-gray-500/10">
          <div className="flow-root">
            {
              items.map((item, index) => (
                <div key={index} className="hover:bg-gray-50 rounded-md">
                  <button
                    onClick={item.onClick}
                    className={`block rounded-lg px-1 mx-1 text-left py-1 text-sm leading-7 ${item.color ? 'text-red-400' : 'text-gray-750'}`}
                  >
                    {item.label}
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

