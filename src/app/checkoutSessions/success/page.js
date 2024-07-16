import prisma from "@/app/utils/prisma"
import { redirect } from "next/navigation"
import Stripe from "stripe"

// check the person is logged in
export default async function Success({ searchParams }) {
  const sessionId = searchParams.session_id;
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const metadata = session.metadata

  const packs = {
    single: 1,
    basic: 3,
    medium: 5,
    large: 10
  }

  const stripeCheckoutSession = await prisma.stripeCheckoutSession.findFirst({
    where: {
      sessionId: sessionId,
      isUsed: false
    }
  })

  if (!stripeCheckoutSession) {
    const error = encodeURIComponent("Something went wrong, please contact support if the problem persists")

    return redirect(`/dashboard?error=${error}`)
  }

  const creditsToCreate = new Array(packs[metadata.packType]).fill({ teamId: Number(session.metadata.teamId) })
  
  await prisma.$transaction([
    prisma.credit.createMany({
      data: creditsToCreate
    }),
    prisma.stripeCheckoutSession.update({
      where: {
        id: stripeCheckoutSession.id
      },
      data: {
        isUsed: true
      }
    })
  ])

  const message = encodeURIComponent(`Success! ${packs[metadata.packType]} ${metadata.packType === 'single' ? 'credit has' : 'credits have'} been added to your account`)

  return redirect(`/dashboard?message=${message}`)
}

