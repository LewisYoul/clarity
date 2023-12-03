import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import ResetPasswordForm from "../components/ResetPasswordForm";
import Link from 'next/link'
import { PrismaClient } from "@prisma/client"
import moment from 'moment'

export default async function ResetPassword({ searchParams }) {
  const session = await getServerSession(options)

  console.log(session)
  if (session === null) {

    console.log(searchParams)
    // const urlParams = new URLSearchParams(window.location.search);
    const { token } = searchParams;

    if (!token) {
      redirect("forgot-password?message=missingToken")
    }
  
    const prisma = new PrismaClient()
    const passwordResetRequest = await prisma.passwordResetRequest.findFirst({
      where: {
        token: token
      }
    })

    if (!passwordResetRequest) {
      redirect("forgot-password?message=noMatchingPasswordResetRequest")
    }
    
    console.log("RR", passwordResetRequest)

    if (moment().isAfter(passwordResetRequest.expiresAt)) {
      redirect("forgot-password?message=expiredPasswordResetRequest")
    }

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
              Enter your new password
            </h2>

            <p className="mt-1 text-center text-sm text-gray-500">
              Or{' '}
              <Link href="/sign-in" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                sign in to your account
              </Link>
            </p>
          </div>

          <ResetPasswordForm userId={passwordResetRequest.userId} token={token} />
        </div>
      </>
    )
    } else {
      redirect("dashboard")
    }
}