import { PrismaClient } from '@prisma/client';
const postmark = require("postmark");

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
      const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_ID);

      try {

        const html = `
          <p>Hello ${user.email},</p>
          <p>A request has been made to reset your password. Please click the following link to reset your password: https://palqr.com/reset-password/${user.id}.</p>
          <p>If you did not make this request, please ignore this email.</p>
          <br>
          <p>Thanks,</p>
          <p>PalQR</p>
        `
        const text = `Hello ${user.email}, A request has been made to reset your password. Please click the following link to reset your password: https://palqr.com/reset-password/${user.id}. If you did not make this request, please ignore this email. Thanks, PalQR`

        postmarkClient.sendEmail({
          "From": "hello@palqr.com",
          "To": user.email,
          "Subject": "PalQR Password Reset Request",
          "HtmlBody": html,
          "TextBody": text,
          "MessageStream": "outbound"
        });

        return Response.json({ message: 'Please check your email for a link to reset your password.' }, { status: 200 });
      } catch (error) {
        console.error(error);
      
        return Response.json({ message: 'There was an error sending the password reset email, please contact us if the issue persists.' }, { status: 500 });
      }

    } else {
      return Response.json({ message: 'No user with that email exists.' }, { status: 400 });
    }
  } catch (error) {
    console.error(error);

    return Response.json({ message: 'There was an error sending the password reset email, please contact us if the issue persists.' }, { status: 500 });
  }
}