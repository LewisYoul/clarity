import { useState, useEffect, useCallback } from 'react'
import debounce from 'debounce'

export default function SmsInput({ onChange, data, showValidationErrors }) {
  const [smsNumber, setSmsNumber] = useState(data?.smsNumber || '')
  const [displayValidationErrors, setDisplayValidationErrors] = useState(showValidationErrors)

  const isSmsNumberValid = useCallback(() => {
    return smsNumber !== ''
  }, [smsNumber])

  useEffect(() => {
    const uri = `sms:${smsNumber}`

    const data = {
      smsNumber
    }

    const isValid = isSmsNumberValid()

    onChange(isValid, data, uri)
  }, [smsNumber, onChange, isSmsNumberValid])

  useEffect(() => {
    setDisplayValidationErrors(showValidationErrors)
  }, [showValidationErrors])

  const inputStyles = displayValidationErrors && !isSmsNumberValid() ? 'ring-red-300' : 'ring-gray-300'
  const validationText = displayValidationErrors && !isSmsNumberValid() ? 'Phone number is required' : ''

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Phone Number
      </label>
      <input
        onChange={debounce((e) => { setSmsNumber(e.target.value) }, 300)}
        type="tel"
        name="sms-number"
        id="sms-number"
        className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${inputStyles} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        defaultValue={smsNumber}
      />
      <p className="text-red-500 text-xs mt-1">{validationText}</p>
    </div>
  )
}