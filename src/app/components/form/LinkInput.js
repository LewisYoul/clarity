import { useState, useEffect, useCallback } from 'react'
import debounce from 'debounce'

export default function LinkInput({ onChange, data, showValidationErrors }) {
  const [uri, setUri] = useState(data?.uri || '')
  const [displayValidationErrors, setDisplayValidationErrors] = useState(showValidationErrors)

  const isUriValid = useCallback(() => {
    return uri !== ''
  }, [uri])

  useEffect(() => {
    const data = {
      uri
    }

    const isValid = isUriValid()

    onChange(isValid, data, uri)
  }, [uri, onChange, isUriValid])

  useEffect(() => {
    setDisplayValidationErrors(showValidationErrors)
  }, [showValidationErrors])

  const inputStyles = displayValidationErrors && !isUriValid() ? 'ring-red-300' : 'ring-gray-300'
  const validationText = displayValidationErrors && !isUriValid() ? 'Link is required' : ''

  const formatAndSetLink = (e) => {
    let linkToFormat = e.target.value

    if (!linkToFormat.startsWith('http://') && !linkToFormat.startsWith('https://')) {
      linkToFormat = `http://${linkToFormat}`
    }

    setUri(linkToFormat)
  }

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Link
      </label>
      <input
        onChange={debounce(formatAndSetLink, 300)}
        type="text"
        name="link"
        id="link"
        className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-9000 shadow-sm ring-1 ring-inset ${inputStyles} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        defaultValue={uri}
      />
      <p className="text-red-500 text-xs mt-1">{validationText}</p>
    </div>
  )
}