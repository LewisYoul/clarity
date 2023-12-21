import { useState, useEffect } from 'react'
import debounce from 'debounce'

export default function MailToInput({ onChange }) {
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [bcc, setBcc] = useState('')
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (!to.includes('@')) { return }

    const constructMailToUri = () => {
      let uri = `mailto:${to}`
  
      if (cc.includes('@')) {
        uri = uri + `?cc=${cc}`
      }
  
      if (bcc.includes('@')) {
        uri = uri + `&bcc=${bcc}`
      }
  
      if (subject !== '') {
        uri = uri + `&subject=${subject}`
      }
  
      if (body !== '') {
        uri = uri + `&body=${body}`
      }

      return uri
    }

    const values = {
      to,
      cc,
      bcc,
      subject,
      body
    }

    onChange({ values, uri: constructMailToUri() })
  }, [to, cc, bcc, subject, body, onChange])

  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-900 mt-3">
        Recipient
      </label>
      <input
        onChange={debounce((e) => setTo(e.target.value), 300)}
        type="text"
        name="to"
        id="to"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        placeholder="email@example.com"
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        cc
      </label>
      <input
        onChange={debounce((e) => setCc(e.target.value), 300)}
        type="text"
        name="to"
        id="to"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Bcc
      </label>
      <input
        onChange={debounce((e) => setBcc(e.target.value), 300)}
        type="text"
        name="to"
        id="to"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Subject
      </label>
      <input
        onChange={debounce((e) => setSubject(e.target.value), 300)}
        type="text"
        name="to"
        id="to"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Body
      </label>
      <textarea
        onChange={debounce((e) => setBody(e.target.value), 300)}
        name="bodu"
        id="bodu"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
      />
    </div>
  )
}