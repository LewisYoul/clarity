import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import ResetPasswordForm from "../components/ResetPasswordForm";
import Link from 'next/link'
import { PrismaClient } from "@prisma/client"

export default async function ResetPassword() {
  const session = await getServerSession(options)

  // TODO: check the token in the params is still valid else redirect to forgot password
  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      email: "lewisyoul@gmail.com"
    }
  })

  console.log('user', user)

  console.log(session)
  if (session === null) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
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

          <ResetPasswordForm />
        </div>
      </>
    )
    } else {
      redirect("dashboard")
    }
}