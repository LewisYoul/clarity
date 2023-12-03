import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import Link from 'next/link'

export default async function ForgotPassword() {
  const session = await getServerSession(options)

  console.log(session)
  if (session === null) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link href="/">
              <img
                className="mx-auto h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Reset your password
            </h2>

            <p className="mt-1 text-center text-sm text-gray-500">
              Or{' '}
              <Link href="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                sign in to your account
              </Link>
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </>
    )
    } else {
      redirect("dashboard")
    }
}