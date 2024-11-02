'use client'

import { useState } from 'react'

export default function Faq({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full text-left py-4 flex justify-between items-center text-gray-300 hover:text-palqrblue"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-gabarito">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-400 font-gabarito">
          {answer}
        </div>
      )}
    </div>
  )
}