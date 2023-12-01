import { PrismaClient } from '@prisma/client';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { options } from "../auth/[...nextauth]/options";
import { getServerSession } from 'next-auth/next'

export async function GET(req) {
  const session = await getServerSession(options)

  if (!session || !session.user || !session.team) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })

  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    }
  })

  if (!currentUser) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const currentTeam = await prisma.team.findUnique({
    where: {
      id: session.team.id
    }
  })

  if (!currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let qrs = await prisma.QRCode.findMany({
    where: {
      teamId: session.team.id
    }
  })

  // This is causing N+1 but I don't know prisma well enough yet to fix it.
  qrs = await Promise.all(
    qrs.map(async (qr) => {
      const files = await prisma.File.findMany({
        where: {
          fileableId: qr.id,
          fileableType: 'QRCode'
        }
      })

      qr.svgFile = files.find(file => file.fileName === 'qr.svg')
      qr.svgFile.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/File/${qr.svgFile.id}/qr.svg`
      qr.pngFile = files.find(file => file.fileName === 'qr.png')
      qr.pngFile.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_DEFAULT_REGION}.amazonaws.com/File/${qr.pngFile.id}/qr.png`

      return qr
    })
  )

  return Response.json({ data: qrs })
}

export async function POST(req) {
  const session = await getServerSession(options)

  const formData = await req.formData();
  const png = formData.get('png');
  const pngBuffer = await png.arrayBuffer();
  const svg = formData.get('svg');
  const svgText = await svg.text();

  const prisma = new PrismaClient();

  const qrCode = await prisma.QRCode.create({
    data: {
      teamId: session.team.id,
      createdById: session.user.id,
      link: formData.get('link'),
    }
  })

  console.log('qrCode', qrCode);

  const client = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

  const createdPng = await prisma.File.create({
    data: {
      fileName: 'qr.png',
      fileType: 'image/png',
      fileableId: qrCode.id,
      fileableType: 'QRCode',
    }
  })

  const pngKey = `File/${createdPng.id}/qr.png`;

  let command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: pngKey,
    Body: pngBuffer,
    ContentType: "image/png",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  const createdSvg = await prisma.File.create({
    data: {
      fileName: 'qr.svg',
      fileType: 'image/svg+xml',
      fileableId: qrCode.id,
      fileableType: 'QRCode',
    }
  })

  const svgKey = `File/${createdSvg.id}/qr.svg`;

  command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: svgKey,
    Body: svgText,
    ContentType: "image/svg+xml",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }

  console.log('createdPng', createdPng);
  console.log('createdSvg', createdSvg);

  return Response.json({ message: 'QR Code created!' })
}