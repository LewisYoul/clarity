import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { authorizeRequest } from '@/app/utils/sessionUtils';
import prisma from '../../utils/prisma';

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
  const png = formData.get('png');
  const pngBuffer = await png.arrayBuffer();
  const svg = formData.get('svg');
  const svgText = await svg.text();

  const qrCode = await prisma.QRCode.create({
    data: {
      teamId: currentTeam.id,
      createdById: currentUser.id,
      link: formData.get('link'),
    }
  })

  const createdPng = await prisma.File.create({
    data: {
      fileName: 'qr.png',
      fileType: 'image/png',
      fileableId: qrCode.id,
      fileableType: 'QRCode',
    }
  })

  const createdSvg = await prisma.File.create({
    data: {
      fileName: 'qr.svg',
      fileType: 'image/svg+xml',
      fileableId: qrCode.id,
      fileableType: 'QRCode',
    }
  })

  const pngKey = `File/${createdPng.id}/qr.png`;
  const svgKey = `File/${createdSvg.id}/qr.svg`;

  const pngCreationCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: pngKey,
    Body: pngBuffer,
    ContentType: "image/png",
  });

  const svgCreationCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: svgKey,
    Body: svgText,
    ContentType: "image/svg+xml",
  });

  const s3 = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

  try {
    await s3.send(pngCreationCommand);
    await s3.send(svgCreationCommand);
  } catch (error) {
    console.error('BUGGER', error);

    await prisma.File.delete({ where: { id: createdPng.id } })
    await prisma.File.delete({ where: { id: createdSvg.id } })
    await prisma.QRCode.delete({ where: { id: qrCode.id } })

    return Response.json({ message: 'There was a problem creating your QR code. If this problem continues please contact us.' }, { status: 500 })
  }

  return Response.json({ message: 'QR Code created!' })
}