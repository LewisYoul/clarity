"use client";

import { useCallback, useEffect, useState } from "react";
import QrCode from "./QrCode";
import { PlusIcon  } from '@heroicons/react/24/outline'
import { showToast } from "../utils/toastUtils";
import debounce from 'debounce';

export default function QrCodeList() {
  const [qrs, setQrs] = useState(null);
  const [searchTerm, setSearchTerm] = useState(null);
  const [sortBy, setSortBy] = useState('newestToOldest');
  
  const fetchQrCodes = useCallback(async () => {
    const url = searchTerm ? `/api/qrCodes?sortBy=${sortBy}&searchTerm=${searchTerm}` : `/api/qrCodes?sortBy=${sortBy}`

    try {
      const res = await fetch(url)

      if (!res.ok) throw new Error()

      const json = await res.json()
  
      setQrs(json.data)
    } catch (error) {
      console.error(error)

      showToast('There was a problem loading your QR codes. If the problem persists please contact us.')
    }
  }, [searchTerm, sortBy])

  useEffect(() => {
    fetchQrCodes()
  }, [fetchQrCodes])

  useEffect(() => {
    document.addEventListener('triggerQrCodeFetch', () => { fetchQrCodes() })
  }, [fetchQrCodes])

  const handleSearchChange = debounce(async (e) => {
    let searchTerm = e.target.value.toLowerCase()
    
    if (searchTerm === '') {
      searchTerm = null
    }

    setSearchTerm(searchTerm)
  }, 300)

  const handleSortChange = async (e) => {
    console.log(e.target.value)

    setSortBy(e.target.value)
  }

  if (qrs === null || qrs === undefined) return (
    <div>Loading...</div>
  )

  return(
    <div className="pb-4">
      <div className="mb-6 flex justify-between h-full border rounded-md border border-1 bg-slate-50 border-slate-200 p-4 mx-4 lg:mx-0">
        <input placeholder="Search QR codes" onChange={handleSearchChange} className="block w-full lg:w-60 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palqrblue sm:text-sm sm:leading-6" type="text"></input>
        
        <div className="items-center text-sm hidden md:flex">
          <select className="bg-slate-50" defaultValue="newestToOldest" onChange={handleSortChange}>
            <option value="newestToOldest">Newest</option>
            <option value="oldestToNewest">Oldest</option>
          </select>
        </div>
      </div>
      {
        qrs.length === 0 ? (
          <div className="w-full px-8 pt-10">
            <div className="flex justify-center text-center mt-4">
              <p className="block mx-auto text-gray-500">We couldn&apos;t find any QR codes, click the button below to create one!</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="mr-4 inline-flex rounded-md bg-palqrblue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5"/> New QR Code
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-4 lg:mx-0">
            {qrs.map((qr) => (
              <QrCode qr={qr} key={`qr-${qr.id}`} />
            ))}
          </div>
        )
      }
    </div>
  )
}