import { useState, useEffect } from 'react'

function RadioOption({ option, onClick, className }) {
  
  return (
    <div onClick={() => { onClick(option) }} className={className}>
      <span>{option.name}</span>
    </div>
  )
}

export default function Radio({ value, options, onChange }) {
  const [selectedOption, setSelectedOption] = useState(value)

  useEffect(() => {
    onChange(selectedOption)
  }, [selectedOption, onChange])

  return (
    <div className="mt-2 grid grid-cols-3 gap-3 sm:grid-cols-6">
      {options.map(option => {
        let className = 'cursor-pointer bg-white flex items-center justify-center rounded-md px-2 py-1 text-sm sm:flex-1 '
        
        className += selectedOption == option ? "border border-palqrblue border-2" : 'border border-2 ring-gray-300 text-gray-900 hover:bg-gray-50'

        return(
          <RadioOption className={className} key={option.name} option={option} onClick={setSelectedOption} />
        )
      })}
    </div>
  )
}