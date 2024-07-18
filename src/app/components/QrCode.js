import { ChatBubbleLeftIcon, ArrowDownTrayIcon, EllipsisVerticalIcon, EnvelopeIcon, LinkIcon, WifiIcon, PhoneIcon  } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRef, useContext } from 'react';
import { showToast } from '@/app/utils/toastUtils';
import Popover from './Popover';
import { ModalContext } from "../contexts/modalContext"
import EditQrCode from './EditQrCode';
import QrCodeDecorator from '../decorators/qrCodeDecorator';

const QrCode = (props) => {
  const { setModalContent } = useContext(ModalContext)

  const { qr } = props;
  const qrCodeDecorator = new QrCodeDecorator(qr)

  const typeForDisplay = () => {
    if (qr.type === 'link') {
      return <LinkIcon className="w-4 h-4" />
    }

    if (qr.type === 'email') {
      return <EnvelopeIcon className="w-4 h-4" />
    }
    
    if (qr.type === 'wifi') {
      return <WifiIcon className="w-4 h-4" />
    }    
    
    if (qr.type === 'call') {
      return <PhoneIcon className="w-4 h-4" />
    }

    if (qr.type === 'sms') {
      return <ChatBubbleLeftIcon className="w-4 h-4" />
    }    
  }

  const triggerQrCodeFetch = () => {
    const event = new CustomEvent('triggerQrCodeFetch', { detail: {} })

    document.dispatchEvent(event)
  }

  const deleteQrCode = async () => {
    if (confirm('Are you sure you want to delete this QR code? This action cannot be undone.')){
      try {
        const res = await fetch(`/api/qrCodes?id=${qr.id}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error('There was a problem deleting your QR code. If this problem continues please contact us.')

        const data = await res.json();

        triggerQrCodeFetch()
        showToast(data.message)
      } catch (error) {
        console.error(error)

        showToast(error.message)
      }
    }
  }

  let popoverItems = [
    {
      label: 'Delete',
      onClick: deleteQrCode,
      color: 'red'
    },
  ]

  if (qr.dynamicLinkUid) {
    popoverItems.unshift({
      label: 'Edit',
      onClick: () => {
        console.log('Edit')
        setModalContent(<EditQrCode qrCode={qr} />)
      }
    })

    popoverItems.push({
      label: 'Link',
      onClick: () => {
        let link = `palqr.com/s/${qr.dynamicLinkUid}`

        if (process.env.NODE_ENV === 'development') {
            link = `https://610f-2a00-23c8-778b-3d01-d84f-3797-44ac-6f4f.ngrok-free.app/s/${qr.dynamicLinkUid}`
        }

        navigator.clipboard.writeText(link)
          .then(() => showToast('Short link copied to clipboard!'))
          .catch(err => showToast('Failed to copy short link: ' + err.message));
      }
    })
  }

  return (
    <div className="border rounded-md bg-slate-50 relative shadow-md">
      <Popover items={popoverItems}/>
      {/* <div onClick={toggleOptionsPopover} className="absolute top-2 right-2 cursor-pointer">
        <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />

        <div ref={popoverRef} className={`${visibilityClass} absolute top-6 right-0 bg-white z-50 rounded-md border`}>
          <div className="h-full w-full relative divide-y divide-gray-500/10">
            <div className="flow-root">
              <div>
                <button
                  onClick={deleteQrCode}
                  className="block rounded-lg px-3 py-1.5 text-sm leading-7 text-red-400 hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <span className="absolute -top-2 -left-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        {typeForDisplay()}
      </span>
      <div className="flex justify-center">
        <div className="mt-4">
          <div className="mb-3 flex justify-center w-40">
            <p className="max-w-full text-sm truncate">{qrCodeDecorator.title()}</p>
          </div>
          <div className="bg-white h-40 w-40">
            <img src={qr.svgFile.url}></img>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-3 flex justify-center">
          <span className="text-xs ml-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">{qr.dynamicLinkUid ? `${qr.scans.length} ${qr.scans.length === 1 ? 'scan' : 'scans'}` : 'static'}</span>
        </div>
        <div className="mt-2 mb-3 flex justify-center">
          <p className="max-w-full text-xs text-gray-400">Updated {new Date(qr.createdAt).toLocaleString('en-US', { year:"numeric", month:"short", day:"numeric", hour: '2-digit', minute:'2-digit', hour12: false })}</p>
        </div>
      </div>
      <div className="mt-5 flex text-sm border-t">
        <Link href={qr.pngFile.url} target="_blank" rel="noopener noreferrer" locale={false} download="file.png" className="flex-1 justify-center py-4 inline-flex items-center border-r border-l pr-3 pl-3">
          <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> PNG
        </Link>
        <Link href={qr.svgFile.url} target="_blank" rel="noopener noreferrer" locale={false} download="file.png" className="flex-1 justify-center py-4 inline-flex items-center border-r border-l pr-3 pl-3">
          <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> SVG
        </Link>
      </div>
    </div>
  );
};

export default QrCode;

