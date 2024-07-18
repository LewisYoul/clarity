import { GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftIcon, EnvelopeIcon, DocumentIcon, WifiIcon, PhoneIcon, CreditCardIcon  } from '@heroicons/react/24/outline'
// import FileInput from '../FileInput'
import MailToInput from '../MailToInput'
import WiFiInput from '../WiFiInput'
import PhoneNumberInput from '../PhoneNumberInput'
import SmsInput from '../SmsInput'
import { useState, useEffect } from 'react'

export default function QrCodeTypeFormGroup({ onChange, qrCode }) {
  const [selectedType, setSelectedType] = useState(qrCode.type)
  const [link, setLink] = useState({
    uri: qrCode.type === 'link' ? qrCode.data.uri : null
  })
  const [mailTo, setMailTo] = useState({
    to: qrCode.type === 'email' ? qrCode.data.to : '',
    cc: qrCode.type === 'email' ? qrCode.data.cc : '',
    bcc: qrCode.type === 'email' ? qrCode.data.bcc : '',
    subject: qrCode.type === 'email' ? qrCode.data.subject : '',
    body: qrCode.type === 'email' ? qrCode.data.body : ''
  })
  const [wifi, setWifi] = useState({
    ssid: qrCode.type === 'wifi' ? qrCode.data.ssid : '',
    password: qrCode.type === 'wifi' ? qrCode.data.password : '',
  })
  const [call, setCall] = useState({
    phoneNumber: qrCode.type === 'call' ? qrCode.data.phoneNumber : ''
  })
  const [sms, setSms] = useState({
    phoneNumber: qrCode.type === 'sms' ? qrCode.data.phoneNumber : '',
    message: qrCode.type === 'sms' ? qrCode.data.message : ''
  })
  const [linkLink, setLinkLink] = useState()
  const [smsLink, setSmsLink] = useState()
  const [mailToLink, setMailToLink] = useState()
  const [wifiLink, setWifiLink] = useState()
  const [callLink, setCallLink] = useState()

  useEffect(() => {
    if (selectedType === 'link') {
      console.log('linklink', linkLink)
      onChange(selectedType, link, linkLink)
    } else if (selectedType === 'email') {
      onChange(selectedType, mailTo, mailToLink)
    } else if (selectedType === 'wifi') {
      onChange(selectedType, wifi, wifiLink)
    } else if (selectedType === 'call') {
      onChange(selectedType, call, callLink)
    } else if (selectedType === 'sms') {
      onChange(selectedType, sms, smsLink)
    }
  }, [onChange, selectedType, mailTo, mailToLink, link, linkLink, wifi, call, sms, smsLink, wifiLink, callLink])

  const typeButtonStyles = (type) => {
    let styles = "flex items-center"

    if (selectedType === type) {
      styles += " font-semibold text-gray-900"
    } else {
      styles += " text-gray-500"
    }

    return styles
  }

  const formatAndSetLink = (e) => {
    let linkToFormat = e.target.value

    if (!linkToFormat.startsWith('http://') && !linkToFormat.startsWith('https://')) {
      linkToFormat = `http://${linkToFormat}`
    }

    updateLink(linkToFormat)
  }

  const changeQrCodeType = (e) => {
    const type = e.currentTarget.value

    setSelectedType(type)
  }

  const updateLink = (newLink) => {
    const newData = { url: newLink }

    if (JSON.stringify(newData) !== JSON.stringify(mailTo)) {
      setLink(newData)
    }
    if (newLink !== linkLink) {
      setLinkLink(newLink)
    }
  }

  const updateMailTo = (data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(mailTo)) {
      setMailTo(data)
    }
    if (uri !== mailToLink) {
      setMailToLink(uri)
    }
  }

  const updateWifi = (data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(wifi)) {
      setWifi(data)
    }
    if (uri !== wifiLink) {
      setWifiLink(uri)
    }
  }

  const updateCall = (data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(call)) {
      setCall(data)
    }
    if (uri !== callLink) {
      setCallLink(uri)
    }
  }

  const updateSms = (data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(sms)) {
      setSms(data)
    }
    if (uri !== smsLink) {
      setSmsLink(uri)
    }
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <button onClick={changeQrCodeType} className={typeButtonStyles('link')} value="link"><GlobeAltIcon className="w-4 h-4 mr-2" /> URL</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('email')} value="email"><EnvelopeIcon className="w-4 h-4 mr-2" /> Email</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('wifi')} value="wifi"><WifiIcon className="w-4 h-4 mr-2" /> WiFi</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('call')} value="call"><PhoneIcon className="w-4 h-4 mr-2" /> Phone</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('sms')} value="sms"><ChatBubbleLeftIcon className="w-4 h-4 mr-2" /> SMS</button>

        {/* <button className={typeButtonStyles('text')}><DocumentTextIcon className="w-4 h-4 mr-2" /> Text</button> */}
        {/* <button className={typeButtonStyles('pdf')}><DocumentIcon className="w-4 h-4 mr-2" /> PDF</button> */}
        {/* <button className={typeButtontyles('vcard')}><CreditCardIcon className="w-4 h-4 mr-2" /> vCard</button> */}
      </div>

      {
          selectedType === 'link' && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-900 mt-3">
                Destination
              </label>
              <input
                onChange={formatAndSetLink}
                type="text"
                name="link"
                id="link"
                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="https://example.com"
                defaultValue={linkLink}
              />
            </div>
          )
        }

        {
          selectedType === 'email' && (
            <MailToInput
              onChange={updateMailTo}
              data={mailTo}
            />
          )
        }

        {
          selectedType === 'wifi' && (
            <WiFiInput
              onChange={updateWifi}
              data={wifi}
            />
          )
        }

        {
          selectedType === 'call' && (
            <PhoneNumberInput
              onChange={updateCall}
              data={call}
            />
          )
        }

        {
          selectedType === 'sms' && (
            <SmsInput
              onChange={updateSms}
              data={sms}
            />
          )
        }

        {
          // selectedType === 'pdf' && (
          //   <div className="mt-2">
          //     <FileInput
          //       accept={['application/pdf']}
          //       buttonText="Upload a PDF"
          //       onChange={() => {}}
          //     />
          //   </div>
          // )
        }
    </div>
  )
}