"use client";

import { useEffect, useRef, useState } from "react";

export default function ColorInput({ onChange }) {
  const defaultColor = '#000000'
  const colorRegex = /^#[0-9A-F]{6}$/i;

  const [color, setColor] = useState(defaultColor)
  const textInputRef = useRef()

  useEffect(() => {
    onChange(color)
  }, [onChange, color])

  const handleManualColorChange = (event) => {
    const newColor = event.target.value

    if (colorRegex.test(newColor)) {
      textInputRef.current.value = newColor
      setColor(newColor)
    }
  }

  return (
    <div className="flex items-center bg-white rounded-md border border-gray-200 py-1">
      <div className="rounded-md overflow-hidden rounded-md h-8 w-8 relative ml-2">
        <input className="bg-white h-[200px] w-[200px] p-0 absolute -top-2 -left-2" type="color" value={color} onChange={handleManualColorChange} />
      </div>
      <input ref={textInputRef} type="text" className="h-10 text-sm px-2 py-1.5 w-full md:w-[80px] rounded-md" defaultValue={color} onChange={handleManualColorChange} />
    </div>
  )
}