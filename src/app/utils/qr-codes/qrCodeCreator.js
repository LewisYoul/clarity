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

    console.log('DYNAMICUID', formData.get('dynamicLinkUid'))

    let data = {}

    if (formData.get('type') === 'link') {
      data = {
        uri: formData.get('link[uri]')
      }
    }

    if (formData.get('type') === 'email') {
      data = {
        to: formData.get('mailTo[to]'),
        cc: formData.get('mailTo[cc]'),
        bcc: formData.get('mailTo[bcc]'),
        subject: formData.get('mailTo[subject]'),
        body: formData.get('mailTo[body]'),
      }
    }

    if (formData.get('type') === 'wifi') {
      data = {
        encryptionType: formData.get('wifi[encryptionType]'),
        ssid: formData.get('wifi[ssid]'),
        password: formData.get('wifi[password]'),
      }
    }

    if (formData.get('type') === 'call') {
      data = {
        phoneNumber: formData.get('call[phoneNumber]'),
      }
    }

    if (formData.get('type') === 'sms') {
      data = {
        smsNumber: formData.get('sms[smsNumber]'),
      }
    }
  
    console.log('DATA', data)
    const isDynamic = formData.get('dynamicLinkUid') !== 'null' && formData.get('dynamicLinkUid') !== null

    console.log('isdynamic', isDynamic)
    const qrCode = await prisma.QRCode.create({
      data: {
        teamId: team.id,
        createdById: user.id,
        link: formData.get('link'),
        type: formData.get('type'),
        dynamicLinkUid: isDynamic ? formData.get('dynamicLinkUid') : null,
        data,
      }
    })


    if (isDynamic) {
      const credit = await prisma.credit.findFirst({
        where: { teamId: team.id, qrCodeId: null }
      })

      if (!credit) { return new Result(false, "You don't have enough credits") }
  
      console.log("QR CODE ID", qrCode.id)
      await prisma.credit.update({
        where: { id: credit.id },
        data: { qrCodeId: qrCode.id }
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
  
      await prisma.$transaction([
        prisma.File.delete({ where: { id: createdPng.id } }),
        prisma.File.delete({ where: { id: createdSvg.id } }),
        prisma.QRCode.delete({ where: { id: qrCode.id } }),
      ])
  
      return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
    }
    
    return new Result(true, 'QR Code created!')
  } catch (error) {
    console.error('unknown error when creating qr code', error)
    
    return new Result(false, 'There was a problem creating your QR code. If this problem continues please contact us.')
  }
}

export default qrCodeCreator;