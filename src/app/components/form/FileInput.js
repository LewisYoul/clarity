"use client"

import { useEffect, useRef, useState } from 'react'

export default function FileInput({ accept, buttonText, onChange }) {
  const [filePath, setFilePath] = useState(null)
  const inputRef = useRef(null)

  useEffect(() => {
    console.log('filePath', filePath)
    onChange(filePath)
  }, [filePath, onChange])

  const clickRealFileInput = () => {
    inputRef.current.click()
  }

  const clearFileInput = () => {
    inputRef.current.value = null
    setFilePath(null)
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleFileChange = async (e) => {
    const file = e.target.files[0]

    if (!file) {
      setFilePath(null)
      return
    }

    const filePath = await toBase64(file)

    setFilePath(filePath)
  }

  const inputButtonText = filePath ? 'Change' : buttonText

  return (
    <>
      <input className="hidden"type="file" id="logo" name="logo" accept={accept.join(', ')} ref={inputRef} onChange={(e) => handleFileChange(e)} />
      <button onClick={clickRealFileInput} className="bg-white ring-1 ring-inset ring-gray-300 rounded-md text-sm px-3 py-1">{inputButtonText}</button>
      {filePath ? <button onClick={clearFileInput} className="bg-white ring-1 ring-inset ring-gray-300 rounded-md text-sm px-3 py-1">Remove</button> : null}
    </>
  )
}