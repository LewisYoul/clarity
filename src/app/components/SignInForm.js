"use client";

import { useEffect } from 'react';
import { signIn } from 'next-auth/react'
import { showToast } from '../utils/toastUtils';
import Link from 'next/link';

export default function SignInForm() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const errorParam = urlParams.get('error')

    if (errorParam) {
      if (errorParam === 'CredentialsSignin') {
        showToast('Invalid email or password.')
      } else {
        showToast('Something went wrong, if the issue persists please contact us.')
      }

      return
    }
  }, [])

  const handleSubmit = async (e) => {
    const data = new FormData(e.target);
    
    const params = {
      email: data.get('email'),
      password: data.get('password'),
    }

    try {
      signIn('credentials', { ...params, redirect: true, callbackUrl: '/dashboard' })
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
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full bg-gray-800 border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palqrblue sm:text-sm sm:leading-6"
              autoFocus
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">
              Password
            </label>
            <div className="text-sm">
              <Link href="/forgot-password" className="font-semibold text-palqrblue">
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="block w-full bg-gray-800 border-0 py-1.5 px-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-palqrblue sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center bg-palqrblue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palqrblue"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <Link href="/sign-up" className="font-semibold leading-6 text-palqrblue">
          Sign up now
        </Link>
      </p>
    </div>
  )
}