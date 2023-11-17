import LoggedInHeader from "../components/LoggedInHeader"
import Card from "../components/Card"
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline'

export default async function Dashboard() {
  const openQrModal = () => {
    console.log('h')
    const event = new CustomEvent('openQrModal', { detail: {} })
    document.dispatchEvent(event)
  }

  // TODO get qrs from db
  const qrs = []

  return (
    <div className="bg-white h-full min-h-screen ">
      <LoggedInHeader />

      <div className="max-w-6xl m-auto">
        {qrs.length === 0 ? (
          <div className="w-full">
            <div className="flex justify-center mt-4">
              <p className="block mx-auto">You don&apos;t have any QR codes yet, click the button below to create one!</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="button"
                className="mr-4 inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusIcon className="h-5 w-5"/> New QR Code
              </button>
            </div>
          </div>
        ) : (
          <div>

          </div>
        )}
      </div>
    </div>
  )
}