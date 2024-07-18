import QrCodeDecorator from "../decorators/QrCodeDecorator";
import QrCodeTypeFormGroup from "./form/form-groups/QrCodeTypeFormGroup";
import { useState, useEffect } from "react";


const EditQrCode = ({ qrCode }) => {
  const qrCodeDecorator = new QrCodeDecorator(qrCode)
  const [uri, setUri] = useState(qrCode.link)
  const [type, setType] = useState(qrCode.type)
  const [data, setData] = useState(qrCode.data)

  const saveQrCode = async () => {
    try {
      res = await fetch(`/api/qrCodes?id=${qrCode.id}`, {
        method: 'PUT',
        body: JSON.stringify({ type, data, link: uri }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error) {
      console.error('Error updating QR code:', error)
    }
  }

  const storeQrCodeChanges = (type, data, uri) => {
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
        <QrCodeTypeFormGroup onChange={storeQrCodeChanges} qrCode={qrCode} />
      </div>

      <div className="flex justify-center">
        <button
            onClick={saveQrCode}
          type="button"
          className="mt-6 inline-flex items-center gap-x-1.5 rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
        >
          Save QR Code
        </button>
      </div>
    </div>
  );
};

export default EditQrCode;

