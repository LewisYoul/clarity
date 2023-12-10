"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { RadioGroup } from '@headlessui/react'
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";

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
// 'dot' 'square'
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
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[0])
  const [selectedEyeType, setSelectedEyeType] = useState(eyeTypes[0])
  const [selectedInnerEyeType, setSelectedInnerEyeType] = useState(innerEyeTypes[0])
  const [logoPath, setLogoPath] = useState(null)
  const [dotsColor, setDotsColor] = useState("#000000")
  const [innerEyeColor, setInnerEyeColor] = useState("#000000")
  const [outerEyeColor, setOuterEyeColor] = useState("#000000")
  const [link, setLink] = useState('https://example.com')

  const ref = useRef(null);

  const [qrCodeOptions, setQrCodeOptions] = useState({
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
  });

  const [qrCode] = useState(new QRCodeStyling(qrCodeOptions));

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

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
      setQrCodeOptions({
        width: 200,
        height: 200,
        data: link,
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
        }
      })
    }

    generateQrCode()
  }, [selectedDotType, selectedEyeType, logoPath, link, selectedInnerEyeType, dotsColor, innerEyeColor, outerEyeColor])

  return(
    <div>
      <label htmlFor="link" className="inline-flex items-center text-md font-semibold leading-6 text-gray-900">
        Destination
      </label>
      <div className="mt-2">
        <input
          onChange={(e) => setLink(e.target.value)}
          type="text"
          name="link"
          id="link"
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
        />
      </div>

      <label htmlFor="link" className="inline-flex items-center text-md font-semibold leading-6 text-gray-900 mt-5">
        Shape & Form
      </label>

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Dots
      </label>

      <RadioGroup value={selectedDotType} onChange={setSelectedDotType} className="mt-2">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {dotTypes.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) => {
                return classNames('cursor-pointer bg-white',
                  checked
                    ? 'ring-2 ring-palqrblue ring-offset-2'
                    : 'ring-1 ring-inset ring-gray-300 text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md px-2 py-1 text-sm sm:flex-1'
                )}
              }
              disabled={false}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Inner Eyes
      </label>

      <RadioGroup value={selectedInnerEyeType} onChange={setSelectedInnerEyeType} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {innerEyeTypes.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) => {
                return classNames('cursor-pointer bg-white',
                  checked
                    ? 'ring-2 ring-palqrblue ring-offset-2'
                    : 'ring-1 ring-inset ring-gray-300 text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md px-2 py-1 text-sm sm:flex-1'
                )}
              }
              disabled={false}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Outer Eyes
      </label>

      <RadioGroup value={selectedEyeType} onChange={setSelectedEyeType} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {eyeTypes.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) => {
                return classNames('cursor-pointer bg-white',
                  checked
                    ? 'ring-2 ring-palqrblue ring-offset-2'
                    : 'ring-1 ring-inset ring-gray-300 text-gray-900 hover:bg-gray-50',
                  'flex items-center justify-center rounded-md px-2 py-1 text-sm sm:flex-1'
                )}
              }
              disabled={false}
            >
              <RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <label htmlFor="link" className="inline-flex items-center text-md font-semibold leading-6 text-gray-900 mt-5">
        Color
      </label>

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Dots
      </label>

      <ColorInput onChange={setDotsColor} />

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Inner Eyes
      </label>

      <ColorInput onChange={setInnerEyeColor} />

      <label htmlFor="link" className="block text-sm font-medium text-gray-900 mt-3">
        Outer Eyes
      </label>

      <ColorInput onChange={setOuterEyeColor} />

      <label htmlFor="link" className="block text-md font-semibold leading-6 text-gray-900 mt-5">
        Logo
      </label>

      <div className="mt-2">
        <FileInput onChange={setLogoPath} />
      </div>

      <div className="flex justify-center w-full mt-6">
        <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
      </div>
    </div>

  )
}