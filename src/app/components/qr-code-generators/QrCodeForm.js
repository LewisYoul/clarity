"use client";

import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef, useState } from "react";
import FileInput from "../form/FileInput";
import ColorInput from "../form/ColorInput";
import Collapse from "../Collapse";
import Radio from "../form/Radio";

export default function QrCodeForm({ onChange }) {
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
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
          placeholder="https://example.com"
          autoFocus
        />
      </div>

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
        <FileInput onChange={setLogoPath} />
      </div>

      <div className="flex justify-center w-full mt-6">
        <div className="p-1 rounded-md bg-white border border-2" ref={ref}></div>
      </div>
    </div>
  )
}