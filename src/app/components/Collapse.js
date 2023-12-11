import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Collapse({ title, children }) {
  const [active, setActive] = useState(false)

  const toggleActive = () => {
    setActive(!active)
  }

  return (
    <div>
      <label onClick={toggleActive} htmlFor="link" className="inline-flex items-center text-md font-semibold leading-6 text-gray-900 mt-5 w-full">
        {title}
        {<ChevronDownIcon className={`h-5 w-5 ml-1 transition-all duration-300 transform ${active ? '-rotate-180' : ''}`} aria-hidden="true" />}
      </label>

      <div className={`${
          active ? 'max-h-96' : 'max-h-0'
        } transition-all delay-150 duration-300 overflow-hidden w-full`}>
        {children}
      </div>
    </div>
  )
}