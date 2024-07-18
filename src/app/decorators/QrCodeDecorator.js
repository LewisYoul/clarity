export default class QrCodeDecorator {
  constructor(qrCode) {
    this.qrCode = qrCode
  }
  
  title = () => {
    if (this.qrCode.type === 'link') {
      return this.qrCode.data.url
    }

    if (this.qrCode.type === 'email') {
      return this.qrCode.data.to
    }

    if (this.qrCode.type === 'wifi') {
      return this.qrCode.data.ssid
    }

    if (this.qrCode.type === 'call') {
      return this.qrCode.data.phoneNumber
    }

    if (this.qrCode.type === 'sms') {
      return this.qrCode.data.smsNumber
    }
  }
}
