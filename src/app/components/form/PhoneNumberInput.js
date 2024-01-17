import { useState, useEffect } from 'react'
import debounce from 'debounce'

export default function WiFiInput({ onChange }) {
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const uri = `tel:${phoneNumber}`

    const values = {
      phoneNumber
    }
    console.log('pnc', { values, uri })
    onChange({ values, uri })
  }, [phoneNumber, onChange])

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
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  )
}