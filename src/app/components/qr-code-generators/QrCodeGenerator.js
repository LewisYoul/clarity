"use client";

import Card from "../Card";
import { useState, useContext } from "react";
import { showToast } from "../../utils/toastUtils";
import QrCodeForm from "./QrCodeForm";
import crypto from 'crypto'
import { CreditsContext } from "../../contexts/creditsContext";

export default function QrCodeGenerator() {  
  const [qrCode, setQrCode] = useState()
  const [options, setOptions] = useState()
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

    if (opts.selectedType === 'email') {
      formData.append('mailTo[to]', opts.mailTo.values.to)
      formData.append('mailTo[cc]', opts.mailTo.values.cc)
      formData.append('mailTo[bcc]', opts.mailTo.values.bcc)
      formData.append('mailTo[subject]', opts.mailTo.values.subject)
      formData.append('mailTo[body]', opts.mailTo.values.body)
    }

    if (opts.selectedType === 'wifi') {
      formData.append('wifi[encryptionType]', opts.wifi.values.encryptionType)
      formData.append('wifi[ssid]', opts.wifi.values.ssid)
      formData.append('wifi[password]', opts.wifi.values.password)
    }

    if (opts.selectedType === 'call') {
      formData.append('call[phoneNumber]', opts.call.values.phoneNumber)
    }

    if (opts.selectedType === 'sms') {
      formData.append('sms[smsNumber]', opts.sms.values.smsNumber)
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

      await refreshCreditsCount()

      showToast(data.message)
      triggerQrCodeFetch()
      closeQrModal()
    } catch (error) {
      console.error(error)
    }
  }

  const actionElement = <button
    onClick={saveQrCode}
    type="button"
    className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
  >
    Create QR Code
  </button>

  return(
    <Card>
      <QrCodeForm onChange={setQrCode} actionElement={actionElement}/>
    </Card>
  )
}