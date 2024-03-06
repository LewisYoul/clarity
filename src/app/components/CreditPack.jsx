"use client";

export default function CreditPack({ packType, numberOfQrCodes, price}) {
  const beginPuchaseFlow = async () => {
    console.log('PACKTYPE', packType)
    // const res = await fetch('/api/credits', {
    //   method: 'POST',
    //   body: formData,
    // })
  }

  return(
    <div onClick={beginPuchaseFlow} className="pb-2 mt-2">
      <div className="border rounded-md hover:border-black hover:cursor-pointer mx-10 px-8 py-4">
        <h1 className="text-l mb-4">{numberOfQrCodes} QR Code{numberOfQrCodes === 1 ? '' : 's'}</h1>
        <p className="inline-flex items-center"><span className="font-bold text-3xl">${price}</span></p>
      </div>
    </div>
  )
}