import { PrismaClient } from '@prisma/client';


export async function POST(req) {
  const { email } = await req.json();

  console.log('email', email);

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log('user', user);

    if (user) {
      return Response.json({ message: 'Please check your email for a link to reset your password.' }, { status: 200 });
    } else {
      return Response.json({ message: 'No user with that email exists.' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
  }


}