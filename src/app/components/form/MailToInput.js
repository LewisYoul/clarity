import { useState, useEffect, useCallback } from 'react'
import debounce from 'debounce'

export default function MailToInput({ onChange, data = {}, showValidationErrors }) {
  const [to, setTo] = useState(data?.to || '')
  const [cc, setCc] = useState(data?.cc || '')
  const [bcc, setBcc] = useState(data?.bcc || '')
  const [subject, setSubject] = useState(data?.subject || '')
  const [body, setBody] = useState(data?.body || '')
  const [displayValidationErrors, setDisplayValidationErrors] = useState(showValidationErrors)

  const isToValid = useCallback(() => {
    return to.includes('@')
  }, [to])

  const isCcValid = useCallback(() => {
    return cc === '' || cc.includes('@')
  }, [cc])

  const isBccValid = useCallback(() => {
    return bcc === '' || bcc.includes('@')
  }, [bcc])

  const isSubjectValid = useCallback(() => {
    return subject.length > 0
  }, [subject])

  useEffect(() => {
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

    const isValid = isToValid() && isCcValid() && isBccValid() && isSubjectValid()

    onChange(isValid, newData, constructMailToUri())
  }, [to, cc, bcc, subject, body, onChange, isToValid, isCcValid, isBccValid, isSubjectValid])

  useEffect(() => {
    setDisplayValidationErrors(showValidationErrors)
  }, [showValidationErrors])

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
      {displayValidationErrors && !isToValid() && <p className="mt-2 text-sm text-red-600">Invalid email address</p>}

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
      {displayValidationErrors && !isCcValid() && <p className="mt-2 text-sm text-red-600">Invalid email address</p>}

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
      {displayValidationErrors && !isBccValid() && <p className="mt-2 text-sm text-red-600">Invalid email address</p>}

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
      {displayValidationErrors && !isSubjectValid() && <p className="mt-2 text-sm text-red-600">Enter a subject</p>}

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