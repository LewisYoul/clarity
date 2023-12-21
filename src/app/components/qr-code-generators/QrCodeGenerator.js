"use client";

import Card from "../Card";
import { useState } from "react";
import { showToast } from "../../utils/toastUtils";
import QrCodeForm from "./QrCodeForm";

export default function QrCodeGenerator() {  
  const [qrCode, setQrCode] = useState()  

  const closeQrModal = () => {
    const event = new CustomEvent('closeQrModal', { detail: {} })

    document.dispatchEvent(event)
  }

  const triggerQrCodeFetch = () => {
    const event = new CustomEvent('triggerQrCodeFetch', { detail: {} })

    document.dispatchEvent(event)
  }


  const saveQrCode = async () => {
    const svgBlob = await qrCode.getRawData('svg')
    const pngBlob = await qrCode.getRawData('png')

    const formData = new FormData()

    formData.append('link', qrCode._options.data)
    formData.append('type', 'link')
    formData.append('svg', svgBlob)
    formData.append('png', pngBlob)

    try {
      const res = await fetch('/api/qrCodes', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json();

      showToast(data.message)
      triggerQrCodeFetch()
      closeQrModal()
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <Card>
      <QrCodeForm onChange={setQrCode} />

      <div className="flex justify-center w-full mt-6 mb-4">
        <button
          onClick={saveQrCode}
          type="button"
          className="mr-1 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
        >
          Save
        </button>
      </div>
    </Card>
  )
}