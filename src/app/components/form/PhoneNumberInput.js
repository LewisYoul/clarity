import { useState, useEffect, useCallback } from 'react'
import debounce from 'debounce'

export default function PhoneNumberInput({ onChange, data, showValidationErrors }) {
  const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber || '')
  const [displayValidationErrors, setDisplayValidationErrors] = useState(showValidationErrors)

  const isPhoneNumberValid = useCallback(() => {
    return phoneNumber !== ''
  }, [phoneNumber])

  useEffect(() => {
    const uri = `tel:${phoneNumber}`

    const data = {
      phoneNumber
    }

    const isValid = isPhoneNumberValid()

    onChange(isValid, data, uri)
  }, [phoneNumber, onChange, isPhoneNumberValid])

  useEffect(() => {
    setDisplayValidationErrors(showValidationErrors)
  }, [showValidationErrors])

  const inputStyles = displayValidationErrors && !isPhoneNumberValid() ? 'ring-red-300' : 'ring-gray-300'
  const validationText = displayValidationErrors && !isPhoneNumberValid() ? 'Phone number is required' : ''

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Phone Number
      </label>
      <input
        onChange={debounce((e) => setPhoneNumber(e.target.value), 300)}
        type="tel"
        name="phone-number"
        id="phone-number"
        className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-9000 shadow-sm ring-1 ring-inset ${inputStyles} placeholder:text-gray-400 sm:text-sm sm:leading-6`}
        defaultValue={phoneNumber}
      />
      <p className="text-red-500 text-xs mt-1">{validationText}</p>
    </div>
  )
}