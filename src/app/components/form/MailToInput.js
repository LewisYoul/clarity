import { useState, useEffect } from 'react'
import debounce from 'debounce'

export default function MailToInput({ onChange, data }) {
  const [to, setTo] = useState(data.to || '')
  const [cc, setCc] = useState(data.cc || '')
  const [bcc, setBcc] = useState(data.bcc || '')
  const [subject, setSubject] = useState(data.subject || '')
  const [body, setBody] = useState(data.body || '')

  useEffect(() => {
    if (!to.includes('@')) { return }

    const constructMailToUri = () => {
      let uri = `mailto:${to}`
  
      uri = uri + `?cc=${cc}`

      uri = uri + `&bcc=${bcc}`

      uri = uri + `&subject=${subject}`

      uri = uri + `&body=${body}`

      return encodeURI(uri)
    }

    const newData = {
      to,
      cc,
      bcc,
      subject,
      body
    }

    onChange(newData, constructMailToUri())
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
        defaultValue={data.to}
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        cc
      </label>
      <input
        onChange={debounce((e) => setCc(e.target.value), 300)}
        type="text"
        name="cc"
        id="cc"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        defaultValue={data.cc}
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Bcc
      </label>
      <input
        onChange={debounce((e) => setBcc(e.target.value), 300)}
        type="text"
        name="bcc"
        id="bcc"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-9000 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        defaultValue={data.bcc}
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Subject
      </label>
      <input
        onChange={debounce((e) => setSubject(e.target.value), 300)}
        type="text"
        name="subject"
        id="subject"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        defaultValue={data.subject}
      />

      <label className="block text-sm font-medium text-gray-900 mt-3">
        Body
      </label>
      <textarea
        onChange={debounce((e) => setBody(e.target.value), 300)}
        name="body"
        id="body"
        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
        defaultValue={data.body}
      />
    </div>
  )
}