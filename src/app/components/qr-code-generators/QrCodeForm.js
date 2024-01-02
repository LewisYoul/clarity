"use client";

import QRCodeStyling from "palqr-code";
import { useEffect, useRef, useState } from "react";
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";
import Collapse from "../Collapse";
import Radio from "../form/Radio";
import MailToInput from "../form/MailToInput";
import WiFiInput from "../form/WiFiInput";

const dotTypes = [
  {
    name: 'Original',
    value: 'square'
  },
  {
    name: 'Rounded',
    value: 'rounded'
  },
  {
    name: 'Smooth',
    value: 'extra-rounded'
  },
  {
    name: 'Classy',
    value: 'classy'
  },
  {
    name: 'Diamond',
    value: 'diamond'
  },
  {
    name: 'Square',
    value: 'small-square'
  },
  {
    name: 'Calligraphy',
    value: 'classy-rounded'
  }
]

const eyeTypes = [
  {
    name: 'Square',
    value: 'square'
  },
  {
    name: 'Circle',
    value: 'dot'
  },
  {
    name: 'Rounded',
    value: 'extra-rounded'
  },
  {
    name: 'Outpoint',
    value: 'outpoint'
  }
]

const innerEyeTypes = [
  {
    name: 'Square',
    value: 'square'
  },
  {
    name: 'Dot',
    value: 'dot'
  },
  {
    name: 'Outpoint',
    value: 'outpoint'
  }
]

export default function QrCodeForm({ onChange }) {
  const [selectedType, setSelectedType] = useState('link')
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[0])
  const [selectedEyeType, setSelectedEyeType] = useState(eyeTypes[0])
  const [selectedInnerEyeType, setSelectedInnerEyeType] = useState(innerEyeTypes[0])
  const [logoPath, setLogoPath] = useState(null)
  const [dotsColor, setDotsColor] = useState("#000000")
  const [innerEyeColor, setInnerEyeColor] = useState("#000000")
  const [outerEyeColor, setOuterEyeColor] = useState("#000000")
  const [link, setLink] = useState('https://example.com')
  const [mailTo, setMailTo] = useState({
    uri: '',
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
  // const [svgUrl, setSvgUrl] = useState(null)

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
  // const [optionsToEmit, setOptionsToEmit] = useState(qrCodeOptions)

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
    const dataForType = () => {
      switch (selectedType) {
        case 'email':
          return mailTo.uri
        case 'wifi':
          return wifi.data
        default:
          return link
      }
    } 

    const generateQrCode = () => {
      const opts = {
        type: 'svg',
        width: 1000,
        height: 1000,
        data: dataForType(),
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
        selectedType,
      }

      setQrCodeOptions(opts)
    }

    generateQrCode()
  }, [selectedType, selectedDotType, selectedEyeType, logoPath, link, selectedInnerEyeType, dotsColor, innerEyeColor, outerEyeColor, mailTo, wifi])

  const changeQrCodeType = (e) => {
    const type = e.target.value

    setSelectedType(type)
  }

  return(
    <div>
      <select defaultValue="link" onChange={changeQrCodeType} className="inline-flex items-center text-md font-semibold leading-6 text-gray-900 bg-slate-100">
        <option value="link">Link</option>
        <option value="email">Email</option>
        <option value="wifi">WiFi</option>
        {/* <option value="pdf">PDF</option> */}
      </select>
      
      {
        selectedType === 'link' && (
          <div className="mt-2">
            <input
              onChange={(e) => setLink(e.target.value)}
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

      <Collapse title="Shape & Form">
        <label className="block text-sm font-medium text-gray-900 mt-3">
          Dots
        </label>

        <Radio value={selectedDotType} options={dotTypes} onChange={setSelectedDotType} />

        <label className="block text-sm font-medium text-gray-900 mt-3">
          Inner Eyes
        </label>

        <Radio value={selectedInnerEyeType} options={innerEyeTypes} onChange={setSelectedInnerEyeType} />

        <label className="block text-sm font-medium text-gray-900 mt-3">
          Outer Eyes
        </label>

        <Radio value={selectedEyeType} options={eyeTypes} onChange={setSelectedEyeType} />
      </Collapse>

      <Collapse title="Color">
        <label className="block text-sm font-medium text-gray-900 mt-3">
          Dots
        </label>

        <ColorInput onChange={setDotsColor} />

        <label className="block text-sm font-medium text-gray-900 mt-3">
          Inner Eyes
        </label>

        <ColorInput onChange={setInnerEyeColor} />

        <label className="block text-sm font-medium text-gray-900 mt-3">
          Outer Eyes
        </label>

        <ColorInput onChange={setOuterEyeColor} />
      </Collapse>

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

      <div className="flex justify-center w-full mt-6">
        <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
        {/* <img width="1000" height="1000" src={svgUrl} /> */}
      </div>
    </div>
  )
}