import { GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftIcon, EnvelopeIcon, DocumentIcon, WifiIcon, PhoneIcon, CreditCardIcon  } from '@heroicons/react/24/outline'
import LinkInput from '../LinkInput'
import MailToInput from '../MailToInput'
import WiFiInput from '../WiFiInput'
import PhoneNumberInput from '../PhoneNumberInput'
import SmsInput from '../SmsInput'
import { useState, useEffect } from 'react'

export default function QrCodeTypeFormGroup({ onChange, qrCode = { type: 'link', data: { uri: undefined }}, showValidationErrors, setShowValidationErrors }) {
  console.log('qrCode', qrCode)
  const [selectedType, setSelectedType] = useState(qrCode?.type || 'link')
  const [link, setLink] = useState({
    uri: qrCode?.type === 'link' ? qrCode.data.uri : ''
  })
  const [mailTo, setMailTo] = useState({
    to: qrCode?.type === 'email' ? qrCode.data.to : '',
    cc: qrCode?.type === 'email' ? qrCode.data.cc : '',
    bcc: qrCode?.type === 'email' ? qrCode.data.bcc : '',
    subject: qrCode?.type === 'email' ? qrCode.data.subject : '',
    body: qrCode?.type === 'email' ? qrCode.data.body : ''
  })
  const [wifi, setWifi] = useState({
    ssid: qrCode?.type === 'wifi' ? qrCode.data.ssid : '',
    password: qrCode?.type === 'wifi' ? qrCode.data.password : '',
  })
  const [call, setCall] = useState({
    phoneNumber: qrCode?.type === 'call' ? qrCode.data.phoneNumber : ''
  })
  const [sms, setSms] = useState({
    smsNumber: qrCode?.type === 'sms' ? qrCode.data.smsNumber : '',
    message: qrCode?.type === 'sms' ? qrCode.data.message : ''
  })
  const [linkLink, setLinkLink] = useState()
  const [smsLink, setSmsLink] = useState()
  const [mailToLink, setMailToLink] = useState()
  const [wifiLink, setWifiLink] = useState()
  const [callLink, setCallLink] = useState()
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (selectedType === 'link') {
      onChange(isValid, selectedType, link, linkLink)
    } else if (selectedType === 'email') {
      onChange(isValid, selectedType, mailTo, mailToLink)
    } else if (selectedType === 'wifi') {
      onChange(isValid, selectedType, wifi, wifiLink)
    } else if (selectedType === 'call') {
      onChange(isValid, selectedType, call, callLink)
    } else if (selectedType === 'sms') {
      onChange(isValid, selectedType, sms, smsLink)
    }
  }, [onChange, isValid, selectedType, mailTo, mailToLink, link, linkLink, wifi, call, sms, smsLink, wifiLink, callLink])

  const typeButtonStyles = (type) => {
    let styles = "flex items-center"

    if (selectedType === type) {
      styles += " font-semibold text-gray-900"
    } else {
      styles += " text-gray-500"
    }

    return styles
  }

  const changeQrCodeType = (e) => {
    const type = e.currentTarget.value

    setShowValidationErrors(false)
    setSelectedType(type)
  }

  const updateLink = (valid, data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(link)) {
      setLink(data)
    }
    if (uri !== linkLink) {
      setLinkLink(uri)
    }

    setIsValid(valid)
  }

  const updateMailTo = (valid, data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(mailTo)) {
      setMailTo(data)
    }
    if (uri !== mailToLink) {
      setMailToLink(uri)
    }

    setIsValid(valid)
  }

  const updateWifi = (valid, data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(wifi)) {
      setWifi(data)
    }
    if (uri !== wifiLink) {
      setWifiLink(uri)
    }

    setIsValid(valid)
  }

  const updateCall = (valid, data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(call)) {
      setCall(data)
    }
    if (uri !== callLink) {
      setCallLink(uri)
    }

    setIsValid(valid)
  }

  const updateSms = (valid, data, uri) => {
    if (JSON.stringify(data) !== JSON.stringify(sms)) {
      setSms(data)
    }
    if (uri !== smsLink) {
      setSmsLink(uri)
    }

    setIsValid(valid)
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
            <LinkInput
              onChange={updateLink}
              data={link}
              showValidationErrors={showValidationErrors}
            />
          )
        }

        {
          selectedType === 'email' && (
            <MailToInput
              onChange={updateMailTo}
              data={mailTo}
              showValidationErrors={showValidationErrors}
            />
          )
        }

        {
          selectedType === 'wifi' && (
            <WiFiInput
              onChange={updateWifi}
              data={wifi}
              showValidationErrors={showValidationErrors}
            />
          )
        }

        {
          selectedType === 'call' && (
            <PhoneNumberInput
              onChange={updateCall}
              data={call}
              showValidationErrors={showValidationErrors}
            />
          )
        }

        {
          selectedType === 'sms' && (
            <SmsInput
              onChange={updateSms}
              data={sms}
              showValidationErrors={showValidationErrors}
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