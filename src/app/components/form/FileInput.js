"use client"

import { useEffect, useRef, useState } from 'react'

export default function FileInput({ onChange }) {
  const [filePath, setFilePath] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    onChange(filePath)
  }, [filePath, onChange])

  const clickRealFileInput = () => {
    inputRef.current.click()
  }

  const clearFileInput = () => {
    inputRef.current.value = null
    setFilePath(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      setFilePath(null)
      return
    }

    const filePath = URL.createObjectURL(file)

    setFilePath(filePath)
  }

  const inputButtonText = filePath ? 'Change' : 'Upload a logo'

  return (
    <>
      <input className="hidden"type="file" id="logo" name="logo" accept="image/png, image/jpeg" ref={inputRef} onChange={(e) => handleFileChange(e)} />
      <button onClick={clickRealFileInput} className="bg-white ring-1 ring-inset ring-gray-300 rounded-md text-sm px-3 py-1">{inputButtonText}</button>
      {filePath ? <button onClick={clearFileInput} className="bg-white ring-1 ring-inset ring-gray-300 rounded-md text-sm px-3 py-1">Remove</button> : null}
    </>
  )
}