// import { useRouter } from 'next/navigation'
import prisma from "@/app/utils/prisma"
import { redirect } from "next/navigation"
 
export default async function Scan({ params }) {
  const dynamicLinkUid = params.dynamicLinkUid

  const qrCode = await prisma.qRCode.findFirst({
    where: {
      dynamicLinkUid: dynamicLinkUid
    }
  })

  console.log(qrCode)

  if (!dynamicLinkUid) {
    return redirect('/')
  } else {
    return redirect(qrCode.link)
  }
  // const router = useRouter()
  // return <p>Scan: {router.query.dynamicLinkUid}</p>
}