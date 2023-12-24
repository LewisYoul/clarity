"use client";

import Card from "../Card";
import { useState } from "react";
import { showToast } from "../../utils/toastUtils";
import QrCodeForm from "./QrCodeForm";

export default function QrCodeGenerator() {  
  const [qrCode, setQrCode] = useState()
  const [options, setOptions] = useState()

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

    formData.append('link', opts.data)
    formData.append('type', opts.type)
    formData.append('svg', svgBlob)
    formData.append('png', pngBlob)

    if (opts.type === 'email') {
      formData.append('mailTo[to]', opts.mailTo.values.to)
      formData.append('mailTo[cc]', opts.mailTo.values.cc)
      formData.append('mailTo[bcc]', opts.mailTo.values.bcc)
      formData.append('mailTo[subject]', opts.mailTo.values.subject)
      formData.append('mailTo[body]', opts.mailTo.values.body)
    }

    if (opts.type === 'wifi') {
      formData.append('wifi[encryptionType]', opts.wifi.values.encryptionType)
      formData.append('wifi[ssid]', opts.wifi.values.ssid)
      formData.append('wifi[password]', opts.wifi.values.password)
    }

    for (let val of formData.entries()) {
      console.log(val[0]+ ', ' + val[1]); 
    }

    return formData;
  }


  const saveQrCode = async () => {
    const formData = await createQrCodeForm()

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
      <QrCodeForm onChange={(qrCode) => {
        console.log('qrCode', qrCode)
        setQrCode(qrCode)
      }} />

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