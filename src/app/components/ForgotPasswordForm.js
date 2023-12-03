"use client";

import { useEffect } from 'react';
import { showToast } from '../utils/toastUtils';
import axios from 'axios';
import { useRouter } from 'next/navigation'

export default function ForgotPasswordForm() {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error')

    if (!errorParam) { return }

    if (errorParam === 'CredentialsSignin') {
      showToast('Invalid email or password.')
    } else {
      showToast('Something went wrong, if the issue persists please contact us.')
    }
  }, [])

  const handleSubmit = async (e) => {
    const data = new FormData(e.target);
    
    const params = {
      email: data.get('email'),
    }

    try {
      const res = await axios.post('/api/forgotPassword', params)
      const message = res.data.message

      router.push(`/sign-in?toastMessage=${message}`)
    } catch (error) {
      console.error(error)

      const message = error.response?.data?.message || 'Something went wrong please contact us'

      showToast(message)
    }
  }

  return(
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              autoFocus
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Reset my password
          </button>
        </div>
      </form>
    </div>
  )
}