"use client";

import { useContext } from "react";
import { showToast } from "../utils/toastUtils";
import { CreditsContext } from "../contexts/creditsContext";
import { loadStripe } from '@stripe/stripe-js';

export default function CreditPack({ packType, numberOfQrCodes, price}) {
  const { refreshCreditsCount } = useContext(CreditsContext)
  const closeCreditsModal = (creditsCount) => {
    const closeCreditsModalEvent = new CustomEvent('closeCreditsModal', { detail: {} })
    const updateDisplayedCreditsCountEvent = new CustomEvent('updateDisplayedCredits', { detail: { creditsCount } })

    document.dispatchEvent(updateDisplayedCreditsCountEvent)
    document.dispatchEvent(closeCreditsModalEvent)
  }

  const buyCredits = async () => {
    try {
      const res = await fetch(`/api/checkoutSessions`, {
        method: 'POST',
        body: JSON.stringify({ packType }),
      })

      if (!res.ok) throw new Error('There was a problem purchasing your credits. If this problem continues please contact us.')

      const data = await res.json();

      console.log('CHECKOUT SESSION', data)
      console.log('STRIPE_PUBLISHABLE_KEY', process.env.STRIPE_PUBLISHABLE_KEY)
    
      const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

      await stripe.redirectToCheckout({ sessionId: data.id })

      await refreshCreditsCount()

      showToast(data.message)
      closeCreditsModal(data.creditsCount)
    } catch (error) {
      console.error(error)

      showToast(error.message)
    }
  }

  return(
    <div onClick={buyCredits} className="pb-2 mt-2">
      <div className="border rounded-md hover:border-black hover:cursor-pointer mx-10 px-8 py-4">
        <h1 className="text-l mb-4">{numberOfQrCodes} QR Code{numberOfQrCodes === 1 ? '' : 's'}</h1>
        <p className="inline-flex items-center"><span className="font-bold text-3xl">${price}</span></p>
      </div>
    </div>
  )
}