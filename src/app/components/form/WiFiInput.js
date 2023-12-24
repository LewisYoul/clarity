import { useState, useEffect } from 'react'
import debounce from 'debounce'

const DEFAULT_ENCRYPTION_TYPE = 'WPA'

export default function WiFiInput({ onChange }) {
  const [encryptionType, setEncryptionType] = useState(DEFAULT_ENCRYPTION_TYPE)
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const constructWifiString = () => {
      let wifiString = `WIFI:T:${encryptionType};S:${ssid};`

      if (encryptionType === 'nopass') {
        return `${wifiString};`
      } else {
        return `${wifiString}P:${password};;`
      }
    }

    const values = {
      encryptionType,
      ssid,
      password
    }
    console.log('v', values)
    onChange({ values, data: constructWifiString() })
  }, [encryptionType, ssid, password, onChange])

  const handleEncrytionTypeChange = (e) => {
    const value = e.target.value

    if (value === 'nopass') {
      setPassword(null)
    }

    setEncryptionType(value)
  }

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Encryption
      </label>
      <select defaultValue={DEFAULT_ENCRYPTION_TYPE} onChange={handleEncrytionTypeChange} className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
        <option value="WEP">WEP</option>
        <option value="WPA">WPA/WPA2</option>
        <option value="nopass">No encryption</option>
      </select>

      <label className="block text-sm font-medium text-gray-900 mt-3">
        WiFi Name (SSID)
      </label>
      <input
        onChange={debounce((e) => setSsid(e.target.value), 300)}
        type="text"
        name="wifi-name"
        id="wifi-name"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      {
        encryptionType !== 'nopass' && (
          <div>
            <label className="block text-sm font-medium text-gray-900 mt-3">
              Password
            </label>
            <input
              onChange={debounce((e) => setPassword(e.target.value), 300)}
              type="text"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        )
      }
    </div>
  )
}