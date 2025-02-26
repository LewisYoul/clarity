import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import SignInForm from "../components/SignInForm";
import Link from "next/link";

export default async function SignUp({ searchParams }) {
  const session = await getServerSession(options)
  const message = searchParams.message

  if (session === null) {
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link href="/">
              <img
                className="mx-auto h-10 w-auto"
                src="/logo.svg"
                alt="Your Company"
              />
            </Link>
            {message && (
              <div className="mt-4 text-center text-sm text-green-500">
                {message}
              </div>
            )}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
              Sign in to your account
            </h2>
          </div>

          <SignInForm />
        </div>
      </>
    )
  } else {
    redirect("dashboard")
  }
}