import { ArrowDownTrayIcon, PencilIcon, PlusIcon  } from '@heroicons/react/24/outline'

const QrCode = (props) => {
  const { qr } = props;

  return (
    <div className="border rounded-md bg-slate-50 relative shadow-md">
      <span className="absolute -top-2 -right-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
        Static
      </span>
      <div className="flex justify-center">
        <div className="mt-4">
          <div className="bg-white h-40 w-40">
            <img src={qr.svgFile.url}></img>
          </div>
          <div className="mt-3 flex justify-center w-40">
            <p className="max-w-full text-sm truncate">{qr.link}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex text-sm border-t">
        <button className="flex-1 justify-center py-4 inline-flex items-center ml-1">
          <PencilIcon className="mr-1 h-4 w-4" aria-hidden="true" /> Edit
        </button>
        <button className="flex-1 justify-center py-4 inline-flex items-center border-r border-l pr-3 pl-3">
          <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> PNG
        </button>
        <button className="flex-1 justify-center py-4 inline-flex items-center mr-1">
          <ArrowDownTrayIcon className="mr-1 h-4 w-4" aria-hidden="true" /> SVG
        </button>
      </div>
    </div>
  );
};

export default QrCode;

