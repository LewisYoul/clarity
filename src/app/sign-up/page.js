import { options } from "../api/auth/[...nextauth]/options"
import { getServerSession } from 'next-auth/next'
import { redirect } from 'next/navigation';
import SignUpForm from "../components/SignUpForm";
import Link from 'next/link'

export default async function SignUp() {
  const session = await getServerSession(options)

  if (session === null) {
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href="/">
            <img
              className="mx-auto h-10 w-auto"
              src="/logo.svg"
              alt="Your Company"
            />
          </Link>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignUpForm />
        </div>
      </div>
    )
    } else {
      redirect("dashboard")
    }
}