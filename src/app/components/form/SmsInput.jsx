import { useState, useEffect } from 'react'
import debounce from 'debounce'

export default function SmsInput({ onChange }) {
  const [smsNumber, setSmsNumber] = useState('')

  useEffect(() => {
    const uri = `sms:${smsNumber}`

    const values = {
      smsNumber
    }

    onChange({ values, uri })
  }, [smsNumber, onChange])

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Phone Number
      </label>
      <input
        onChange={debounce((e) => setSmsNumber(e.target.value), 300)}
        type="tel"
        name="sms-number"
        id="sms-number"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  )
}