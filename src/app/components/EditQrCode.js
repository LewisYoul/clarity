import QrCodeDecorator from "../decorators/QrCodeDecorator";
import QrCodeTypeFormGroup from "./form/form-groups/QrCodeTypeFormGroup";
import { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";


const EditQrCode = ({ qrCode }) => {
  const [qrCodeDecorator, setQrCodeDecorator] = useState(new QrCodeDecorator(qrCode))
  const [isValid, setIsValid] = useState(false)
  const [uri, setUri] = useState(qrCode.link)
  const [type, setType] = useState(qrCode.type)
  const [data, setData] = useState(qrCode.data)
  const [showSavedChangesMessage, setShowSavedChangesMessage] = useState(false)
  const [showValidationErrors, setShowValidationErrors] = useState(false)

  useEffect(() => {
    setQrCodeDecorator(new QrCodeDecorator(qrCode))
  }, [qrCode])

  const triggerQrCodeFetch = () => {
    const event = new CustomEvent('triggerQrCodeFetch', { detail: {} })

    document.dispatchEvent(event)
  }

  const validateQrCode = () => {
    console.log('isValid', isValid)

    if (!isValid) {
      setShowValidationErrors(true)
    } else {
      setShowValidationErrors(false)
      saveQrCode()
    }
  }

  const saveQrCode = async () => {
    try {
      const res = await fetch(`/api/qrCodes?id=${qrCode.id}`, {
        method: 'PUT',
        body: JSON.stringify({ type, data, link: uri }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await res.json()

      setQrCodeDecorator(new QrCodeDecorator(json.qrCode))

      triggerQrCodeFetch()
      setShowSavedChangesMessage(true)
      setTimeout(() => {
        setShowSavedChangesMessage(false)
      }, 2000)
    } catch (error) {
      console.error('Error updating QR code:', error)
    }
  }

  const storeQrCodeChanges = (isValid, type, data, uri) => {
    setIsValid(isValid)
    setType(type)
    setData(data)
    setUri(uri)
  }

  return (
    <div className="w-[860px] h-screen md:h-[860px] md:mt-12 pb-12 rounded-md relative bg-white overflow-scroll">
      <div className="flex justify-center">
        <div className="mt-4">
          <div className="mb-3 flex justify-center w-40">
            <p className="max-w-full text-sm truncate">{qrCodeDecorator.title()}</p>
          </div>
          <div className="bg-white h-40 w-40">
            <img src={qrCode.svgFile.url}></img>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <QrCodeTypeFormGroup
          onChange={storeQrCodeChanges}
          qrCode={qrCode}
          showValidationErrors={showValidationErrors}
          setShowValidationErrors={setShowValidationErrors}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={validateQrCode}
          type="button"
          className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
        >
          Save QR Code
        </button>
      </div>

      {showSavedChangesMessage && (
        <div className="flex justify-center items-center mt-4">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-1" />
          <span className="text-sm text-green-500">Changes saved</span>
        </div>
      )}
    </div>
  );
};

export default EditQrCode;

