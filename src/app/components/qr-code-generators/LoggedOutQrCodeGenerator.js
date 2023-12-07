"use client";

import QRCodeStyling from "qr-code-styling";
import Card from "../Card";
import { useEffect, useRef, useState } from "react";
import { ArrowDownTrayIcon, LinkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { RadioGroup } from '@headlessui/react'

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

export default function QrCodeGenerator() {
  const [selectedDotType, setSelectedDotType] = useState(dotTypes[1])
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
    }
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
  }, [qrCode, qrCodeOptions])

  useEffect(() => {
    const generateQrCode = () => {
      setQrCodeOptions({
        width: 200,
        height: 200,
        data: link,
        margin: 10,
        backgroundOptions: {
          color: 'white',
        },
        dotsOptions: {
          type: selectedDotType.value
        }
      })
    }

    console.log(selectedDotType, link)

    generateQrCode()
  }, [selectedDotType, link])


  const downloadQrCode = (extension) => {
    qrCode.download({
      extension: extension
    })
  }

  const memoryOptions = [
    { name: '4 GB', inStock: true },
    { name: '8 GB', inStock: true },
    { name: '16 GB', inStock: true },
    { name: '32 GB', inStock: true },
    { name: '64 GB', inStock: true },
    { name: '128 GB', inStock: false },
  ]

  const [mem, setMem] = useState(memoryOptions[2])

  return(
    <Card>
      <label htmlFor="link" className="inline-flex items-center text-sm font-medium leading-6 text-gray-900">
        <LinkIcon className="h-3 w-3 mr-1" aria-hidden="true" /> Link
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

      <label htmlFor="link" className="inline-flex items-center text-sm font-medium leading-6 text-gray-900 mt-3">
        <LinkIcon className="h-3 w-3 mr-1" aria-hidden="true" /> Shape & Form
      </label>

      <RadioGroup value={selectedDotType} onChange={setSelectedDotType} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {dotTypes.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) => {
                console.log(active, checked)
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

      <div className="flex justify-center w-full mt-6">
        <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
      </div>

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
    </Card>

  )
}