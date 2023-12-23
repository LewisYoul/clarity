"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";
import Collapse from "../Collapse";
import Radio from "../form/Radio";
import MailToInput from "../form/MailToInput";

const dotTypes = [
  {
    name: 'Square',
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
]

export default function QrCodeForm({ onChange }) {
  const [type, setType] = useState('link')
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

  const ref = useRef(null);
  const defaultOptions = {
    width: 200,
    height: 200,
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

    onChange(qrCode)
  }, [qrCode, qrCodeOptions, onChange])

  useEffect(() => {
    const generateQrCode = () => {
      const opts = {
        width: 200,
        height: 200,
        data: type === 'email' ? mailTo.uri : link,
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
        mailTo: JSON.parse(JSON.stringify(mailTo)),
        type
      }

      setQrCodeOptions(opts)
    }

    generateQrCode()
  }, [type, selectedDotType, selectedEyeType, logoPath, link, selectedInnerEyeType, dotsColor, innerEyeColor, outerEyeColor, mailTo])

  useEffect(() => {

  }, [type])

  const changeQrCodeType = (e) => {
    const type = e.target.value

    console.log(type)

    setType(type)
  }

  return(
    <div>
      <select defaultValue="link" onChange={changeQrCodeType} className="inline-flex items-center text-md font-semibold leading-6 text-gray-900 bg-slate-100">
        <option value="link">Link</option>
        <option value="email">Email</option>
        {/* <option value="pdf">PDF</option> */}
      </select>
      
      {
        type === 'link' && (
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
        type === 'email' && (
          <MailToInput onChange={setMailTo} />
        )
      }

{
        type === 'pdf' && (
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
      </div>
    </div>
  )
}