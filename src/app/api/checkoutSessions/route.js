import { authorizeRequest } from '@/app/utils/sessionUtils';
import Stripe from 'stripe';
import prisma from "@/app/utils/prisma"
import { baseUrl } from "@/app/config/baseUrl"

export async function POST(req) {
  const { currentUser, currentTeam } = await authorizeRequest();

  if (!currentUser || !currentTeam) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json()
  const packType = body.packType

  // production
  let prices = {
    single: 'price_1Pd4NzFv8VES5JMThczfgdtk',
    basic: 'price_1Pd4O6Fv8VES5JMTKFnKc6iG',
    medium: 'price_1Pd4O9Fv8VES5JMTE4Ij8PD9',
    large: 'price_1Pd4OBFv8VES5JMTz9RldZPa'
  }
  
  if (process.env.NODE_ENV === 'development') {
    // development
    prices = {
      single: 'price_1PbFrXFv8VES5JMTH0r2TCob',
      basic: 'price_1Pd45CFv8VES5JMT6MAKbV6U',
      medium: 'price_1Pd45cFv8VES5JMTB6AygXxH',
      large: 'price_1Pd461Fv8VES5JMThmxgw1S4'
    }
  }

  const params = {
    payment_method_types: ['card'],
    line_items: [
      {
        price: prices[packType],
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/checkoutSessions/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      userId: currentUser.id,
      teamId: currentTeam.id,
      packType,
      isUsed: false
    },
  };


  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const checkoutSession = await stripe.checkout.sessions.create(params);

  await prisma.stripeCheckoutSession.create({
    data: {
      sessionId: checkoutSession.id,
      userId: currentUser.id,
      teamId: currentTeam.id,
      packType,
    }
  })

  return Response.json(checkoutSession);
}
