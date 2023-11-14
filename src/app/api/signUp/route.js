import bcrypt from 'bcrypt'
import { PrismaClient } from "@prisma/client"

export async function POST(req) {
  const { email, password, passwordConfirmation } = await req.json()
  const saltRounds = 10

  if (password !== passwordConfirmation) {
    return Response.json({ message: "The passwords you've entered don't match. Please try again." }, { status: 400 })
  }

  const prisma = new PrismaClient()

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (existingUser) {
    return Response.json({ message: 'An account with this email already exists. Please sign in to continue.' }, { status: 400 })
  }
  
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  
  try {
    await prisma.user.create({
      data: {
        email: email,
        passwordDigest: hashedPassword
      }
    })

  } catch (error) {
    console.error(error)

    return Response.json({ message: 'There was a problem creating your account. If this problem continues please contact us.' }, { status: 500 })
  }
  
  return Response.json({ message: 'Success! Your account has been created. Please sign in to continue.' })
}