import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import prisma from "../prisma";

class Result {
  constructor(success, message) {
    this.success = success
    this.message = message
  }
}

const qrCodeCreator = async (user, team, formData) => {
  try {
    const png = formData.get('png');
    const pngBuffer = await png.arrayBuffer();
    const svg = formData.get('svg');
    const svgText = await svg.text();
  
    const qrCode = await prisma.QRCode.create({
      data: {
        teamId: team.id,
        createdById: user.id,
        link: formData.get('link'),
        type: formData.get('type'),
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
      console.error('Error sending svg or png or aws', error);
  
      await prisma.File.delete({ where: { id: createdPng.id } })
      await prisma.File.delete({ where: { id: createdSvg.id } })
      await prisma.QRCode.delete({ where: { id: qrCode.id } })
  
      return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
    }
    
    return new Result(true, 'QR Code created!')
  } catch (error) {
    console.error('unknown error when creating qr code', error)
    
    return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
  }
}

export default qrCodeCreator;