import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { password, passwordConfirmation, userId, token } = await req.json();
  const saltRounds = 10;

  if (password !== passwordConfirmation) {
    return Response.json({ message: "The passwords you've entered don't match. Please try again." }, { status: 400 })
  }
  
  try {
    const passwordResetRequest = await prisma.passwordResetRequest.findFirst({
      where: {
        userId: userId,
        token: token
      }
    })

    if (!passwordResetRequest) {
      return Response.json({ message: 'We were unable to reset your password, please request another password reset link.' }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    
    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { passwordDigest: hashedPassword },
      }),
      prisma.passwordResetRequest.delete({
        where: { id: passwordResetRequest.id }
      })
    ])
    
    return Response.json({ message: 'Your password has been updated, you can now sign in.' });
  } catch (error) {
    console.error(error)

    return Response.json({ message: 'We were unable to reset your password, please request another password reset link.' }, { status: 500 });
  }
}