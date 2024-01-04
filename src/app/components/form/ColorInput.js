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
    <div className="flex mt-2 items-center">
      <input type="color" value={color} onChange={handleManualColorChange} />
      <input ref={textInputRef} type="text" className="text-sm px-2 py-1.5" defaultValue={color} onChange={handleManualColorChange} />
    </div>
  )
}