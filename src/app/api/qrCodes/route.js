import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';
import qrCodeCreator from "../../utils/qr-codes/qrCodeCreator";

export async function GET(req) {
  const { currentUser, currentTeam } = await authorizeRequest();
  
  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const params = req.nextUrl.searchParams
  console.log(params)

  let searchTermQuery = {}

  if (params.has('searchTerm')) {
    searchTermQuery = {
      link: {
        contains: params.get('searchTerm')
      }
    }
  }

  let qrs = await prisma.QRCode.findMany({
    where: {
      teamId: currentTeam.id,
      ...searchTermQuery
    },
    orderBy: {
      updatedAt: 'desc'
    }
  })

  const qrIds = qrs.map(qr => qr.id)

  // Turns out prisma doesn't support polymorphic relationships yet - https://github.com/prisma/prisma/issues/1644.
  const svgFiles = await prisma.File.findMany({
    where: {
      fileableId: {
        in: qrIds
      },
      fileableType: 'QRCode',
      fileType: 'image/svg+xml'
    }
  })

  const pngFiles = await prisma.File.findMany({
    where: {
      fileableId: {
        in: qrIds
      },
      fileableType: 'QRCode',
      fileType: 'image/png'
    }
  })

    qrs.map((qr) => {
      qr.svgFile = svgFiles.find(file => file.fileableId === qr.id)
      qr.svgFile.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/File/${qr.svgFile.id}/qr.svg`
      qr.pngFile = pngFiles.find(file => file.fileableId === qr.id)
      qr.pngFile.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/File/${qr.pngFile.id}/qr.png`

      return qr
    })

  return Response.json({ data: qrs })
}

export async function POST(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }
  
  const formData = await req.formData();
  const result = await qrCodeCreator(currentUser, currentTeam, formData)

  if (result.success) {
    return Response.json({ message: result.message })
  } else {
    return Response.json({ message: result.message }, { status: 400 })
  }
}