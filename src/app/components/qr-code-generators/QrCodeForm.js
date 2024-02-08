"use client";

import QRCodeStyling from "palqr-code";
import { useEffect, useRef, useState } from "react";
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";
import Radio from "../form/Radio";
import MailToInput from "../form/MailToInput";
import WiFiInput from "../form/WiFiInput";
import PhoneNumberInput from "../form/PhoneNumberInput"
import { GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftIcon, EnvelopeIcon, DocumentIcon, WifiIcon, PhoneIcon, CreditCardIcon  } from '@heroicons/react/24/outline'
import SmsInput from "../form/SmsInput";
import { Switch } from '@headlessui/react'
import crypto from 'crypto'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const dotTypes = [
  {
    name: 'Original',
    value: 'square',
    icon: '/dots/Square.svg'
  },
  {
    name: 'Rounded',
    value: 'rounded',
    icon: '/dots/Rounded.svg'
  },
  // {
  //   name: 'Smooth',
  //   value: 'extra-rounded',
  //   icon: '/dots/Rounded.svg'
  // },
  // {
  //   name: 'Classy',
  //   value: 'classy',
  //   icon: '/dots/Smooth.svg'
  // },
  {
    name: 'Diamond',
    value: 'diamond',
    icon: '/dots/Diamond.svg'
  },
  {
    name: 'Square',
    value: 'small-square',
    icon: '/dots/SmallSquare.svg'
  },
  // {
  //   name: 'Calligraphy',
  //   value: 'classy-rounded',
  //   icon: '/dots/Smooth.svg'
  // }
]

const eyeTypes = [
  {
    name: 'Square',
    value: 'square',
    icon: "/outerEyes/Square.png"
  },
  {
    name: 'Circle',
    value: 'dot',
    icon: "/outerEyes/Circle.png"
  },
  {
    name: 'Rounded',
    value: 'extra-rounded',
    icon: "/outerEyes/Rounded.png"
  },
  {
    name: 'Outpoint',
    value: 'outpoint',
    icon: "/outerEyes/Outpoint.png"
  }
]

const innerEyeTypes = [
  {
    name: 'Square',
    value: 'square',
    icon: "/innerEyes/Square.svg"
  },
  {
    name: 'Dot',
    value: 'dot',
    icon: "/innerEyes/Circle.svg"
  },
  {
    name: 'Inpoint',
    value: 'inpoint',
    icon: "/innerEyes/Inpoint.svg"
  },
  {
    name: 'Outpoint',
    value: 'outpoint',
    icon: "/innerEyes/Outpoint.svg"
  },
]

