import s3 from "../s3";
import prisma from "../prisma";

class Result {
  constructor(success, message) {
    this.success = success
    this.message = message
  }
}

const qrCodeCreator = async (user, team, formData) => {
  console.log('formData', formData)
  try {
    const png = formData.get('png');
    console.log('png', png)
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

    let mailTo = null;

    if (formData.get('type') === 'email') {
      mailTo = await prisma.MailTo.create({
        data: {
          to: formData.get('mailTo[to]'),
          cc: formData.get('mailTo[cc]'),
          bcc: formData.get('mailTo[bcc]'),
          subject: formData.get('mailTo[subject]'),
          body: formData.get('mailTo[body]'),
          qrCode: {
            connect: {
              id: qrCode.id,
            }
          }
        }
      })
    }

    let wifi = null;

    if (formData.get('type') === 'wifi') {
      wifi = await prisma.WiFi.create({
        data: {
          encryptionType: formData.get('wifi[encryptionType]'),
          ssid: formData.get('wifi[ssid]'),
          password: formData.get('wifi[password]'),
          qrCode: {
            connect: {
              id: qrCode.id,
            }
          }
        }
      })
    }
    
    let call = null;
    
    if (formData.get('type') === 'call') {
      call = await prisma.Call.create({
        data: {
          phoneNumber: formData.get('call[phoneNumber]'),
          qrCode: {
            connect: {
              id: qrCode.id,
            }
          }
        }
      })
    }
  
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
  
    try {
      await s3.uploadFile(pngKey, pngBuffer, "image/png");
      await s3.uploadFile(svgKey, svgText, "image/svg+xml");
    } catch (error) {
      console.error('Error sending svg or png or aws', error);
  
      await prisma.File.delete({ where: { id: createdPng.id } })
      await prisma.File.delete({ where: { id: createdSvg.id } })
      await prisma.QRCode.delete({ where: { id: qrCode.id } })
      if (mailTo) {
        await prisma.MailTo.delete({ where: { id: mailTo.id } })
      }
      if (wifi) {
        await prisma.WiFi.delete({ where: { id: wifi.id } })
      }
      if (call) {
        await prisma.Call.delete({ where: { id: call.id } })
      }
  
      return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
    }
    
    return new Result(true, 'QR Code created!')
  } catch (error) {
    console.error('unknown error when creating qr code', error)
    
    return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
  }
}

export default qrCodeCreator;