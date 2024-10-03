"use client";

import QRCodeStyling from "palqr-code";
import { useEffect, useRef, useState, useContext } from "react";
import { CreditsContext } from "../../contexts/creditsContext";
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";
import Radio from "../form/Radio";
import MailToInput from "../form/MailToInput";
import WiFiInput from "../form/WiFiInput";
import PhoneNumberInput from "../form/PhoneNumberInput"
import { GlobeAltIcon, DocumentTextIcon, ChatBubbleLeftIcon, EnvelopeIcon, DocumentIcon, WifiIcon, PhoneIcon, CreditCardIcon  } from '@heroicons/react/24/outline'
import { Switch } from '@headlessui/react'
import crypto from 'crypto'
import QrCodeTypeFormGroup from "../form/form-groups/QrCodeTypeFormGroup";
import { showToast } from "../../utils/toastUtils";
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'

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

export default function QrCodeForm({ permitDynamic }) {
  const [showValidationErrors, setShowValidationErrors] = useState(false)
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[0])
  const [selectedEyeType, setSelectedEyeType] = useState(eyeTypes[0])
  const [selectedInnerEyeType, setSelectedInnerEyeType] = useState(innerEyeTypes[0])
  const [logoPath, setLogoPath] = useState(null)
  const [dotsColor, setDotsColor] = useState("#000000")
  const [innerEyeColor, setInnerEyeColor] = useState("#000000")
  const [outerEyeColor, setOuterEyeColor] = useState("#000000")
  const [isDynamic, setIsDynamic] = useState(false)
  const [dynamicLinkUid, setDynamicLinkUid] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const ref = useRef(null);

  // Used on loggd out screen
  const downloadQrCode = (extension) => {
    qrCode.download({
      extension: extension
    })
  }

  const { refreshCreditsCount } = useContext(CreditsContext)

  const closeQrModal = () => {
    const event = new CustomEvent('closeQrModal', { detail: {} })

    document.dispatchEvent(event)
  }

  const triggerQrCodeFetch = () => {
    const event = new CustomEvent('triggerQrCodeFetch', { detail: {} })

    document.dispatchEvent(event)
  }

  const createQrCodeForm = async () => {
    const svgBlob = await qrCode.getRawData('svg')
    const pngBlob = await qrCode.getRawData('png')
    const formData = new FormData()
    const opts = qrCode._options
    console.log('opts', opts)

    formData.append('dynamicLinkUid', opts.dynamicLinkUid)
    formData.append('link', opts.scanDestination)
    formData.append('type', opts.selectedType)
    formData.append('svg', svgBlob)
    formData.append('png', pngBlob)

    if (opts.selectedType === 'link') {
      formData.append('link[uri]', opts.qrData.uri)
    }

    if (opts.selectedType === 'email') {
      formData.append('mailTo[to]', opts.qrData.to)
      formData.append('mailTo[cc]', opts.qrData.cc)
      formData.append('mailTo[bcc]', opts.qrData.bcc)
      formData.append('mailTo[subject]', opts.qrData.subject)
      formData.append('mailTo[body]', opts.qrData.body)
    }

    if (opts.selectedType === 'wifi') {
      formData.append('wifi[encryptionType]', opts.qrData.encryptionType)
      formData.append('wifi[ssid]', opts.qrData.ssid)
      formData.append('wifi[password]', opts.qrData.password)
    }

    if (opts.selectedType === 'call') {
      formData.append('call[phoneNumber]', opts.qrData.phoneNumber)
    }

    if (opts.selectedType === 'sms') {
      formData.append('sms[smsNumber]', opts.qrData.smsNumber)
    }

    for (let val of formData.entries()) {
      console.log(val[0]+ ', ' + val[1]); 
    }

    return formData;
  }


  const saveQrCode = async () => {
    if (!isValid) {
      setShowValidationErrors(true)

      return
    }

    setShowValidationErrors(false)

    const formData = await createQrCodeForm()

    try {
      const res = await fetch('/api/qrCodes', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();

      await refreshCreditsCount()

      showToast(data.message)
      triggerQrCodeFetch()
      closeQrModal()
    } catch (error) {
      console.error(error)
    }
  }

  const [uri, setUri] = useState('https://palqr.com')
  const [type, setType] = useState('link')
  const [data, setData] = useState({
    uri: 'https://palqr.com'
  })

  const defaultOptions = {
    type: 'svg',
    width: 1000,
    height: 1000,
    margin: 10,
    data: 'gfdsa',
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
  }, [qrCode, qrCodeOptions])

  useEffect(() => {
    if (isDynamic) {
      setDynamicLinkUid(crypto.randomBytes(8).toString('hex'));
    } else {
      setDynamicLinkUid(null);
    }
  }, [isDynamic])

  useEffect(() => {
    const qrData = () => {
      if (dynamicLinkUid) {
        switch (process.env.NODE_ENV) {
          case 'development':
            return `https://610f-2a00-23c8-778b-3d01-d84f-3797-44ac-6f4f.ngrok-free.app/s/${dynamicLinkUid}`
          case 'production':
            return `palqr.com/s/${dynamicLinkUid}`
        }
      }

      // For qrs with a type of "link" we don't build a uri so if it is empty
      // we need to return something here so that a qr code is rendered to the screen
      return uri || 'https://palqr.com'
    } 

    const generateQrCode = () => {
      const opts = {
        type: 'svg',
        width: 1000,
        height: 1000,
        data: qrData(),
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
        dynamicLinkUid,
        selectedType: type,
        qrData: data,
        scanDestination: uri
      }

      setQrCodeOptions(opts)
    }

    generateQrCode()
  }, [selectedDotType, selectedEyeType, logoPath, selectedInnerEyeType, dotsColor, innerEyeColor, outerEyeColor, dynamicLinkUid, uri, type, data])

  return(
    <div className="flex flex-col justify-between md:flex-row">
      <div className="md:mr-6">
        <QrCodeTypeFormGroup
          onChange={(isValid, type, data, link) => {
            console.log(isValid, type, data, link)

            setIsValid(isValid)
            setUri(link)
            setType(type)
            setData(data)
          }}
          showValidationErrors={showValidationErrors}
          setShowValidationErrors={setShowValidationErrors}
        />

        {permitDynamic && <div className="mt-5 flex items-center">
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
        </div>}

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
          {permitDynamic ? (
            <button
              onClick={saveQrCode}
              type="button"
              className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
            >
              Create QR Code
            </button>
          ) : (
            <div className="flex justify-center w-full mt-6 mb-4">
              <button
                onClick={() => { downloadQrCode('png') }}
                type="button"
                className="mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> PNG
              </button>
              <button
                onClick={() => { downloadQrCode('svg') }}
                type="button"
                className="ml-1 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" /> SVG
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}