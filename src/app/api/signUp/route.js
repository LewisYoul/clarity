import prisma from '../../utils/prisma'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { email, password, passwordConfirmation } = await req.json()
  const saltRounds = 10

  if (password !== passwordConfirmation) {
    return Response.json({ message: "The passwords you've entered don't match. Please try again." }, { status: 400 })
  }

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
    await prisma.$transaction(async (tx) => {
      const team = await tx.team.create({
        data: {
          name: 'Personal',
          isPersonal: true
        }
      })

      await tx.user.create({
        data: {
          email: email,
          passwordDigest: hashedPassword,
          currentTeamId: team.id
        }
      })
    })
  } catch (error) {
    console.error(error)

    return Response.json({ message: 'There was a problem creating your account. If this problem continues please contact us.' }, { status: 500 })
  }
  
  return Response.json({ message: 'Success! Your account has been created. Please sign in to continue.' })
}