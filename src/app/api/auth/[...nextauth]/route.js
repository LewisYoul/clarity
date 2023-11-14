
import NextAuth from "next-auth"
import { options } from'./options'
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth(options)

export { handler as GET, handler as POST }