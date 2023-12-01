import LoggedInHeader from "../components/LoggedInHeader"
import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import dynamic from 'next/dynamic'

const QrCodeList = dynamic(() => import('../components/QrCodeList'), {
  ssr: false
})

export default async function Dashboard() {
  const session = await getServerSession(options)

  return (
    <div className="bg-white h-full min-h-screen ">
      <div className="max-w-6xl m-auto">
        <LoggedInHeader />

        <QrCodeList />
      </div>
    </div>
  )
}