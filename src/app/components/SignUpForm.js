"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { showToast } from '../utils/toastUtils'

export default function SignUpForm() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    const data = new FormData(e.target);
    
    const params = {
      email: data.get('email'),
      password: data.get('password'),
      passwordConfirmation: data.get('passwordConfirmation')
    }

    console.log(params);

    try {
      const res = await axios.post('/api/signUp', params)
      const message = res.data.message

      showToast(message)

      router.push('/sign-in')
    } catch (error) {
      console.error(error)

      const message = error.response?.data?.message || 'Something went wrong please contact us'

      showToast(message)
    }
  }

  return(
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
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Confirm Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            required
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account? <Link href="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign in</Link>
      </p>
    </form>

  )
}