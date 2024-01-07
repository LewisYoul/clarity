import qrCodeCreator from "@/app/utils/qr-codes/qrCodeCreator"
import s3 from "@/app/utils/s3"
import prisma from "@/app/utils/prisma"
import fs from 'fs'
import path from "path"


class MockPngFile {
  arrayBuffer = async () => {
    const buffer = fs.readFileSync(path.join(__dirname, '../../../../fixtures/files/qr.png'))
    console.log('buffer', buffer)
    return Promise.resolve(buffer)
  }
}

class MockSvgFile {
  text = async () => {
    return Promise.resolve('<svg></svg>')
  }
}

class MockFormData {
  constructor() {
    this.data = {}
  }

  append = (key, value) => {
    this.data[key] = value
  }

  get = (key) => {
    return this.data[key]
  }
}

jest.mock('../../../../../src/app/utils/s3', () => {
  return {
    uploadFile: jest.fn(() => Promise.resolve({}))
  }
})

const clearTables = async () => {
  const tablenames = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== '_prisma_migrations')
    .map((name) => `"public"."${name}"`)
    .join(', ')

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`)
  } catch (error) {
    console.log({ error })
  }
}

let test

const createUser = async () => {
  const team = await prisma.Team.create({
    data: {
      name: 'Test Team'
    }
  })

  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      passwordDigest: 'passwordDigest',
    },
  })

  await prisma.TeamUser.create({
    data: {
      teamId: team.id,
      userId: user.id,
    }
  })

  return { user, team }
}

describe("qrCodeGenerator", () => {
  beforeEach(async () => {
    await clearTables()
  })
  afterEach(async () => {
    await clearTables()
  })

  describe("when the type is 'email'", () => {
    it('creates a QR Code and uploads the QR images to S3', async () => {
      const { user, team } = await createUser()

      const formData = new MockFormData()

      formData.append('png', new MockPngFile())
      formData.append('svg', new MockSvgFile())
      formData.append('link', 'https://example.com')
      formData.append('type', 'link')

      const pngFormData = formData.get('png')
      const svgFormData = formData.get('svg')

      const expectedPngBuffer = await pngFormData.arrayBuffer()
      const expectedSvgText = await svgFormData.text();

      const result = await qrCodeCreator(user, team, formData)

      expect(result.success).toEqual(true)
      expect(result.message).toEqual('QR Code created!')

      const qrs = await prisma.QRCode.findMany()
      const qr = qrs[0]

      expect(qr.type).toEqual('link')
      expect(qr.link).toEqual('https://example.com')
      expect(qr.teamId).toEqual(team.id)
      expect(qr.createdById).toEqual(user.id)

      // It doesn't create these when type is link
      expect(await prisma.MailTo.findMany()).toEqual([])
      expect(await prisma.WiFi.findMany()).toEqual([])
      
      const files = await prisma.File.findMany()

      expect(files.length).toEqual(2)

      const png = files.filter(file => file.fileType === 'image/png')[0]

      expect(png.fileName).toEqual('qr.png')
      expect(png.fileType).toEqual('image/png')
      expect(png.fileableId).toEqual(qr.id)
      expect(png.fileableType).toEqual('QRCode')

      const svg = files.filter(file => file.fileType === 'image/svg+xml')[0]

      expect(svg.fileName).toEqual('qr.svg')
      expect(svg.fileType).toEqual('image/svg+xml')
      expect(svg.fileableId).toEqual(qr.id)
      expect(svg.fileableType).toEqual('QRCode')

      expect(s3.uploadFile).toHaveBeenNthCalledWith(1, `File/${png.id}/qr.png`, expectedPngBuffer, "image/png")
      expect(s3.uploadFile).toHaveBeenNthCalledWith(2, `File/${svg.id}/qr.svg`, expectedSvgText, "image/svg+xml")
    })
  })
})