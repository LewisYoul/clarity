import { useState, useEffect } from 'react'
import Image from 'next/image'

function RadioOption({ option, onClick, className }) {
  console.log('option', option)
  
  return (
    <div onClick={() => { onClick(option) }} className={className}>
      {option.icon && <Image alt="svg" src={option.icon} width={6} height={6} className="h-6 w-6 md:h-10 md:w-10" />}
    </div>
  )
}

export default function Radio({ value, options, onChange, className }) {
  const [selectedOption, setSelectedOption] = useState(value)

  useEffect(() => {
    onChange(selectedOption)
  }, [selectedOption, onChange])

  return (
    <div className={className + " flex md:grid md:gap-2 md:grid-cols-7"}>
      {options.map(option => {
        let optionClassName = 'mr-1 md:mr-0 cursor-pointer bg-white flex items-center justify-center rounded-md text-sm sm:flex-1 '
        
        optionClassName += selectedOption == option ? "border border-palqrblue border-2" : 'border border-2 ring-gray-300 text-gray-900 hover:bg-gray-50'

        return(
          <RadioOption className={optionClassName} key={option.name} option={option} onClick={setSelectedOption} />
        )
      })}
    </div>
  )
}