import LoggedInHeader from "../components/LoggedInHeader"
import { options } from "../api/auth/[...nextauth]/options"
import { authorizeRequest } from "../utils/sessionUtils"
import dynamic from 'next/dynamic'
import prisma from "../utils/prisma"

const QrCodeList = dynamic(() => import('../components/QrCodeList'), {
  ssr: false
})

export default async function Dashboard() {
  const { currentUser, currentTeam } = await authorizeRequest();
  const credits = await prisma.credit.findMany({
    where: {
      teamId: currentTeam.id
    }
  })
  const creditsCount = credits.length
  console.log('CREDITS', creditsCount)
  return (
    <div className="bg-white h-full min-h-screen">
      <div className="max-w-6xl m-auto">
        <LoggedInHeader creditsCount={creditsCount}/>

        <QrCodeList />
      </div>
    </div>
  )
}