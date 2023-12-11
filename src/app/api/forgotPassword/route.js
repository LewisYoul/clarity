import prisma from "../../utils/prisma";

const postmark = require("postmark");
const crypto = require('crypto');

export async function POST(req) {
  const { email } = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    console.log('user', user);

    if (user) {
      
      try {
        const token = crypto.randomBytes(32).toString('hex');

        const res = await prisma.passwordResetRequest.create({
          data: {
            userId: user.id,
            token,
            expiresAt: new Date(Date.now() + 3600000),
          }
        })

        console.log(res)

        const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_SERVER_ID);

        const html = `
          <p>Hello ${user.email},</p>
          <p>A request has been made to reset your password. Please click the following link to reset your password: https://palqr.com/reset-password?token=${token}.</p>
          <p>If you did not make this request, please ignore this email.</p>
          <br>
          <p>Thanks,</p>
          <p>PalQR</p>
        `
        const text = `Hello ${user.email}, A request has been made to reset your password. Please click the following link to reset your password: https://palqr.com/reset-password?token=${token}. If you did not make this request, please ignore this email. Thanks, PalQR`

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