export default function QrCodeForm({ onChange, actionElement }) {
  const [selectedType, setSelectedType] = useState('link')
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[0])
  const [selectedEyeType, setSelectedEyeType] = useState(eyeTypes[0])
  const [selectedInnerEyeType, setSelectedInnerEyeType] = useState(innerEyeTypes[0])
  const [logoPath, setLogoPath] = useState(null)
  const [dotsColor, setDotsColor] = useState("#000000")
  const [innerEyeColor, setInnerEyeColor] = useState("#000000")
  const [outerEyeColor, setOuterEyeColor] = useState("#000000")
  const [isDynamic, setIsDynamic] = useState(false)
  const [dynamicLinkUid, setDynamicLinkUid] = useState(null)
  const [link, setLink] = useState('https://example.com')
  const [mailTo, setMailTo] = useState({
    uri: 'mailto:?cc=&bcc=&subject=&body=',
    values: {
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: ''
    }
  })
  const [wifi, setWifi] = useState({
    data: '',
    values: {
      encryptionType: 'wpa',
      ssid: '',
      password: ''
    }
  })
  const [call, setCall] = useState({
    uri: 'tel:',
    values: {
      phoneNumber: ''
    }
  })
  const [sms, setSms] = useState({
    uri: 'sms:',
    values: {
      smsNumber: ''
    }
  })

  const ref = useRef(null);
  const defaultOptions = {
    type: 'svg',
    width: 1000,
    height: 1000,
    margin: 10,
    data: link,
    backgroundOptions: {
      color: 'white',
    },
    dotsOptions: {
      color: dotsColor,
      type: selectedDotType.value
    },
    cornersSquareOptions: {
      color: outerEyeColor,
      type: selectedEyeType.value
    },
    cornersDotOptions: {
      color: innerEyeColor,
      type: selectedInnerEyeType.value
    },
  }

  const [qrCodeOptions, setQrCodeOptions] = useState(defaultOptions);

  const [qrCode] = useState(new QRCodeStyling(qrCodeOptions));

  useEffect(() => {
    if (ref.current) {
      qrCode.append(ref.current);
    }
  }, [qrCode, ref]);

  useEffect(() => {
    qrCode.update(qrCodeOptions);

    if (qrCode?._svg?._element) {
      qrCode._svg._element.setAttribute('width', '200')
      qrCode._svg._element.setAttribute('height', '200')
      qrCode._svg._element.setAttribute('viewBox', '0 0 1000 1000')
    }

    onChange(qrCode)
  }, [qrCode, qrCodeOptions, onChange])

  useEffect(() => {
    if (isDynamic) {
      setDynamicLinkUid(crypto.randomBytes(20).toString('hex'));
    } else {
      setDynamicLinkUid(null);
    }
  }, [isDynamic])

  useEffect(() => {
    const destinationForType = () => {
      switch (selectedType) {
        case 'email':
          return mailTo.uri
        case 'wifi':
          return wifi.data
        case 'call':
          return call.uri
        case 'sms':
          return sms.uri
        default:
          return link
      }
    }

    const data = () => {
      if (dynamicLinkUid) {
        switch (process.env.NODE_ENV) {
          case 'development':
            return `https://c667-2a00-23c8-778b-3d01-1517-7915-8184-6dc5.ngrok-free.app/scan/${dynamicLinkUid}`
          case 'production':
            return `https://palqr.com/scan/${dynamicLinkUid}`
        }
      }

      return destinationForType()
    } 

    const generateQrCode = () => {
      const opts = {
        type: 'svg',
        width: 1000,
        height: 1000,
        data: data(),
        margin: 10,
        image: logoPath,
        backgroundOptions: {
          color: 'white',
        },
        dotsOptions: {
          color: dotsColor,
          type: selectedDotType.value
        },
        cornersSquareOptions: {
          color: outerEyeColor,
          type: selectedEyeType.value
        },
        cornersDotOptions: {
          color: innerEyeColor,
          type: selectedInnerEyeType.value
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: 0.5,
        },
        mailTo: mailTo,
        wifi: wifi,
        call: call,
        sms: sms,
        selectedType,
        dynamicLinkUid,
        scanDestination: destinationForType()
      }

      setQrCodeOptions(opts)
    }

    generateQrCode()
  }, [selectedType, selectedDotType, selectedEyeType, logoPath, link, selectedInnerEyeType, dotsColor, innerEyeColor, outerEyeColor, mailTo, wifi, call, sms, dynamicLinkUid])

  const changeQrCodeType = (e) => {
    console.log(e.currentTarget.value)
    const type = e.currentTarget.value

    setSelectedType(type)
  }

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

    setLink(linkToFormat)
  }

  return(
    <div className="flex flex-col justify-between md:flex-row">
      <div className="md:mr-6">
      <div className="grid grid-cols-4 gap-4">
        <button onClick={changeQrCodeType} className={typeButtonStyles('link')} value="link"><GlobeAltIcon className="w-4 h-4 mr-2" /> URL</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('email')} value="email"><EnvelopeIcon className="w-4 h-4 mr-2" /> Email</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('wifi')} value="wifi"><WifiIcon className="w-4 h-4 mr-2" /> WiFi</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('call')} value="call"><PhoneIcon className="w-4 h-4 mr-2" /> Phone</button>
        <button onClick={changeQrCodeType} className={typeButtonStyles('sms')} value="sms"><ChatBubbleLeftIcon className="w-4 h-4 mr-2" /> SMS</button>
        {/* Not available yet */}
        <button className={typeButtonStyles('text')}><DocumentTextIcon className="w-4 h-4 mr-2" /> Text</button>
        <button className={typeButtonStyles('pdf')}><DocumentIcon className="w-4 h-4 mr-2" /> PDF</button>
        <button className={typeButtonStyles('vcard')}><CreditCardIcon className="w-4 h-4 mr-2" /> vCard</button>
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
              />
            </div>
          )
        }

        {
          selectedType === 'email' && (
            <MailToInput onChange={setMailTo} />
          )
        }

        {
          selectedType === 'wifi' && (
            <WiFiInput onChange={setWifi} />
          )
        }

        {
          selectedType === 'call' && (
            <PhoneNumberInput onChange={setCall} />
          )
        }

        {
          selectedType === 'sms' && (
            <SmsInput onChange={setSms} />
          )
        }

        {
          selectedType === 'pdf' && (
            <div className="mt-2">
              <FileInput
                accept={['application/pdf']}
                buttonText="Upload a PDF"
                onChange={() => {}}
              />
            </div>
          )
        }

        <div className="mt-5 flex items-center">
          <Switch
            checked={isDynamic}
            onChange={setIsDynamic}
            className={classNames(
              isDynamic ? 'bg-palqrblue' : 'bg-white',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-palqrblue focus:ring-offset-2'
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                isDynamic ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-gray-200 shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
          <span className="ml-2 text-sm font-medium text-gray-900">Dynamic - <span className="font-normal"> enable destination editing</span></span>
        </div>

        <p className="text-md font-semibold pt-5">Shape, Form & Color</p>

        <p className="mt-2">Dots</p>

        <div className="flex md:items-center flex-col md:flex-row">
          <ColorInput onChange={setDotsColor} />

          <Radio className="mt-2 md:mt-0 md:ml-4" value={selectedDotType} options={dotTypes} onChange={setSelectedDotType} />
          {/* <div className="grid grid-cols-6 gap-3 ml-2">
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
            <div className="rounded-md border border-gray-200 bg-white h-[46px] w-[46px]"></div>
          </div> */}
        </div>

        <p className="mt-2">Inner Eyes</p>

        <div className="flex md:items-center flex-col md:flex-row">
          <ColorInput onChange={setInnerEyeColor} />

          <Radio className="mt-2 md:mt-0 md:ml-4" value={selectedInnerEyeType} options={innerEyeTypes} onChange={setSelectedInnerEyeType} />
        </div>

        <p className="mt-2">Outer Eyes</p>

        <div className="flex items-center">
          <ColorInput onChange={setOuterEyeColor} />

          <Radio className="ml-4" value={selectedEyeType} options={eyeTypes} onChange={setSelectedEyeType} />
        </div>

        <label className="block text-md font-semibold leading-6 text-gray-900 mt-5">
          Logo
        </label>

        <div className="mt-2">
          <FileInput
            accept={['image/png', 'image/jpeg']}
            buttonText="Upload a logo"
            onChange={setLogoPath}
          />
        </div>
      </div>

      <div className="flex mt-6 md:mt-0">
        <div className="flex justify-center items-center flex-col w-[460px] h-[460px] pt-6 pb-6 bg-pink-100 rounded-3xl md:rounded-full">
          <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
          {/* <img width="1000" height="1000" src={svgUrl} /> */}
          {actionElement ? actionElement : null}
        </div>
      </div>

    </div>
  )
}