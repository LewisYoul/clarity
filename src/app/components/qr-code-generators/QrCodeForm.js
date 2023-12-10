"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import { RadioGroup } from '@headlessui/react'
import FileInput from "../form/FileInput";

const dotTypes = [
  {
    name: 'Rounded',
    value: 'rounded'
  },
  {
    name: 'Square',
    value: 'square'
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
    name: 'Dot',
    value: 'dot'
  },
  {
    name: 'Square',
    value: 'square'
  },
  {
    name: 'Rounded',
    value: 'extra-rounded'
  }
]

export default function QrCodeForm({ onChange }) {
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[1])
  const [selectedEyeType, setSelectedEyeType] = useState(eyeTypes[1])
  const [logoPath, setLogoPath] = useState(null)
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
      type: selectedDotType.value
    },
    cornersSquareOptions: {
      type: selectedEyeType.value
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
          type: selectedDotType.value
        },
        cornersSquareOptions: {
          type: selectedEyeType.value
        },
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 5,
          imageSize: 0.5,
        }
      })
    }

    generateQrCode()
  }, [selectedDotType, selectedEyeType, logoPath, link])


  const downloadQrCode = (extension) => {
    qrCode.download({
      extension: extension
    })
  }

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
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
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
        Eyes
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